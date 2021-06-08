// // Use d3 to update data table with week and gas price

// d3.json("http://localhost:5000/getdata").then((data) => {
//     // log data 
//     // console.log(data.history);

//     // table body
//     var tbody = d3.select("tbody");

//     // Configure a parser for date which will return year only
//     var formatYear = d3.timeFormat("%Y");
//     const parseTime = d3.timeParse('%B %d, %Y');

//     // append each item in data object to row on table,
//     /* pause
//     data.history.forEach(function (gasData) {
//         // See https://github.com/d3/d3-time-format
//         var row = tbody.append("tr");

//         // format so we get year only
//         gasData.date = formatYear(parseTime(gasData.date));
//         console.log(gasData.date);
//         // Append a cell to the row for each value
//         var yearcell = row.append("td");
//         yearcell.text(gasData.date);

//     });
//     */

// })
// // handle errors
// .catch(function (error) {
//     console.log(error)
// });


// data.history.forEach(function (gasData) {}

d3.json("http://localhost:5000/getdata").then(function (data) {
    // console.log(data.history);

    // Configure a parser for date which will return year only
    var formatYear = d3.timeFormat("%Y");
    var formatMonth = d3.timeFormat("%b"); //month abbreviated
    const parseTime = d3.timeParse('%b %d, %Y');


    //nest
    var groupedData = d3.nest()
        // .key(function (dt) { return formatMonth(dt.date); })
        // .key(function (dt) { return formatYear(dt.date); })
        .key(function (dt) { return dt.date; })
        .key(function (dt) { return dt.price; })
        .entries(data.history);

    // console.log("ArrayData:", groupedData);
    
    groupedData.forEach(function (d) {
        // console.log(d)


    });

    var gfg = d3.rollup(data.history, g=>g.length, d=>d.date, d=>d.price);
    console.log("gfg: ",gfg);

});