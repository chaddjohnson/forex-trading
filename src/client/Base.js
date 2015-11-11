var phantom = require('node-phantom-simple');

function Base(steps) {
    this.stepIndex = -1;
    this.steps = steps;
    this.page = null;
    this.browser = null;
}

Base.prototype.getPage = function() {
    return this.page;
};

Base.prototype.getBrowser = function() {
    return this.browser;
};

Base.prototype.runNextStep = function(delay) {
    var self = this;

    // Set default delay.
    delay = delay || 500;

    // Increment steps.
    self.stepIndex++;

    // Wait to execute the next step.
    setTimeout(function() {
        if (typeof self.steps[self.stepIndex] === 'function') {
            // Execute the next step.
            self.steps[self.stepIndex]();
        }
        else {
            console.log('Complete');

            // Done.
            self.browser.exit();
        }
    }, delay);
};

Base.prototype.run = function() {
    var self = this;

    var phantomOptions = {
        parameters: {'ignore-ssl-errors': 'yes'}
    };

    phantom.create(phantomOptions, function(error, browser) {
        self.browser = browser;

        self.browser.createPage(function(error, page) {
            self.page = page;

            page.onConsoleMessage = function(message) {
                console.log(message);
            };

            // Run the first step.
            self.runNextStep();
        });
    });
};

module.exports = Base;
