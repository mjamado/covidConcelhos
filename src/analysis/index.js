import fs from 'fs';

import appRoot from 'app-root-path';
import fetch from 'node-fetch';
import {
  intersect, buffer, bbox, bboxPolygon,
} from '@turf/turf';

import geoData from '../../data/concelhos.json';

import getConcelhoByName from '../helpers/concelhos';

const analysis = {};

const getTotalsByDate = (res, year, month, day) => {
  const ptDate = `${day}-${month}-${year}`;
  const dateIdx = Object.keys(res.data).find((idx) => res.data[idx] === ptDate);

  return {
    infected: res.confirmados?.[dateIdx] || 0,
    recovered: res.recuperados?.[dateIdx] || 0,
    dead: res.obitos?.[dateIdx] || 0,
  };
};

fetch('https://covid19-api.vost.pt/Requests/get_full_dataset', {
  method: 'GET',
  headers: { Accept: 'application/json' },
})
  .then((res) => res.json())
  .then((res) => {
    fs
      .readdirSync(`${appRoot}/data`)
      .forEach((file) => {
        const fileMatch = file.match(/(\d{4})(\d{2})(\d{2})/);

        if (fileMatch) {
          const totals = getTotalsByDate(res, fileMatch[1], fileMatch[2], fileMatch[3]);

          // eslint-disable-next-line no-console
          console.log(`${fileMatch[1]}-${fileMatch[2]}-${fileMatch[3]}`);

          fs
            .readFileSync(`${appRoot}/data/${file}`, { encoding: 'utf8' })
            .split('\n')
            .forEach((line) => {
              const matches = line.match(/^([^*]+) (\d+)$/);

              if (matches) {
                const concelho = getConcelhoByName(matches[1]);
                const prevRes = analysis[concelho?.name || matches[1]] || {};
                let neighbours = prevRes?.neighbours;

                if (concelho && !neighbours) {
                  neighbours = [];
                  const concelhoFeature = geoData.features
                    .find((feature) => feature.properties.NAME_2 === concelho.name);

                  if (concelhoFeature) {
                    const concelhoBufer = buffer(bboxPolygon(bbox(concelhoFeature)), 10, { unit: 'kilometers' });

                    geoData.features.forEach((feature) => {
                      const featureBox = bboxPolygon(bbox(feature));

                      if (
                        (feature.properties.NAME_2 !== concelho.name)
                        && intersect(featureBox, concelhoBufer)
                      ) {
                        // intersects
                        neighbours.push(feature.properties.NAME_2);
                      }
                    });
                  } else {
                    // eslint-disable-next-line no-console
                    console.log('Missing geo feature:', concelho.name);
                  }
                }

                const value = parseInt(matches[2], 10);
                const increment = value - (prevRes?.data?.[prevRes?.data?.length - 1]?.value || 0);
                const movingAverage5days = Math.round((
                  prevRes
                    ?.data
                    ?.slice(-6)
                    ?.reduce((acc, val) => acc + val.increment, increment) / 7 + Number.EPSILON
                ) * 10) / 10;
                const proportion = value / totals.infected;
                const proportionalRecovered = Math.round(totals.recovered * proportion);
                const proportionalDead = Math.round(totals.dead * proportion);
                const proportionalActive = value - (proportionalRecovered + proportionalDead);
                const contagious = Math.max(
                  value - prevRes?.data
                    ?.slice(0, -11)
                    ?.reduce((acc, val) => acc + val.increment, 0),
                  0,
                );

                analysis[concelho?.name || matches[1]] = {
                  ...prevRes,
                  missing: !concelho,
                  name: concelho?.name || matches[1],
                  alternateNames: concelho?.alternateNames || [],
                  neighbours: neighbours || [],
                  data: [
                    ...(prevRes?.data || []),
                    {
                      date: `${fileMatch[1]}-${fileMatch[2]}-${fileMatch[3]}`,
                      value,
                      increment,
                      contagious,
                      movingAverage5days,
                      proportionalRecovered,
                      proportionalDead,
                      proportionalActive,
                    },
                  ],
                };
              }
            });
        }
      });

    const missing = Object
      .keys(analysis)
      .sort((a, b) => a.localeCompare(b))
      .filter((name) => analysis[name].missing);

    if (missing.length) {
      missing.forEach((name) => {
        // eslint-disable-next-line no-console
        console.log(`${JSON.stringify(analysis[name], null, 2)},`);
      });

      process.exit(1);
    }

    // calculate moving average correctly
    const reAnalysis = {};

    Object.keys(analysis).forEach((concelhoName) => {
      reAnalysis[concelhoName] = {
        ...analysis[concelhoName],
        data: analysis[concelhoName].data.map((datum, index, originalData) => {
          let startIndex = index - 2;
          let endIndex = index + 3;

          if (startIndex < 0) {
            startIndex = 0;
          }

          if (endIndex > originalData.length) {
            endIndex = originalData.length;
          }

          return {
            ...datum,
            movingAverage5days: Math.round((
              originalData
                .slice(startIndex, endIndex)
                .reduce(
                  (acc, val) => acc + val.increment,
                  0,
                ) / (endIndex - startIndex) + Number.EPSILON
            ) * 10) / 10,
          };
        }),
      };
    });

    fs.writeFileSync(
      `${appRoot}/data/parsedData.js`,
      `const data = ${JSON.stringify(reAnalysis)};`,
    );

    process.exit(0);
  });
