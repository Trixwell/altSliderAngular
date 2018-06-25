# altSliderAngular

AltSliderAngularJS is a customizable jQuery slider plugin. Features include:

* Handle data with AJAX
* Handle data without using AJAX request
* Dynamic reload of data (using AJAX)
* Auto scroll function
* Elastic configuration: turn of scrollbar or AJAX requests
* Vertical and horizontal scrollbar
* Flexible CSS stylization

## Usage


At first don’t forget to use AngularJS CDN and mention it in your index.html file. Head of it should look this way:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Default</title>
    <link rel="stylesheet" href="../../css/altSlider.css">
    <link rel="stylesheet" href="default.css">
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.10/angular.min.js"></script>
    <script src="index.js"></script>
    <script src="../../js/altSlider.js"></script>
</head>
```

Then pay your attention to default variant of slider.

Add controller and slider itself in your index.html file:

```html
  <div class="visible" ng-controller="sliderCtrl">
      <alt-slider class="alt-slider" slides="3" ></alt-slider>
  </div>
```
Also mention it in your index.js file:
```js
  let app = angular.module("app", ['altSlider']);

  app.controller("sliderCtrl", function($scope, $http) {
});
```

For dynamic reload add **dynamic-reload="3000"** property to 'alt-slider' in your html file where it's attribute is milliseconds trough which your slider data will reload.

```html
    <div class="visible" ng-controller="sliderCtrl">
        <alt-slider class="alt-slider" slides="3" dynamic-reload="3000"></alt-slider>
    </div>
```
For auto scroll add **scroll: true** property to 'alt-slider' in your html file.
```html
    <div class="visible" ng-controller="sliderCtrl">
        <alt-slider class="alt-slider" slides="3" scroll="true"></alt-slider>
    </div>
```
