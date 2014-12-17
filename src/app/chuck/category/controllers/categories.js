import Category from '../../models/Category';

class CategoriesController {

  constructor() {
    this.loadCategories();
  }

  loadCategories() {
    Category.all().then(categories => {
      this.categories = categories;
    })
  }
}


export default CategoriesController;
