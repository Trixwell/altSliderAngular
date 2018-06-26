# ![](https://github.com/Trixwell/altSliderAngular/blob/master/gif/slider.gif) 

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
# ![](https://github.com/Trixwell/altSliderAngular/blob/master/gif/third.gif) 

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
# ![](https://github.com/Trixwell/altSliderAngular/blob/master/gif/first.gif) 

For turning of scrollbar add **no-scroll="true** property to 'alt-slider' in your html file where it's boolean attribute (true) means that you don't want to use scrollbar. 
```html
    <div class="visible" ng-controller="sliderCtrl">
        <alt-slider class="alt-slider" slides="3"  no-scroll="true"></alt-slider>
    </div>
```

For handling data without using AJAX requests, add to 'alt-slider' in your html file **raw-data="rawData** property. 
```html
    <div class="visible" ng-controller="sliderCtrl">
        <alt-slider class="alt-slider" slides="3" raw-data="rawData"></alt-slider>
    </div>
```
Then you may use it in JSON format in your js file. For example: 
```js
let app = angular.module("app", ['altSlider']);

app.controller("sliderCtrl", function($scope, $http) {
    $scope.rawData = [
        {
            "title": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A animi at corporis dignissimos error, facilis ipsum iste iusto, labore minima, nihil obcaecati placeat possimus quasi qui rem saepe soluta voluptates.",
            "body": "Test body 1",
            "create_time": "2018-01-01 00:00:01",
            "img_src": "http://s5.uploads.ru/t/0hYTP.jpg",
            "src": "https://google.com"
        },
        {
            "title": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A animi at corporis dignissimos error, facilis ipsum iste iusto, labore minima, nihil obcaecati placeat possimus quasi qui rem saepe soluta voluptates.",
            "body": "Test body 2",
            "create_time": "2018-02-02 00:23:01",
            "img_src": "http://sa.uploads.ru/t/xqseC.jpg",
            "src": "https://google.com"
        }
       ]
     });
     
```
For turning on **customizable vertical scrollbar mode**  delete from div with ng-controller class "visible" and add ng-style="visibleVertical". Add to alt-slider in your html file JS file **is-vertical="true"**. Add your CSS file for stylization. **_All features for horizontal scroll also work for vertical._**

```html
    <div ng-controller="sliderCtrl" ng-style="visibleVertical">
        <alt-slider class="alt-slider" slides="2" is-vertical="true"></alt-slider>
    </div>
```
