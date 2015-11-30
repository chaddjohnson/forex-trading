var studies = require('../src/lib/studies');

module.exports = {
    configurations: [
        {
            "trendPrChannel": {
                "regression": "trendPrChannel650_2"
            },
            "prChannel": {
                "lower": "prChannelLower250_2_21",
                "upper": "prChannelUpper250_2_21"
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
                "regression": "trendPrChannel600_2"
            },
            "prChannel": {
                "lower": "prChannelLower250_2_19",
                "upper": "prChannelUpper250_2_19"
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
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel650_2"
            },
            "prChannel": {
                "lower": "prChannelLower300_3_195",
                "upper": "prChannelUpper300_3_195"
            },
            "rsi": {
                "oversold": 23,
                "overbought": 77,
                "rsi": "rsi7"
            },
            "sma13": true,
            "ema50": false,
            "ema100": false,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel650_2"
            },
            "prChannel": {
                "lower": "prChannelLower250_2_21",
                "upper": "prChannelUpper250_2_21"
            },
            "rsi": {
                "oversold": 23,
                "overbought": 77,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": true,
            "ema100": true,
            "ema200": true
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel600_2"
            },
            "prChannel": {
                "lower": "prChannelLower250_2_215",
                "upper": "prChannelUpper250_2_215"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": false,
            "ema100": true,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel800_2"
            },
            "prChannel": {
                "lower": "prChannelLower300_3_195",
                "upper": "prChannelUpper300_3_195"
            },
            "rsi": {
                "oversold": 23,
                "overbought": 77,
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
                "lower": "prChannelLower250_2_215",
                "upper": "prChannelUpper250_2_215"
            },
            "rsi": {
                "oversold": 23,
                "overbought": 77,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": false,
            "ema100": true,
            "ema200": true
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel500_2"
            },
            "prChannel": {
                "lower": "prChannelLower250_2_19",
                "upper": "prChannelUpper250_2_19"
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
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel450_2"
            },
            "prChannel": {
                "lower": "prChannelLower300_2_19",
                "upper": "prChannelUpper300_2_19"
            },
            "rsi": {
                "oversold": 23,
                "overbought": 77,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": false,
            "ema100": true,
            "ema200": true
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel600_2"
            },
            "prChannel": {
                "lower": "prChannelLower300_4_19",
                "upper": "prChannelUpper300_4_19"
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
                "regression": "trendPrChannel500_2"
            },
            "prChannel": {
                "lower": "prChannelLower300_3_195",
                "upper": "prChannelUpper300_3_195"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": false,
            "ema100": true,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel450_2"
            },
            "prChannel": {
                "lower": "prChannelLower300_2_19",
                "upper": "prChannelUpper300_2_19"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi5"
            },
            "sma13": false,
            "ema50": false,
            "ema100": true,
            "ema200": true
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel500_2"
            },
            "prChannel": {
                "lower": "prChannelLower300_2_195",
                "upper": "prChannelUpper300_2_195"
            },
            "rsi": {
                "oversold": 23,
                "overbought": 77,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": false,
            "ema100": true,
            "ema200": true
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel200_2"
            },
            "prChannel": {
                "lower": "prChannelLower100_2_195",
                "upper": "prChannelUpper100_2_195"
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
                "regression": "trendPrChannel500_2"
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
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel400_2"
            },
            "prChannel": {
                "lower": "prChannelLower100_3_19",
                "upper": "prChannelUpper100_3_19"
            },
            "rsi": {
                "oversold": 23,
                "overbought": 77,
                "rsi": "rsi7"
            },
            "sma13": false,
            "ema50": true,
            "ema100": true,
            "ema200": true
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel600_2"
            },
            "prChannel": {
                "lower": "prChannelLower300_3_19",
                "upper": "prChannelUpper300_3_19"
            },
            "rsi": {
                "oversold": 23,
                "overbought": 77,
                "rsi": "rsi7"
            },
            "sma13": true,
            "ema50": true,
            "ema100": true,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel600_2"
            },
            "prChannel": {
                "lower": "prChannelLower250_3_19",
                "upper": "prChannelUpper250_3_19"
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
                "regression": "trendPrChannel550_2"
            },
            "prChannel": {
                "lower": "prChannelLower300_4_195",
                "upper": "prChannelUpper300_4_195"
            },
            "rsi": {
                "oversold": 23,
                "overbought": 77,
                "rsi": "rsi7"
            },
            "sma13": true,
            "ema50": true,
            "ema100": true,
            "ema200": false
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel400_2"
            },
            "prChannel": {
                "lower": "prChannelLower100_3_215",
                "upper": "prChannelUpper100_3_215"
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
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel650_2"
            },
            "prChannel": {
                "lower": "prChannelLower100_3_21",
                "upper": "prChannelUpper100_3_21"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi7"
            },
            "sma13": true,
            "ema50": true,
            "ema100": true,
            "ema200": true
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel700_2"
            },
            "prChannel": {
                "lower": "prChannelLower100_3_21",
                "upper": "prChannelUpper100_3_21"
            },
            "rsi": {
                "oversold": 20,
                "overbought": 80,
                "rsi": "rsi7"
            },
            "sma13": true,
            "ema50": true,
            "ema100": true,
            "ema200": true
        },
        {
            "trendPrChannel": {
                "regression": "trendPrChannel600_2"
            },
            "prChannel": {
                "lower": "prChannelLower300_4_195",
                "upper": "prChannelUpper300_4_195"
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
        {study: studies.PolynomialRegressionChannel, inputs: {length: 100, degree: 3, deviations: 1.9}, outputMap: {regression: 'prChannel100_3_19', upper: 'prChannelUpper100_3_19', lower: 'prChannelLower100_3_19'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 100, degree: 2, deviations: 1.95}, outputMap: {regression: 'prChannel100_2_195', upper: 'prChannelUpper100_2_195', lower: 'prChannelLower100_2_195'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 100, degree: 3, deviations: 2.1}, outputMap: {regression: 'prChannel100_3_21', upper: 'prChannelUpper100_3_21', lower: 'prChannelLower100_3_21'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 100, degree: 3, deviations: 2.15}, outputMap: {regression: 'prChannel100_3_215', upper: 'prChannelUpper100_3_215', lower: 'prChannelLower100_3_215'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 250, degree: 2, deviations: 1.9}, outputMap: {regression: 'prChannel250_2_19', upper: 'prChannelUpper250_2_19', lower: 'prChannelLower250_2_19'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 250, degree: 3, deviations: 1.9}, outputMap: {regression: 'prChannel250_3_19', upper: 'prChannelUpper250_3_19', lower: 'prChannelLower250_3_19'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 250, degree: 4, deviations: 1.95}, outputMap: {regression: 'prChannel250_4_195', upper: 'prChannelUpper250_4_195', lower: 'prChannelLower250_4_195'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 250, degree: 2, deviations: 2.1}, outputMap: {regression: 'prChannel250_2_21', upper: 'prChannelUpper250_2_21', lower: 'prChannelLower250_2_21'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 250, degree: 2, deviations: 2.15}, outputMap: {regression: 'prChannel250_2_215', upper: 'prChannelUpper250_2_215', lower: 'prChannelLower250_2_215'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 300, degree: 2, deviations: 1.9}, outputMap: {regression: 'prChannel300_2_19', upper: 'prChannelUpper300_2_19', lower: 'prChannelLower300_2_19'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 300, degree: 3, deviations: 1.9}, outputMap: {regression: 'prChannel300_3_19', upper: 'prChannelUpper300_3_19', lower: 'prChannelLower300_3_19'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 300, degree: 4, deviations: 1.9}, outputMap: {regression: 'prChannel300_4_19', upper: 'prChannelUpper300_4_19', lower: 'prChannelLower300_4_19'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 300, degree: 2, deviations: 1.95}, outputMap: {regression: 'prChannel300_2_195', upper: 'prChannelUpper300_2_195', lower: 'prChannelLower300_2_195'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 300, degree: 3, deviations: 1.95}, outputMap: {regression: 'prChannel300_3_195', upper: 'prChannelUpper300_3_195', lower: 'prChannelLower300_3_195'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 300, degree: 4, deviations: 1.95}, outputMap: {regression: 'prChannel300_4_195', upper: 'prChannelUpper300_4_195', lower: 'prChannelLower300_4_195'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 200, degree: 2}, outputMap: {regression: 'trendPrChannel200_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 400, degree: 2}, outputMap: {regression: 'trendPrChannel400_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 450, degree: 2}, outputMap: {regression: 'trendPrChannel450_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 500, degree: 2}, outputMap: {regression: 'trendPrChannel500_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 550, degree: 2}, outputMap: {regression: 'trendPrChannel550_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 600, degree: 2}, outputMap: {regression: 'trendPrChannel600_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 650, degree: 2}, outputMap: {regression: 'trendPrChannel650_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 700, degree: 2}, outputMap: {regression: 'trendPrChannel700_2'}},
        {study: studies.PolynomialRegressionChannel, inputs: {length: 800, degree: 2}, outputMap: {regression: 'trendPrChannel800_2'}}
    ]
};


[ 'prChannelLower100_2_195',
  'prChannelLower100_3_19',
  'prChannelLower100_3_21',
  'prChannelLower100_3_215',
  'prChannelLower250_2_19',
  'prChannelLower250_2_21',
  'prChannelLower250_2_215',
  'prChannelLower250_3_19',
  'prChannelLower250_4_195',
  'prChannelLower300_2_19',
  'prChannelLower300_2_195',
  'prChannelLower300_3_19',
  'prChannelLower300_3_195',
  'prChannelLower300_4_19',
  'prChannelLower300_4_195' ]
