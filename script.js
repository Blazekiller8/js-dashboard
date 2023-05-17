// Define the data for the charts
let data = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  datasets: [
    {
      label: "Hours",
      data: generateRandomData(),
      backgroundColor: "#3e95cd",
    },
  ],
};

// Create the bar chart
let ctx1 = document.getElementById("chart-1").getContext("2d");
let chart1 = new Chart(ctx1, {
  type: "bar",
  data: data,
  options: {
    responsive: true,
    onClick: function (e) {
      let index = chart1.getElementsAtEventForMode(
        e,
        "nearest",
        { intersect: true },
        true
      )[0]._index;
      updateChart2(index);
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});

// Create the pie chart
let ctx2 = document.getElementById("chart-2").getContext("2d");
let chart2 = new Chart(ctx2, {
  type: "doughnut",
  data: {},
  options: {
    responsive: true,
  },
});

// Generate random data for the charts
function generateRandomData() {
  let data = [];
  for (let i = 0; i < 7; i++) {
    data.push(Math.floor(Math.random() * 10) + 1);
  }
  return data;
}

// Update chart 2 based on the selected criteria and bar chart index
function updateChart2(index) {
  let selectedCriteria = document.getElementById("criteria").value;
  let data = generateRandomAppData(selectedCriteria, index);
  let labels = Object.keys(data);
  let backgroundColor = [];
  for (let i = 0; i < labels.length; i++) {
    backgroundColor.push(getRandomColor());
  }
  chart2.data = {
    labels: labels,
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: backgroundColor,
      },
    ],
  };
  chart2.update();
}

// Generate random app data based on the selected criteria and bar chart index
function generateRandomAppData(criteria, index) {
  let data = {};
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let total = 0;
  for (let i = 0; i < days.length; i++) {
    let value = Math.floor(Math.random() * 10) + 1;
    total += value;
    data[days[i]] = value;
  }
  let selectedValue = data[days[index]];
  let appData = {};
  let appNames = ["Facebook", "Instagram", "Twitter", "WhatsApp", "YouTube"];
  for (let i = 0; i < appNames.length; i++) {
    let value = Math.floor(Math.random() * 60) + 1;
    if (criteria === "screen-time") {
      appData[appNames[i]] = Math.floor((value / 60) * selectedValue);
    } else if (criteria === "notifications-received") {
      appData[appNames[i]] = Math.floor((value / 60) * total);
    } else if (criteria === "times-opened") {
      appData[appNames[i]] = Math.floor((value / 60) * total);
    }
  }
  let remainingValue = total - selectedValue;
  appData["Other"] = Math.floor((60 / 60) * remainingValue); // Assuming 60 minutes in an hour
  return appData;
}

// Get a random color for the chart
function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Update chart 1 based on the selected criteria
function updateChart1() {
  let selectedCriteria = document.getElementById("criteria").value;
  let newData = generateRandomData();
  chart1.data.datasets[0].data = newData;
  chart1.update();
  updateChart2(null);
}

// Reset chart 2 to initial state
function resetChart2() {
  chart2.data = {};
  chart2.update();
}

// Event listener for criteria dropdown
document.getElementById("criteria").addEventListener("change", function () {
  updateChart1();
});

// Initial chart rendering
updateChart1();

// Call updateChart2 with initial value when page is first loaded
updateChart2(0);
