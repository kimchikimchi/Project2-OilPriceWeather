//d3 json call json file
console.log("Get data from json file ");

// table body
var tbody = d3.select("tbody");

// Use d3 to update data table with week and gas price
d3.json("../data_sample.json").then((data) => {
    // log data 
    console.log(data);

    // append each item in data object to row on table,
    data.forEach(function (gasData) {
        var row = tbody.append("tr");
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
