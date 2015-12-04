var _ = require('lodash');

var configurations = [];

var trendPrChannels = [];
var prChannels = [];

configurations.forEach(function(configuration) {
    if (configuration.trendPrChannel && configuration.trendPrChannel.regression) {
        trendPrChannels.push(configuration.trendPrChannel.regression);
    }

    if (configuration.prChannel && configuration.prChannel.upper) {
        prChannels.push(configuration.prChannel.upper);
    }
});

trendPrChannels = _.uniq(trendPrChannels);
trendPrChannels.sort();

prChannels = _.uniq(prChannels);
prChannels.sort();

console.log(trendPrChannels);
console.log();
console.log(prChannels);
