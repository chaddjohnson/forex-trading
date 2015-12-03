var studies = require('../src/lib/studies');

module.exports = {
    configurations: [
        {
            "trendPrChannel": {
                "regression": "trendPrChannel750_2"
            },
            "prChannel": {
                "lower": "prChannelLower300_2_195",
                "upper": "prChannelUpper300_2_195"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi5"
            },
            "sma13": true,
            "ema50": true,
            "ema100": true,
            "ema200": true
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel200_2"
            },
            "prChannel": {
                "lower": "prChannelLower300_4_19",
                "upper": "prChannelUpper300_4_19"
            },
            "rsi": {
                "oversold": 23,
                "overbought": 77,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": true,
            "ema100": false,
            "ema200": false
        }
    ],
    studies: [
        {study: studies.Ema, inputs: {length: 200}, outputMap: {ema: 'ema200'}},
        {study: studies.Ema, inputs: {length: 100}, outputMap: {ema: 'ema100'}},
        {study: studies.Ema, inputs: {length: 50}, outputMap: {ema: 'ema50'}},
        {study: studies.Sma, inputs: {length: 13}, outputMap: {sma: 'sma13'}},
        {study: studies.Rsi, inputs: {length: 7}, outputMap: {rsi: 'rsi7'}},
        {study: studies.Rsi, inputs: {length: 5}, outputMap: {rsi: 'rsi5'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 300, degree: 4, deviations: 1.9}, outputMap: {regression: 'prChannel300_4_19', upper: 'prChannelUpper300_4_19', lower: 'prChannelLower300_4_19'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 300, degree: 2, deviations: 1.95}, outputMap: {regression: 'prChannel300_2_195', upper: 'prChannelUpper300_2_195', lower: 'prChannelLower300_2_195'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 2}, outputMap: {regression: 'trendPrChannel200_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 750, degree: 2}, outputMap: {regression: 'trendPrChannel750_2'}}
    ]
};
