gasdata_url = 'http://localhost:5000/getdata';

// Function created to get the distinct year list
const distinct = (value, index, self)  => {

    return self.indexOf(value) === index;
}




d3.json(gasdata_url).then(gasdata => {
    let dates = [];
    let prices = [];
    let years = [];
    let yearList = [];
    // Convert price data to numeric when appropriate
    // then collect x,  y axis data
    gasdata.history.forEach(r => {
        r.price = +r.price;
        // Convert from MMM DD, YYYY to YYYY-MM-DD
        // so that x axis tickers and labels get dynamically
        // resized
        const parser = d3.timeParse('%b %d, %Y');
        const formatter = d3.timeFormat('%Y-%m-%d');
        dates.push(formatter(parser(r.date)));
        prices.push(r.price);
        years.push(parser(r.date).getFullYear()); //parsing out years and storing in a list
    });
    console.log(years); // checking variable

    yearList = years.filter(distinct); //filtering years with distinct function
    console.log(yearList); // checking variable


    const trace = {
        type: 'scatter',
        mode: 'lines',
        name: 'Gas Prices',
        x: dates,
        y: prices,
        line: { color: "#17BECF" }
    };

    const data = [trace];
    
    for (var i = 0; i <= yearList.length; i++)
    {
        //const startYear = yearList[0]; // 1993
        //const endYear = yearList[yearList.length - 1];
        if (i <= 27)
        {

            const layout = {

                title: `Year ${yearList[i]} Price (per gallon)`,
                autosize: false,
                width: 600,
                height: 500,
                xaxis: {
                    range: [`${yearList[i]}-01-01`, `${yearList[i+1]}-01-01`],
                    showticklabels: true,
                    tickangle: 'auto',
                },
                yaxis: {
                    title: {
                        text: "In USD"
                    },
                    fixedrange: true,
                }
            };
            // console.log(yearList[i]);
            Plotly.newPlot(`plot${i}`, data, layout);
        }

        else
        {
            break;
        }
  }

        // for (var i = 27; i < yearList.length; i++){
        //     const layout = {
    
        //         title: `Year ${yearList[i]} Price (per gallon)`,
        //         autosize: false,
        //         width: 600,
        //         height: 500,
        //         xaxis: {
        //             range: [`${yearList[i]}-01-01`, `${yearList[i+1]}-01-01`],
        //             showticklabels: true,
        //             tickangle: 'auto',
        //         },
        //         yaxis: {
        //             title: {
        //                 text: "In USD"
        //             },
        //             fixedrange: true,
        //         }
        //     };
        //     console.log(yearList[i]);
        //     Plotly.newPlot('plot', data, layout);}

}).catch(error => console.log(error));
