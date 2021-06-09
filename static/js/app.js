// Use d3 to update data table with week and gas price
d3.json("http://localhost:5000/getdata").then(function (data) {
    // console.log(data.history);

    // Configure a parser for date which will return year only
    var formatYear = d3.timeFormat("%Y");
    var formatMonth = d3.timeFormat("%b"); //month abbreviated
    const parseTime = d3.timeParse('%b %d, %Y');


    //d3.nest 
    var groupedData = d3.nest()
        .key(function (dt) { return formatYear(parseTime(dt.date)); })
        .key(function (dt) { return formatMonth(parseTime(dt.date)); })
        .key(function (dt) { return dt.price; })
        .entries(data.history);


    groupedData.forEach(function (d) {
        // console.log(d);
        // stepping into the groupedData for prices by month
        for (var i = 0; i < d.values.length - 1; i++) {
            for (var j = 0; j < i; j++) {
                console.log(d.values[i].key)
               
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