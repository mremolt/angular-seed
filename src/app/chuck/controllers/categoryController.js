//import 'chuck/joke/directives/jokesList';

class CategoryController {
  constructor($stateParams) {
    this.categoryName = $stateParams.categoryName;
  };
}

export default CategoryController;
