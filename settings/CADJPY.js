var studies = require('../src/lib/studies');

module.exports = {
    configurations: [
        {
            "trendPrChannel": {
                "regression": "trendPrChannel800_2"
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
                "lower": "prChannelLower250_4_19",
                "upper": "prChannelUpper250_4_19"
            },
            "rsi": {
                "oversold": 23,
                "overbought": 77,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": false,
            "ema100": false,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel850_2"
            },
            "prChannel": {
                "lower": "prChannelLower200_4_19",
                "upper": "prChannelUpper200_4_19"
            },
            "rsi": {
                "oversold": 23,
                "overbought": 77,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": true,
            "ema100": true,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel400_2"
            },
            "prChannel": {
                "lower": "prChannelLower250_4_195",
                "upper": "prChannelUpper250_4_195"
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
                "lower": "prChannelLower250_4_20",
                "upper": "prChannelUpper250_4_20"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi5"
            },
            "sma13": true,
            "ema50": true,
            "ema100": false,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel200_2"
            },
            "prChannel": {
                "lower": "prChannelLower250_4_20",
                "upper": "prChannelUpper250_4_20"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi5"
            },
            "sma13": false,
            "ema50": true,
            "ema100": true,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel850_2"
            },
            "prChannel": {
                "lower": "prChannelLower200_4_19",
                "upper": "prChannelUpper200_4_19"
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
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel200_2"
            },
            "prChannel": {
                "lower": "prChannelLower250_4_195",
                "upper": "prChannelUpper250_4_195"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi5"
            },
            "sma13": false,
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
        {study: studies.Rsi, inputs: {length: 5}, outputMap: {rsi: 'rsi5'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 4, deviations: 1.9}, outputMap: {regression: 'prChannel200_4_19', upper: 'prChannelUpper200_4_19', lower: 'prChannelLower200_4_19'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 2, deviations: 2.1}, outputMap: {regression: 'prChannel200_2_21', upper: 'prChannelUpper200_2_21', lower: 'prChannelLower200_2_21'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 250, degree: 4, deviations: 1.9}, outputMap: {regression: 'prChannel250_4_19', upper: 'prChannelUpper250_4_19', lower: 'prChannelLower250_4_19'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 250, degree: 4, deviations: 1.95}, outputMap: {regression: 'prChannel250_4_195', upper: 'prChannelUpper250_4_195', lower: 'prChannelLower250_4_195'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 250, degree: 4, deviations: 2.0}, outputMap: {regression: 'prChannel250_4_20', upper: 'prChannelUpper250_4_20', lower: 'prChannelLower250_4_20'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 2}, outputMap: {regression: 'trendPrChannel200_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 400, degree: 2}, outputMap: {regression: 'trendPrChannel400_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 650, degree: 2}, outputMap: {regression: 'trendPrChannel650_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 800, degree: 2}, outputMap: {regression: 'trendPrChannel800_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 850, degree: 2}, outputMap: {regression: 'trendPrChannel850_2'}}
    ]
};
