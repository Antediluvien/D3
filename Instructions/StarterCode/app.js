// // @TODO: YOUR CODE HERE!
// let data = d3.csv('data.csv')
//   .then(function(data) {
//   console.log(data[0])
// });

let chart_width = 1000;
let chart_height = 400;
let padding = 50;

// data1 = []
// function parse(array) {
//     for (var i = 0; i < array.length; i++) {
//         data1 += parseFloat(array[i]);
//     }
//     return data1;
// }
// parse(data);
// console.log(data1)
let csvData;

d3.csv('data.csv')
    .then(function (data) {
        csvData = data;
        console.log("This is data after importing: ", csvData); // This data is NOT formatted correctly, the numbers are string values
    })
    .then(function () {
        console.log("This is csvData after reading: ", csvData.length);

        // Loop through all of the row (objects), and convert strings to numbers
        for (let i = 0; i < csvData.length; i++) {
            // csvData[i] will be EACH OBJECT, and we can access any of its key-value pairs using dot or bracket notation:
            // For example, if we want to convert the age values:
            csvData[i].age = parseInt(csvData[i].age);
            csvData[i].smokes = parseInt(csvData[i].smokes); // we reassign the age value to be an integer!
            // Do this for all values that you want to convert!
        }

        console.log("Here is our data after conversion: ")
        console.log(csvData)
        //Create SVG Element
        let svg = d3.select('#scatter')
            .append('svg')
            .attr('width', chart_width)
            .attr('height', chart_height);


        console.log("after svg is created")
        let x_scale = d3.scaleLinear()
            .domain([d3.min(csvData, function (d) {
                return d.age;
            }),
            d3.max(csvData, function (d) {
                return d.age;
            })])
            .range([padding, chart_width - padding * 2])
        console.log("after x_scale is created")

        let y_scale = d3.scaleLinear()
            .domain([0, d3.max(csvData, function (d) {
                return d.smokes;
            })])
            .range([chart_height - padding, padding])
        console.log("after y_scale is created")

        let a_scale = d3.scaleLinear()
            .domain([0, d3.max(csvData, function (d) {
                return d.smokes;
            })])
            .range([0, 15
            ]);
        console.log("after a_scale is created")

        //Create Circles
        svg.selectAll('circle')
            .data(csvData)
            .enter()
            .append('circle')
            .attr('cx', function (d) {
                return x_scale(d.age);
            })
            .attr('cy', function (d) {
                return y_scale(d.smokes);
            })
            .attr('r', function (d) {
                return a_scale(d.smokes);
            })
            .attr('fill', '#D1AB0E');
        console.log("after circles are created")

        //Create Labels
        svg.selectAll('text')
            .data(csvData)
            .enter()
            .append('text')
            .text(function (d) {
                return (d.age);// after time format was created above it now has to be wrapped
                // around the date element for the format to actually change
            })
            .attr('x', function (d) {
                return x_scale(d.age);
            })
            .attr('y', function (d) {
                return y_scale(d.smokes);
            })
        console.log("after labels are created")
        //Create Axis's
        //Create the SVG Viewport selection

        var svgContainer = d3.select("body").append("svg")
            .attr("width", 400)
            .attr("height", 100);

        //Create the Scale we will use for the Axis
        var axisScale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, 400]);

        //Create the Axis
        var xAxis = d3.svg.axis()
            .scale(axisScale);
    })

