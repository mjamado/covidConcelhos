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

Promise.all([
  fetch('https://covid19-api.vost.pt/Requests/get_full_dataset', {
    method: 'GET',
    headers: { Accept: 'application/json' },
  }),
  fetch('https://raw.githubusercontent.com/dssg-pt/covid19pt-data/master/data_concelhos.csv', {
    method: 'GET',
    headers: { Accept: 'text/csv; charset=utf-8' },
  }),
])
  .then(([full, concelhos]) => Promise.all([full.json(), concelhos.text()]))
  .then(([full, concelhos]) => {
    const [titleLine, ...concelhosData] = concelhos
      .split('\n')
      .map((line) => line.split(','));

    concelhosData.forEach(([date, ...dataRow]) => {
      const [day, month, year] = date.split('-');
      const totals = getTotalsByDate(full, year, month, day);

      // eslint-disable-next-line no-console
      console.log(date);

      dataRow.forEach((datum, idx) => {
        const concelhoName = titleLine[idx + 1];
        const concelho = getConcelhoByName(concelhoName);
        const prevRes = analysis[concelho?.name || concelhoName] || {};
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

        const value = parseInt(datum, 10);
        const increment = value - (prevRes?.data?.[prevRes?.data?.length - 1]?.value || 0);
        const proportion = value / totals.infected;
        const proportionalRecovered = Math.round(totals.recovered * proportion);
        const proportionalDead = Math.round(totals.dead * proportion);
        const proportionalActive = value - (proportionalRecovered + proportionalDead);

        analysis[concelho?.name || concelhoName] = {
          ...prevRes,
          missing: !concelho,
          name: concelho?.name || concelhoName,
          alternateNames: concelho?.alternateNames || [],
          neighbours: neighbours || [],
          data: [
            ...(prevRes?.data || []),
            {
              date: `${year}-${month}-${day}`,
              value,
              increment,
              proportionalRecovered,
              proportionalDead,
              proportionalActive,
            },
          ],
        };
      });
    });

    const missing = Object
      .keys(analysis)
      .sort((a, b) => a.localeCompare(b))
      .filter((name) => analysis[name].missing);

    if (missing.length) {
      missing.forEach((name) => {
        const properName = name
          .toLocaleLowerCase('pt-PT')
          .split(' ')
          .map(([start, ...rest]) => `${start.toLocaleUpperCase('pt-PT')}${rest.join('')}`)
          .join(' ');
        // eslint-disable-next-line no-console
        console.log(`{ name: '${properName}', alternateNames: [] },`);
      });

      process.exit(1);
    }

    fs.writeFileSync(
      `${appRoot}/data/parsedData.js`,
      `const data = ${JSON.stringify(analysis)};`,
    );

    process.exit(0);
  });
