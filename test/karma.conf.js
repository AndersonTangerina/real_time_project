module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'static/bower_components/angular/angular.js',
      'static/bower_components/angular-facebook/lin/angular-facebook.js',
      'static/bower_components/ngmap/build/scripts/ng-map.js',
      'static/bower_components/angular-mocks/angular-mocks.js',
      'static/js/**/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};