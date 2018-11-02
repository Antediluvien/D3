
d3.csv('data.csv').then(function (data) {
    // Loop through all of the row (objects), and convert strings to numbers
    for (let i = 0; i < data.length; i++) {
        // csvData[i] will be EACH OBJECT, and we can access any of its key-value pairs using dot or bracket notation:
        // For example, if we want to convert the age values:
        data[i].age = parseInt(data[i].age);
        data[i].smokes = parseInt(data[i].smokes); // we reassign the age value to be an integer!
        // Do this for all values that you want to convert!
    }
    console.log(data)
    x_list = [];
    y_list = [];
    text_list = [];
    for (let i = 0; i < data.length; i++) {
        x_list.push(data[i].age)
        y_list.push(data[i].smokes)
        text_list.push(`${data[i].age}:${data[i].smokes}`)
    }


    var trace1 = {
        x: x_list,
        y: y_list,
        mode: 'markers',
        type: 'scatter',
        name: 'Age vs Smokes',
        text: text_list,
        marker: { size: 12 }
    };


    var plot_data = [trace1];

    var layout = {
        xaxis: {
            title: 'Age',
            range: [25, 45]
        },
        yaxis: {
            title: 'Smokes',
            range: [0, 30]
        },
        title: 'Age vs Smokes'
    };

    Plotly.newPlot('scatter', plot_data, layout);
})
