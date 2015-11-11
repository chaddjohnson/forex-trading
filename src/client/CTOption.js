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

                page.evaluate(function() {
                    $('#username').val('user@test.com');
                    $('#password').val('P@ssw0rd');
                    $('#loginForm').submit();
                });

                self.gotoNextStep();
            });
        },
        function() {
            var page = self.getPage();

            console.log('Clicking link...');

            page.evaluate(function() {
                document.getElementById('someLink').click();
            });

            self.gotoNextStep();
        },
        function() {
            var page = self.getPage();

            console.log('Getting page content...');

            page.evaluate(function() {
                console.log(document.body.innerHTML);
            });

            self.gotoNextStep();
        }
    ];

    Base.call(this, steps);
}

// Create a copy of the Base "class" prototype for use in this "class."
CTOption.prototype = Object.create(Base.prototype);

module.exports = CTOption;
