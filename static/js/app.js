// Use d3 to update data table with week and gas price
d3.json("http://localhost:5000/getdata").then(function (data) {
    // console.log(data.history);

    // Configure a parser for date which will return year only
    var formatYear = d3.timeFormat("%Y");
    var formatMonth = d3.timeFormat("%b"); //month abbreviated
    const parseTime = d3.timeParse('%b %d, %Y');


    //d3.nest to group our data by year (groupedData is an array of objects)
    var groupedData = d3.nest()
        .key(function (dt) { return formatYear(parseTime(dt.date)); })
        .entries(data.history);

    console.log(groupedData);

    groupedData.forEach(function (d) {
        // console.log(d.values);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // for (var i = 0; i < d.values.length; i++) {
        //     //    console.log(d.values[i]);
        // }


        // use d3 to populate data table
        d3.select("tbody")
            .selectAll("tr")
            .data(groupedData)
            .enter()
            .append("tr")
            .html(function (d) {
                // console.log(d.values);
                // date/price map
                // d.values.forEach(function(dv){
                //     // console.log(dv);
                // })

                return `<td>${d.key}</td>
                <td></td ><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>`;
            });

    });

    //function to get price ave for each month
    function monthAve(array) {
        // console.log(array);

        var i = 0, sum = 0, len = array.length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < i; j++) {
                console.log(array[j]);
            }
        }
        while (i < len) {
            sum = sum + array[i++];
        }
        return sum / len;
    }


});