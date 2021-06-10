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

    const trace_events = {
        type: 'scatter',
        mode: 'markers',
        name: 'Historical Events',
        x: ['2001-09-11', '2008-09-15', '2014-09-15', 
    '2020-03-11', '2020-12-14', '2011-05-02'],
        y: [1.564, 3.772, 3.534, 2.514, 2.246, 4.014],
        text: ['9/11 Attack', 'Lehman Brothers Collapse', 'Oil Glut', 'WHO Declares Pandemic', 'First Person American Vaccinated', 'US Captures Osama bin Laden'],
        marker: {size: 15}

    };

    const data = [trace, trace_events];

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
