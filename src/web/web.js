/* eslint-disable no-undef */

let chart;

const events = [
  {
    x: '2020-03-18', y: 3, r: 8, label: 'Estado de emergência',
  },
  {
    x: '2020-04-10', y: 3, r: 8, label: 'Sexta-feira Santa',
  },
  {
    x: '2020-04-12', y: 3, r: 8, label: 'Páscoa',
  },
  {
    x: '2020-04-25', y: 3, r: 8, label: '25 de Abril',
  },
  {
    x: '2020-05-01', y: 3, r: 8, label: '1º de Maio',
  },
  {
    x: '2020-05-02', y: 3, r: 8, label: 'Fim de estado de emergência',
  },
  {
    x: '2020-05-04', y: 3, r: 8, label: 'Desconfinamento',
  },
  {
    x: '2020-05-18', y: 3, r: 8, label: 'Restaurantes, lojas, creches e ensino secundário',
  },
  {
    x: '2020-06-01', y: 3, r: 8, label: 'Centros comerciais, ATL, pré-escolas, cultura',
  },
  {
    x: '2020-06-06', y: 3, r: 8, label: 'Manifestação contra o racismo',
  },
];

const initChart = () => {
  const ctx = document.getElementById('chart').getContext('2d');

  chart = new Chart(ctx, {
    type: 'line',
    options: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          title: (tooltipItem) => moment(tooltipItem[0].label).format('dddd, D MMMM'),
          label: (tooltipItem, data) => {
            const dataset = data.datasets[tooltipItem.datasetIndex];
            const item = dataset.data[tooltipItem.index];

            if (item.label) {
              // it's an event
              return item.label;
            }

            return `${dataset.label}: ${item.y}`;
          },
        },
      },
      scales: {
        yAxes: [
          {
            id: 'values',
            type: 'linear',
            ticks: {
              beginAtZero: true,
              precision: 0,
            },
          },
          {
            id: 'events',
            type: 'linear',
            display: false,
            ticks: {
              min: 0,
              max: 4,
            },
          },
        ],
        xAxes: [{
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'DD MMM',
            },
          },
        }],
      },
    },
  });
};

const drawChart = (data) => {
  chart.data = data;
  chart.update();
};

const getColor = (index) => {
  const colorChart = [
    { r: 57, g: 106, b: 177 },
    { r: 218, g: 124, b: 48 },
    { r: 62, g: 150, b: 81 },
    { r: 204, g: 37, b: 41 },
    { r: 83, g: 81, b: 84 },
    { r: 107, g: 76, b: 154 },
    { r: 146, g: 36, b: 40 },
    { r: 148, g: 139, b: 61 },
  ];

  const loop = Math.floor(index / colorChart.length);
  const { r, g, b } = colorChart[index % colorChart.length];

  return `rgba(${r}, ${g}, ${b}, ${1 - (loop / 5)})`;
};

const prepareEvents = (startDate = null, endDate = null) => ({
  label: 'Eventos',
  borderColor: 'rgba(64, 64, 64, 0.5)',
  data: events
    .filter((item) => {
      if (startDate && moment(startDate).isSameOrAfter(item.x)) {
        return false;
      }

      if (endDate && moment(endDate).isSameOrBefore(item.x)) {
        return false;
      }

      return true;
    }),
  yAxisID: 'events',
  type: 'bubble',
});

const prepareDataSet = (
  name,
  borderColor,
  startDate = null,
  endDate = null,
  mode = 'value',
) => ({
  label: data?.[name]?.name || name,
  borderColor,
  fill: false,
  data: (data?.[name]?.data || [])
    .filter((item) => {
      if (startDate && moment(startDate).isSameOrAfter(item.date)) {
        return false;
      }

      if (endDate && moment(endDate).isSameOrBefore(item.date)) {
        return false;
      }

      return true;
    })
    .map((item) => ({
      x: item.date,
      // eslint-disable-next-line no-nested-ternary
      y: item[mode],
    })),
  yAxisID: 'values',
});

const getTops = (howMany, what, endDate = null) => Object.keys(data)
  .sort((one, two) => {
    const oneDateData = endDate
      ? data[one].data.find((val) => endDate === val.date)
      : data[one].data[data[one].data.length - 1];
    const twoDateData = endDate
      ? data[two].data.find((val) => endDate === val.date)
      : data[two].data[data[two].data.length - 1];

    return (twoDateData?.[what] || 0) - (oneDateData?.[what] || 0);
  })
  .slice(0, parseInt(howMany, 10));

const onConcelhoChanged = () => {
  const selectedConcelho = document.getElementById('concelhos').value;
  const checkedLog = document.getElementById('log').checked;
  const checkedVizinhanca = document.getElementById('neighbours').checked;
  const startDate = document.getElementById('start').value;
  const endDate = document.getElementById('end').value;
  const selectedMode = document.getElementById('mode').value;

  if (checkedLog) {
    chart.options.scales.yAxes[0].type = 'logarithmic';
  } else {
    chart.options.scales.yAxes[0].type = 'linear';
  }

  if (selectedConcelho) {
    if (selectedConcelho.startsWith('top')) {
      const [, howMany, what] = selectedConcelho.match(/top(\d+)(\w+)/);

      if (howMany && what) {
        drawChart({
          datasets: [
            prepareEvents(startDate, endDate),
            ...getTops(howMany, what, endDate)
              .map((name, index) => prepareDataSet(
                name,
                getColor(index),
                startDate,
                endDate,
                selectedMode,
              )),
          ],
        });
      } else {
        drawChart({ datasets: [] });
      }
    } else {
      drawChart({
        datasets: [
          prepareEvents(startDate, endDate),
          prepareDataSet(
            selectedConcelho,
            getColor(0),
            startDate,
            endDate,
            selectedMode,
          ),
          ...(!checkedVizinhanca ? [] : data[selectedConcelho].neighbours)
            .map((neighbour, index) => prepareDataSet(
              neighbour,
              getColor(index + 1),
              startDate,
              endDate,
              selectedMode,
            )),
        ],
      });
    }
  } else {
    drawChart({ datasets: [] });
  }
};

window.onload = () => {
  moment.locale('pt');

  initChart();

  const concelhosSelect = document.getElementById('concelhos');

  Object.keys(data)
    .sort((a, b) => a.localeCompare(b))
    .forEach((concelho) => {
      concelhosSelect
        .options[concelhosSelect.options.length] = new Option(data[concelho].name, concelho);
    });

  const vizinhancaCheck = document.getElementById('neighbours');
  const logCheck = document.getElementById('log');
  const startInput = document.getElementById('start');
  const endInput = document.getElementById('end');
  const modeSelect = document.getElementById('mode');

  concelhosSelect.onchange = onConcelhoChanged;
  vizinhancaCheck.onchange = onConcelhoChanged;
  startInput.onchange = onConcelhoChanged;
  endInput.onchange = onConcelhoChanged;
  logCheck.onchange = onConcelhoChanged;
  modeSelect.onchange = onConcelhoChanged;
};
