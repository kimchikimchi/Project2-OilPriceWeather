gasdata_url = 'http://localhost:5000/getdata';

d3.json(gasdata_url).then(gasdata => {
    let dates = [];
    let prices = [];

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
    });

    // Adding graph selector options button to limit to
    // 1mo, ymo, year-to-date, 1y, and all
    const selectorOptions = {
        buttons: [{
            step: 'month',
            stepmode: 'backward',
            count: 1,
            label: '1m'
        }, {
            step: 'month',
            stepmode: 'backward',
            count: 6,
            label: '6m'
        }, {
            step: 'year',
            stepmode: 'todate',
            count: 1,
            label: 'YTD'
        }, {
            step: 'year',
            stepmode: 'backward',
            count: 1,
            label: '1y'
        }, {
            step: 'all',
        }],
    };

    const trace = {
        type: 'scatter',
        mode: 'lines',
        name: 'Gas Prices',
        x: dates,
        y: prices,
        line: { color: "#17BECF" }
    };

    const data = [trace];

    const layout = {
        title: 'Historic US Average Gasoline Price (per gallon)',
        xaxis: {
            rangeselector: selectorOptions,
            rangeslider: {},
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

    Plotly.newPlot('plot', data, layout);

}).catch(error => console.log(error));
