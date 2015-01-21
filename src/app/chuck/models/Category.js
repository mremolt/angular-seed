import restBackend from 'as/backend/services/restBackend';
import _ from 'lodash';

class Category {

  constructor(name) {
    this.name = name;
  }


  static get url() {
    return 'http://api.icndb.com/categories';
  }

  static all() {
    return restBackend.get(`${this.url}`).then(response => {
      return _.collect(response.data.value, cat => {
        return new this(cat);
      });
    });
  }

}

export default Category;
