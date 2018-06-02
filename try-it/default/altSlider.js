let direct = angular.module("altSlider", []);

direct.directive('altSlider', function ($http) {
    return {
        templateUrl: 'slider.html',
        link: function (scope, element, attrs) {
            scope.current_position = 0;
            scope.display_elements_count = 3;
            scope.loadData = function () {
                $http.get('test.json').then(function (response) {
                    scope.slides = response.data;
                    scope.element_width = element[0].clientWidth;
                    scope.new_position = scope.element_width / (scope.slides.length - scope.display_elements_count + 1);
                    scope.myObj = {
                        'width': scope.new_position + 'px'
                    }

                    scope.updateScreen();
                });
            }

            scope.loadData();

            scope.updateScreen = function () {
                scope.displaySlides = scope.slides.slice(scope.current_position, scope.current_position + scope.display_elements_count);
            }

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
                scope.moveScroll(is_move);
            };

            scope.moveLeft = function (is_move) {
                if (scope.current_position <= 0) {
                    scope.current_position = 1;
                }

                scope.myObj.right = scope.left_size_bar + 'px';
                scope.current_position--;
                scope.moveScroll(is_move);
            };
        }
    }
});

