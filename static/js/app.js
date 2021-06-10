const calculateMonthlyAvg = function (array) {
    let avg_price = 0;
    let total_price = 0;
    array.forEach(obj => { 
        
        obj.price = +obj.price;
        total_price += obj.price;
    })

    avg_price = total_price / array.length;
    return avg_price;
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
        monthlyPrices[year] = {};

        yearlyData.values.forEach(monthlyData => {
   
            const month =  monthlyData.key;
            // console.log(`Starting ${month}`);
            const monthly_price = calculateMonthlyAvg(monthlyData.values);
            // console.log(monthly_price);
    
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

    console.log(monthlyPrices);


    groupedData.forEach(function (d) {
        // console.log(d);
        // stepping into the groupedData for prices by month
        for (var i = 0; i < d.values.length - 1; i++) {
            for (var j = 0; j < i; j++) {
                //console.log(d.values[i].key)
               
            }
        }

        d3.select("tbody")
            .selectAll("tr")
            .data(groupedData)
            .enter()
            .append("tr")
            .html(function (d) {
                return `<td>${d.key}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>`;
            });

    });

    //function to get price ave for each month
    function monthAve(array) {
        var i = 0, sum = 0, len = array.length;
        while (i < len) {
            sum = sum + array[i++];
        }
        return sum / len;
    }



});