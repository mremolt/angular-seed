import mod from '../_dashboard';
import Joke from 'as/chuck/models/Joke';


class HomeController {

  constructor() {
    this.numberOfJokes = 0;
    this.showRandomJoke();

    Joke.count().then(number => {
      this.numberOfJokes = number;
    });
  }

  showRandomJoke() {
    Joke.random().then(joke => {
      this.joke = joke;
    });
  }

}


export default HomeController;
