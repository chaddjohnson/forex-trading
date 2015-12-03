var studies = require('../src/lib/studies');

module.exports = {
    configurations: [
        {
            "trendPrChannel": {
                "regression": "trendPrChannel800_2"
            },
            "prChannel": {
                "lower": "prChannelLower200_4_20",
                "upper": "prChannelUpper200_4_20"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi7"
            },
            "sma13": true,
            "ema50": true,
            "ema100": false,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel800_2"
            },
            "prChannel": {
                "lower": "prChannelLower200_4_20",
                "upper": "prChannelUpper200_4_20"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": false,
            "ema100": true,
            "ema200": true
        }
    ],
    studies: [
        {study: studies.Ema, inputs: {length: 200}, outputMap: {ema: 'ema200'}},
        {study: studies.Ema, inputs: {length: 100}, outputMap: {ema: 'ema100'}},
        {study: studies.Ema, inputs: {length: 50}, outputMap: {ema: 'ema50'}},
        {study: studies.Sma, inputs: {length: 13}, outputMap: {sma: 'sma13'}},
        {study: studies.Rsi, inputs: {length: 7}, outputMap: {rsi: 'rsi7'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 4, deviations: 2.0}, outputMap: {regression: 'prChannel200_4_20', upper: 'prChannelUpper200_4_20', lower: 'prChannelLower200_4_20'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 800, degree: 2}, outputMap: {regression: 'trendPrChannel800_2'}}
    ]
};
