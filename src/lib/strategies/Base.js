function Base(symbol, settings) {
    this.symbol = symbol;
    this.settings = settings;
    this.studies = [];
    this.cumulativeData = [];
    this.cumulativeDataCount = 0;

    // Prepare studies for use.
    this.prepareStudies();
}

Base.prototype.prepareStudies = function() {
    var self = this;

    // Iterate over each study definition...
    self.settings.studies.forEach(function(studyDefinition) {
        // Instantiate the study, and add it to the list of studies for this strategy.
        self.studies.push(new studyDefinition.study(studyDefinition.inputs, studyDefinition.outputMap));
    });
};

Base.prototype.getSettings = function() {
    return this.settings;
};

Base.prototype.tick = function(dataPoint) {
    var self = this;
    var i = 0;

    // If there is a gap in the data, reset the cumulative data.
    if (self.tickPreviousDataPoint && (dataPoint.timestamp - self.tickPreviousDataPoint.timestamp) > 65 * 1000) {
        self.cumulativeData = [];
        self.cumulativeDataCount = 0;

        console.log('[' + new Date() + '] Strategy data reset');
    }

    // Add the data point to the cumulative data.
    self.cumulativeData.push(dataPoint);
    self.cumulativeDataCount++;

    // Iterate over each study...
    self.studies.forEach(function(study) {
        var studyProperty = '';
        var studyTickValue = 0.0;
        var studyOutputs = study.getOutputMappings();

        // Update the data for the study.
        study.setData(self.cumulativeData);

        var studyTickValues = study.tick();

        // Augment the last data point with the data the study generates.
        for (studyProperty in studyOutputs) {
            if (studyTickValues && typeof studyTickValues[studyOutputs[studyProperty]] === 'number') {
                // Include output in main output, and limit decimal precision without rounding.
                dataPoint[studyOutputs[studyProperty]] = studyTickValues[studyOutputs[studyProperty]];
            }
            else {
                dataPoint[studyOutputs[studyProperty]] = '';
            }
        }
    });

    self.tickPreviousDataPoint = dataPoint;

    // Remove unused data every so often.
    if (self.cumulativeDataCount >= 1500) {
        // Manually free memory for old data points in the array.
        for (i = 0; i < 500; i++) {
            self.cumulativeData[i] = null;
        }

        // Remove the excess data points from the array.
        self.cumulativeData.splice(0, 500);
        self.cumulativeDataCount = 1000;
    }
};

module.exports = Base;
