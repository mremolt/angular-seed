
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
    return this.data.categories;
  }

}


export default Joke;
