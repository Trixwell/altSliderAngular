let direct = angular.module("altSlider", []);

direct.directive('altSlider', function ($http, $interval, $timeout) {
    return {
        scope: {
            rawData: '=rawData'
        },
        templateUrl: 'slider.html',
        link: function (scope, element, attrs) {
            scope.current_position = 0;
            scope.display_elements_count = attrs['slides'];
            scope.autoscroll = attrs['scroll'];
            scope.noscroll = attrs['noScroll'];
            scope.dynamicReload = attrs['dynamicReload'];
            scope.loadData = function (callback) {
                function act(slides) {
                    scope.slides = slides;
                    scope.element_width = element[0].clientWidth;
                    scope.new_position = scope.element_width / (scope.slides.length - scope.display_elements_count + 1);
                    scope.myObj = {
                        'width': scope.new_position + 'px'
                    };

                    scope.updateScreen();

                    if (callback) {
                        callback(slides);
                    }
                }

                if (scope.rawData) {
                    act(scope.rawData);
                } else {
                    $http.get('test.json').then(function (response) {
                        act(response.data);
                    });
                }
            };

            scope.updateScreen = function () {
                scope.displaySlides = scope.slides.slice(scope.current_position, scope.current_position + scope.display_elements_count);
            };

            angular.element(element).bind('mousewheel', function ($e) {

                if ($e.deltaY < 0) {
                    scope.moveLeft();
                } else {
                    scope.moveRight();
                }
                scope.updateScreen();
                scope.$apply();

            });

            scope.moveScroll = function () {
                scope.left_size_bar = scope.current_position * scope.new_position;
                scope.myObj.left = scope.left_size_bar + 'px';
            };

            scope.moveRight = function (is_move) {
                if (scope.current_position >= (scope.slides.length - scope.display_elements_count)) {
                    scope.current_position = scope.slides.length - scope.display_elements_count - 1;
                }

                scope.current_position++;
                scope.updateScreen();
                scope.moveScroll(is_move);
            };

            scope.moveLeft = function (is_move) {
                if (scope.current_position <= 0) {
                    scope.current_position = 1;
                }

                scope.current_position--;
                scope.moveScroll(is_move);
            };

            if (scope.autoscroll === 'true') {
                $interval(function () {
                    scope.moveRight();
                }, 1000);
            }

            if (scope.noscroll === 'true') {
                scope.noScroll = {
                    'display': 'none'
                }
            }

            if (scope.dynamicReload) {
                $timeout(function reload() {
                    scope.loadData(function () {
                        scope.updateScreen();
                        $timeout(reload, scope.dynamicReload);
                    })
                }, scope.dynamicReload);
            }

            scope.loadData();

        }
    }
});

