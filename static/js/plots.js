gasdata_url = 'http://localhost:5000/getdata';

d3.json(gasdata_url).then(gasdata => {
    let dates = [];
    let prices = [];

    // Convert price data to numeric when appropriate
    // then collect x,  y axis data
    gasdata.history.forEach(r => {
        r.price = +r.price;
        dates.push(r.date);
        prices.push(r.price);
    });

    let selectorOptions = {
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
        title: 'Historic US Gasoline Data',
        xaxis: {
            rangeselector: selectorOptions,
            rangeslider: {}
        },
        yaxis: {
            fixedrange: true
        }
    };

    Plotly.newPlot('plot', data, layout);

}).catch(error => console.log(error));
