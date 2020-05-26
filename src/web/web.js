/* eslint-disable no-undef */

let chart;

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
        },
      },
      scales: {
        yAxes: [{
          type: 'linear',
          ticks: {
            beginAtZero: true,
            precision: 0,
          },
        }],
        xAxes: [{
          type: 'time',
          time: {
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

const prepareDataSet = (
  name,
  primary = true,
  startDate = null,
  endDate = null,
  increment = false,
  active = false,
) => ({
  label: data?.[name]?.name || name,
  borderColor: primary ? 'rgba(81, 144, 245, 0.8)' : 'rgba(81, 144, 245, 0.3)',
  fill: false,
  data: (data?.[name]?.data || [])
    .filter((item) => {
      if (startDate && moment(startDate).isAfter(item.date)) {
        return false;
      }

      if (endDate && moment(endDate).isBefore(item.date)) {
        return false;
      }

      return true;
    })
    .map((item) => ({
      x: item.date,
      // eslint-disable-next-line no-nested-ternary
      y: increment ? item.increment : (active ? item.proportionalActive : item.value),
    })),
});

const onConcelhoChanged = () => {
  const selectedConcelho = document.getElementById('concelhos').value;
  const checkedVizinhanca = document.getElementById('neighbours').checked;
  const checkedNew = document.getElementById('new').checked;
  const checkedLog = document.getElementById('log').checked;
  const checkedActive = document.getElementById('active').checked;
  const startDate = document.getElementById('start').value;
  const endDate = document.getElementById('end').value;

  if (checkedLog) {
    chart.options.scales.yAxes[0].type = 'logarithmic';
  } else {
    chart.options.scales.yAxes[0].type = 'linear';
  }

  if (selectedConcelho) {
    drawChart({
      datasets: [
        prepareDataSet(
          selectedConcelho,
          true,
          startDate,
          endDate,
          checkedNew,
          checkedActive,
        ),
        ...(!checkedVizinhanca ? [] : data[selectedConcelho].neighbours)
          .map((neighbour) => prepareDataSet(
            neighbour,
            false,
            startDate,
            endDate,
            checkedNew,
            checkedActive,
          )),
      ],
    });
  } else {
    drawChart({ datasets: [] });
  }
};

window.onload = () => {
  moment.locale('pt');

  initChart();

  const concelhosSelect = document.getElementById('concelhos');
  concelhosSelect.options[0] = new Option('Nenhum', '', true);

  Object.keys(data)
    .sort((a, b) => a.localeCompare(b))
    .forEach((concelho) => {
      concelhosSelect
        .options[concelhosSelect.options.length] = new Option(data[concelho].name, concelho);
    });

  const vizinhancaCheck = document.getElementById('neighbours');
  const newCheck = document.getElementById('new');
  const logCheck = document.getElementById('log');
  const activeCheck = document.getElementById('active');
  const startInput = document.getElementById('start');
  const endInput = document.getElementById('end');

  concelhosSelect.onchange = onConcelhoChanged;
  vizinhancaCheck.onchange = onConcelhoChanged;
  newCheck.onchange = onConcelhoChanged;
  logCheck.onchange = onConcelhoChanged;
  activeCheck.onchange = onConcelhoChanged;
  startInput.onchange = onConcelhoChanged;
  endInput.onchange = onConcelhoChanged;
};
