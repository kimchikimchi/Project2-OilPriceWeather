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

    // Events extracted from https://en.wikipedia.org/wiki/World_oil_market_chronology_from_2003#2004_to_2008:_rising_costs_of_oil
    const trace_events = {
        type: 'scatter',
        mode: 'markers',
        name: 'Historical Events',
        x: ['2001-09-11', '2003-03-20', '2003-05-01', 
    '2005-08-29', '2008-04-18', '2008-06-06', '2011-12-15'],
        y: [1.564, 1.752, 1.618, 2.514, 3.438, 4.131, 3.29],
        text: ['9/11 Attack', 'Iraq Invasion Ops Begins', 'Iraq Invasion Ops Ends', 'Hurricane Katrica Hits LA', 'Nigerian Militants Attacks Oil Pipeline', 'World Fears an Israeli Attack on Iran', 'US Conflict in Iraq Ends'],
        marker: {size: 15}
    };

    const data = [trace, trace_events];

    const layout = {
        title: 'Iraq War 2004-2011 and US Gas Price(per gallon)',
        xaxis: {
            rangeselector: selectorOptions,
            rangeslider: {},
            range: ['1998-01-01', '2012-01-01'],
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
