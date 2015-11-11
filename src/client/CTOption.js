var Base = require('./Base');

function CTOption() {
    this.constructor = CTOption;

    var self = this;
    var steps = [
        function() {
            var page = self.getPage();

            console.log('Opening page...');

            page.open('http://localhost:8000/page1.html', function(error, status) {
                console.log('Logging in...');

                page.injectJs('./src/client/utilities.js');
                page.includeJs('https://code.jquery.com/jquery-2.1.4.min.js', function() {
                    page.evaluate(function() {
                        $('#username').val('user@test.com');
                        $('#password').val('P@ssw0rd');
                        $('#loginForm').submit();
                    });
                });

                self.runNextStep();
            });
        },
        function() {
            var page = self.getPage();

            console.log('Clicking link...');

            page.injectJs('./src/client/utilities.js');
            page.includeJs('https://code.jquery.com/jquery-2.1.4.min.js', function() {
                page.evaluate(function() {
                    document.getElementById('someLink').click();
                });
            });

            self.runNextStep();
        },
        function() {
            var page = self.getPage();

            console.log('Getting page content...');

            page.evaluate(function() {
                console.log(document.body.innerHTML);
            });

            self.runNextStep();
        }
    ];

    Base.call(this, steps);
}

// Create a copy of the Base "class" prototype for use in this "class."
CTOption.prototype = Object.create(Base.prototype);

module.exports = CTOption;
