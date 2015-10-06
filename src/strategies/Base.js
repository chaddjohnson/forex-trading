var _ = require('underscore');

function Base() {
    this.studies = [];
    this.studyData = [];
}

Base.prototype.prepareStudies = function(studyDefinitions) {
    var self = this;

    // Iterate over each study definition...
    studyDefinitions.forEach(function(studyDefinition) {
        // Instantiate the study, and add it to the list of studies for this strategy.
       self.studies.push(new studyDefinition.study(studyDefinition.inputs, studyDefinition.outputMap));
    });
};

Base.prototype.runStudies = function(dataPoint) {
    var self = this;
    var dataPointWithStudies = _.extend({}, dataPoint);

    self.studyData.push(dataPointWithStudies);

    // Iterate over each study...
    self.studies.forEach(function(study) {
        var studyProperty = '';
        var studyTickValue = 0.0;
        var studyOutputs = study.getOutputMappings();

        // Update the data for the study.
        study.setData(self.studyData);

        var studyTickValues = study.tick();

        // Augment the last data point with the data the study generates.
        for (studyProperty in studyOutputs) {
            if (studyTickValues && typeof studyTickValues[studyOutputs[studyProperty]] === 'number') {
                // Include output in main output, and limit decimal precision without rounding.
                dataPointWithStudies[studyOutputs[studyProperty]] = studyTickValues[studyOutputs[studyProperty]];
            }
            else {
                dataPointWithStudies[studyOutputs[studyProperty]] = '';
            }
        }
    });

    return dataPointWithStudies;
};

module.exports = Base;
