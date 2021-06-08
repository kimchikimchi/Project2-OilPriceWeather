// Use d3 to update data table with week and gas price
d3.json("http://localhost:5000/getdata").then((data) => {
    // log data 
    // console.log(data);

    // table body
    var tbody = d3.select("tbody");


    // Configure a parser for date which will return year only
    var formatYear = d3.timeFormat("%Y");


    // append each item in data object to row on table,
    data.history.forEach(function (gasData) {
        // console.log(gasData);
        var row = tbody.append("tr");
        Object.entries(gasData).forEach(function ([key, value]) {
            // format so we get year only
            gasData.date = formatYear(gasData.date)
            console.log(gasData.date);
            // Append a cell to the row for each value
            var cell = row.append("td");
            cell.text(value);
        });
    });

})
    // handle errors
    .catch(function (error) {
        console.log(error)
    });
