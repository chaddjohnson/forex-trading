var studies = require('../src/lib/studies');

module.exports = {
    configurations: [
        {
            "trendPrChannel": {
                "regression": "trendPrChannel650_2"
            },
            "prChannel": {
                "lower": "prChannelLower200_2_20",
                "upper": "prChannelUpper200_2_20"
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
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel300_2"
            },
            "prChannel": {
                "lower": "prChannelLower100_2_19",
                "upper": "prChannelUpper100_2_19"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi7"
            },
            "sma13": true,
            "ema50": false,
            "ema100": false,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel700_2"
            },
            "prChannel": {
                "lower": "prChannelLower200_2_21",
                "upper": "prChannelUpper200_2_21"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": false,
            "ema100": false,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel600_2"
            },
            "prChannel": {
                "lower": "prChannelLower200_2_21",
                "upper": "prChannelUpper200_2_21"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi7"
            },
            "sma13": true,
            "ema50": false,
            "ema100": true,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel650_2"
            },
            "prChannel": {
                "lower": "prChannelLower200_2_195",
                "upper": "prChannelUpper200_2_195"
            },
            "rsi": {
                "oversold": 23,
                "overbought": 77,
                "rsi": "rsi7"
            },
            "sma13": true,
            "ema50": true,
            "ema100": false,
            "ema200": false
        }
    ],
    studies: [
        {study: studies.Ema, inputs: {length: 100}, outputMap: {ema: 'ema100'}},
        {study: studies.Ema, inputs: {length: 50}, outputMap: {ema: 'ema50'}},
        {study: studies.Sma, inputs: {length: 13}, outputMap: {sma: 'sma13'}},
        {study: studies.Rsi, inputs: {length: 7}, outputMap: {rsi: 'rsi7'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 100, degree: 2, deviations: 1.9}, outputMap: {regression: 'prChannel100_2_19', upper: 'prChannelUpper100_2_19', lower: 'prChannelLower100_2_19'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 2, deviations: 1.95}, outputMap: {regression: 'prChannel200_2_195', upper: 'prChannelUpper200_2_195', lower: 'prChannelLower200_2_195'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 2, deviations: 2.0}, outputMap: {regression: 'prChannel200_2_20', upper: 'prChannelUpper200_2_20', lower: 'prChannelLower200_2_20'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 2, deviations: 2.1}, outputMap: {regression: 'prChannel200_2_21', upper: 'prChannelUpper200_2_21', lower: 'prChannelLower200_2_21'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 300, degree: 2}, outputMap: {regression: 'trendPrChannel300_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 600, degree: 2}, outputMap: {regression: 'trendPrChannel600_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 650, degree: 2}, outputMap: {regression: 'trendPrChannel650_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 700, degree: 2}, outputMap: {regression: 'trendPrChannel700_2'}}
    ]
};
