var studies = require('../src/lib/studies');

module.exports = {
    configurations: [
        {
            "trendPrChannel": {
                "regression": "trendPrChannel500_2"
            },
            "prChannel": {
                "lower": "prChannelLower200_3_195",
                "upper": "prChannelUpper200_3_195"
            },
            "rsi": {
                "oversold": 23,
                "overbought": 77,
                "rsi": "rsi7"
            },
            "sma13": true,
            "ema50": true,
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
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 3, deviations: 1.95}, outputMap: {regression: 'prChannel200_3_195', upper: 'prChannelUpper200_3_195', lower: 'prChannelLower200_3_195'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 500, degree: 2}, outputMap: {regression: 'trendPrChannel500_2'}}
    ]
};
