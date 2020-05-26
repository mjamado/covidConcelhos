import fs from 'fs';

import { read as shapefileRead } from 'shapefile';
import appRoot from 'app-root-path';

shapefileRead(
  `${appRoot}/data/concelhos.shp`,
  `${appRoot}/data/concelhos.dbf`,
  { encoding: 'utf-8' },
)
  .then((json) => {
    fs.writeFileSync(
      `${appRoot}/data/concelhos.json`,
      JSON.stringify(json),
    );

    process.exit(0);
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(err, null, 2));

    process.exit(1);
  });
