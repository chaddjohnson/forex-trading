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

Base.prototype.gotoNextStep = function(delay) {
    var self = this;

    // Set default delay.
    delay = delay || 250;

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

            page.injectJs('./src/client/utilities.js');
            page.includeJs('https://code.jquery.com/jquery-2.1.4.min.js', function() {
                self.gotoNextStep();
            });
        });
    });
};

module.exports = Base;
