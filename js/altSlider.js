let direct = angular.module("altSlider", []);

direct.directive('altSlider', function ($http, $interval, $timeout) {
    return {
        scope: {
            rawData: '=rawData',
            isVertical: '=isVertical',
            dynamicReload: '=dynamicReload',
            noscroll: '=noScroll',
            autoscroll: '=scroll',
            display_elements_count: '=slides'
        },
        templateUrl: 'slider.html',
        link: function (scope, element, attrs) {
            scope.current_position = 0;

            scope.loadData = function (callback) {
                function act(slides) {
                    scope.slides = slides;
                    if (scope.isVertical) {

                        scope.element_height = element[0].clientHeight;
                        scope.new_position = scope.element_height / (scope.slides.length - scope.display_elements_count + 1);
                        scope.myObj = {
                            'height': scope.new_position + 'px'
                        };

                        scope.verticalBody = {
                            'overflowY': 'hidden'
                        };

                        scope.visibleVertical = {
                            'margin-top': 'inherit'
                        };

                        scope.verticalSlider = {
                            'display': 'flex',
                            'flex-direction': 'row'
                        };

                        scope.verticalBlock = {
                            'display': 'flex',
                            'flex-direction': 'column',
                            'justify-content': 'space-between',
                            'width': '200px',
                            'overflow-y': 'hidden'
                        };

                        scope.sliderWrapper = {
                            'width': '5px',
                            'height': scope.element_height + 'px',
                            'transition': 'inherit'

                        };

                    } else {
                        scope.element_width = element[0].clientWidth;
                        scope.new_position = scope.element_width / (scope.slides.length - scope.display_elements_count + 1);

                        scope.myObj = {
                            'width': scope.new_position + 'px'
                        };

                        scope.sliderWrapper = {
                            'width': scope.element_width + 'px'
                        };

                        if (scope.noscroll) {
                            scope.sliderWrapper = {
                                'display': 'none'
                            }
                        }
                    }


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


            if (scope.isVertical) {
                scope.moveScroll = function () {
                    scope.left_size_bar = scope.current_position * scope.new_position;
                    scope.myObj.top = scope.left_size_bar + 'px';
                };
            } else {

                scope.moveScroll = function () {
                    scope.left_size_bar = scope.current_position * scope.new_position;
                    scope.myObj.left = scope.left_size_bar + 'px';
                };
            }
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

            if (scope.autoscroll) {
                $interval(function () {
                    scope.moveRight();
                }, 1000);
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

