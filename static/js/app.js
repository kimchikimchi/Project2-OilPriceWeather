// Helper function to calculate average of objects passed in an array
const calculateMonthlyAvg = function (array) {
    let avg_price = 0;
    let total_price = 0;
    array.forEach(obj => { 
        // Convert price from string to a number.
        obj.price = +obj.price;
        total_price += obj.price;
    })

    avg_price = total_price / array.length;
    return avg_price.toFixed(3);
};


// Use d3 to update data table with week and gas price
d3.json("http://localhost:5000/getdata").then(function (data) {
    // console.log(data.history);

    // Configure a parser for date which will return year only
    var formatYear = d3.timeFormat("%Y");
    var formatMonth = d3.timeFormat("%b"); //month abbreviated
    const parseTime = d3.timeParse('%b %d, %Y');


    /*
        This should return nested object of 
        <YYYY>: { <MMMM>: [<obj1>, <obj2>, ... ]}
        ...
        See https://github.com/d3/d3-collection for details
    */
    var groupedData = d3.nest()
        .key(function (dt) { return formatYear(parseTime(dt.date)); })
        .key(function (dt) { return formatMonth(parseTime(dt.date)); })
        //.key(function (dt) { return dt.price; })
        .entries(data.history);

    // console.log(groupedData);
    
    // Should old monthly price totals
    let monthlyPrices = {};

    groupedData.forEach(yearlyData => {
        let year = yearlyData.key;
        // console.log(`Starting ${year}`);
        // Initialize year object
        monthlyPrices[year] = {};

        yearlyData.values.forEach(monthlyData => {
            const month =  monthlyData.key;
            const monthly_price = calculateMonthlyAvg(monthlyData.values);
            // console.log(`avg gas price for ${year} and ${month} is ${monthly_price}`);

            // Storing in the following fashion
            // result = {
            //     1993 : {
            //         'jan': price,
            //         'feb': price
            //     }
            //  }...
            monthlyPrices[year][month] = monthly_price;
        });
    });

    // console.log(monthlyPrices);

    const tbody = d3.select("tbody");
    let tr = tbody;

    const monthlyPricesArr = Object.entries(monthlyPrices);
    // Data binding and HTML table rendering. Wish the td rendering was more elegant but it works.
    d3.select("tbody")
        .selectAll("tr")
        .data(monthlyPricesArr)
        .enter()
        .append("tr")
        .html(function(d) {
                return  `<td><h7><b>${d[0]}<b></h7></td> <td>${d[1].Jan||'N/A'}</td> <td>${d[1].Feb||'N/A'}</td> <td>${d[1].Mar||'N/A'}`
                        + `</td> <td>${d[1].Apr||'N/A'}</td> <td>${d[1].May||'N/A'}</td> <td>${d[1].Jun||'N/A'}</td> `
                        + `<td>${d[1].Jul||'N/A'}</td> <td>${d[1].Aug||'N/A'}</td> <td>${d[1].Sep||'N/A'}</td> `
                        + `<td>${d[1].Oct||'N/A'}</td> <td>${d[1].Nov||'N/A'}</td> <td>${d[1].Dec||'N/A'}</td>`;
        });

});