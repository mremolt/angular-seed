import Joke from 'chuck/models/Joke';

class JokesListController {
  constructor() {
    Joke.findByCategory(this.category).then(jokes => {
      this.jokes = jokes;
    });

  }
}

export default JokesListController;
