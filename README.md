# CoVid-19 Concelhos

CoViD-19 charts by municipality

## Usage

Just point a browser to `src/web/index.html`, nothing else.

## Update data

Municipality must be (unfortunately) copied from the [daily DGS situation reports](https://covid19.min-saude.pt/relatorio-de-situacao/) and properly formatted into the flat files in the `data` directory. Be mindful of line breaks, table headers and overall misformat. A good regex to find all the valid lines is `/^.+ \d+$/`, and work from there.

Anyway, I'll try to keep the repo updated.

After each data update, the actual usable data must be compiled via `npm run analysis`. That will take a couple of minutes (mostly because of GIS operations to figure out the municipalities neighbourhoods).

Refresh the aforementioned address for the most current charts.

## Notes

The [GIS data provided by the government](https://dados.gov.pt/pt/datasets/concelhos-de-portugal/) is missing, at least, two municipalities, _Guimarães_ and _Tavira_, for unknown reasons, and will appear as missing in the analysis.

Also, because we have repeated municipalities names - and I took the easy way with the analysis - at least _Calheta (Madeira)_ will also appear as missing on the analysis.
