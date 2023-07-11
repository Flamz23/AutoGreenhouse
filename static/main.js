const LIGHT = 21;
const HEATER = 20;
const PUMP = 16;

var lightState = 0;
var heaterState = 0;
var pumpState = 0;


var socket = io();

// Light // implement to know state of lamp
document.getElementById('light-toggle').addEventListener('click', function () {
    if (lightState === 1) {
        lightState = 0;
    } else {
        lightState = 1;
    }
    var data = { pin: LIGHT, state: lightState };
    socket.emit('set_gpio_state', data)
    console.log(data)
})

// Heater
document.getElementById('heater-toggle').addEventListener('click', function () {
    if (heaterState === 1) {
        heaterState = 0;
    } else {
        heaterState = 1;
    }
    var data = { pin: HEATER, state: heaterState };
    socket.emit('set_gpio_state', data)
    console.log(data)
})

// Pump
document.getElementById('pump-toggle').addEventListener('click', function () {
    if (pumpState === 1) {
        pumpState = 0;
    } else {
        pumpState = 1;
    }
    var data = { pin: PUMP, state: pumpState };
    socket.emit('set_gpio_state', data)
    console.log(data)
})

socket.on('gpio_refresh', function (res) {
    console.log(res);
})






google.charts.load('current', { 'packages': ['corechart'] }); // Load the Visualization API
google.charts.setOnLoadCallback(drawChart); // API load callback

function UpdateData(value, data, chart, options) {
    var today = new Date();
    data.addRow([`${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`, value]); // Add to the data   
    chart.draw(data, options); // update chart

    // Stop adding data after 10 points
    var numRows = data.getNumberOfRows();
    if (numRows > 10) {
        data.removeRow(0);
    }
}


function drawChart() {
    // Create an empty data table with one column
    var tempData = new google.visualization.DataTable();
    tempData.addColumn('string', 'Time');
    tempData.addColumn('number', 'Temperature (C)');

    var heaterData = new google.visualization.DataTable();
    heaterData.addColumn('string', 'Time');
    heaterData.addColumn('number', 'Heater (on/off)');

    var humidData = new google.visualization.DataTable();
    humidData.addColumn('string', 'Time');
    humidData.addColumn('number', 'Humidity');

    var moistureData = new google.visualization.DataTable();
    moistureData.addColumn('string', 'Time');
    moistureData.addColumn('number', 'Moisture');

    var pumpData = new google.visualization.DataTable();
    pumpData.addColumn('string', 'Time');
    pumpData.addColumn('number', 'Pump (on/off)');

    // Create a new line chart
    var tempChart = new google.visualization.LineChart(document.getElementById('temp-chart'));
    var heaterChart = new google.visualization.LineChart(document.getElementById('heater-chart'));
    var humidChart = new google.visualization.LineChart(document.getElementById('humid-chart'));
    var moistureChart = new google.visualization.LineChart(document.getElementById('moisture-chart'));
    var pumpChart = new google.visualization.LineChart(document.getElementById('pump-chart'));

    // Set chart options
    var options = {
        title: 'Dynamic Chart',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    setInterval(function () {
        console.log('refresh_request call')   
        socket.emit('refresh_request')   
    }, 2000)

    setInterval(function () {
        var value = Math.floor(Math.random() * 100); // Generate data point
        UpdateData(value, tempData, tempChart, { title: 'Temperature', legend: { position: 'bottom' } })
        UpdateData(value, heaterData, heaterChart, { title: 'Heater', legend: { position: 'bottom' } })
        UpdateData(value, humidData, humidChart, { title: 'Humidity', legend: { position: 'bottom' } })
        UpdateData(value, moistureData, moistureChart, { title: 'Moisture', legend: { position: 'bottom' } })
        UpdateData(value, pumpData, pumpChart, { title: 'Pump', legend: { position: 'bottom' } })
        
    }, 1000)
}




// setInterval(function () {
    //     var today = new Date();
    //     var value = Math.floor(Math.random() * 100); // Generate data point
    //     tempData.addRow([`${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`, value]); // Add to the data table 
    //     // update chart
    //     tempChart.draw(tempData, { title: 'Temperature', legend: { position: 'bottom' } });
    //     // Stop adding data after 10 points
    //     var numTempRows = tempData.getNumberOfRows();
    //     if (numTempRows > 10) {
    //         tempData.removeRow(0);
    //     }
    // }, 1000);

// $(document).ready(function () {});
