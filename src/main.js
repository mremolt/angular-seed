require.config({
  baseUrl: 'src/app',
  paths: {
  }
});


require(['app', 'dashboard/_dashboard'], function (app, dashboard) {
  console.log('hier', app, dashboard);

  angular.element(document).ready(function () {
    angular.bootstrap(document, ['dcsApp']);
  });
});