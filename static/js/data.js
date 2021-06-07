// display gas data table per year 1993-2020
d3.csv("../resources/gas1993-2020.csv").then((data) => {
    // log data 
    // console.log(data);

    // table body
    var tbody = d3.select("tbody");
    var thead = d3.select("thead");
    let headings = d3.keys(data[0]);
    let thRow = thead.append("tr");

    // console.log(headings);

    // append header values to table
    headings.forEach(f => {
        let thCell = thRow.append("th");
        thCell.text(f);
    });

    // append each item in data object to row on table,
    data.forEach(function (gasData) {
        let row = thead.append("tr");

        Object.entries(gasData).forEach(function ([key, value]) {
            // console.log(key, value);
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