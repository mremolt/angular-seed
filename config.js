System.config({
  "paths": {
    "*": "*.js",
    "as/*": "src/app/*.js",
    "angular-seed/*": "src/app/*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.3.11",
    "angular-mocks": "github:angular/bower-angular-mocks@1.3.9",
    "angular-sanitize": "github:angular/bower-angular-sanitize@1.3.11",
    "angular-translate": "github:angular-translate/bower-angular-translate@2.5.2",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.13",
    "bower-angular-sanitize": "github:angular/bower-angular-sanitize@1.3.11",
    "bower-angular-translate": "github:angular-translate/bower-angular-translate@2.5.2",
    "lodash": "npm:lodash@2.4.1",
    "github:angular-ui/ui-router@0.2.13": {
      "angular": "github:angular/bower-angular@1.3.11"
    },
    "github:angular/bower-angular-mocks@1.3.9": {
      "angular": "github:angular/bower-angular@1.3.11"
    },
    "github:angular/bower-angular-sanitize@1.3.11": {
      "angular": "github:angular/bower-angular@1.3.11"
    },
    "github:jspm/nodelibs-process@0.1.0": {
      "process": "npm:process@0.10.0"
    },
    "npm:lodash@2.4.1": {
      "process": "github:jspm/nodelibs-process@0.1.0"
    }
  }
});

