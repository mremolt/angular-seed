import restBackend from 'backend/services/restBackend';
import Category from './Category';
import _ from 'lodash';


class Joke {
  constructor(data) {
    this.data = data;
  }

  get id() {
    return this.data.id;
  }

  get text() {
    return this.data.joke;
  }

  get categories() {
    return _.collect(this.data.categories, cat => {
      return new Category(cat);
    });
  }

  get categoryNames() {
    return _.collect(this.categories, cat => {
      return cat.name;
    });
  }


  static get url() {
    return 'http://api.icndb.com/jokes';
  }

  static count() {
    return restBackend.get(`${this.url}/count`).then(response => {
      return response.data.value;
    });
  }

  static random() {
    return restBackend.get(`${this.url}/random`).then(response => {
      return new this(response.data.value);
    });
  }

  static find(id) {
    return restBackend.get(`${this.url}/${id}`).then(response => {
      return new this(response.data.value);
    });
  }

  static findByCategory(category) {
    return restBackend.get(`${this.url}/jokes/random?limitTo=[${category.name}]`).then(response => {
      return _.collect(response.data.value, data => {
        return new this(data);
      });
    });
  }

}


export default Joke;
