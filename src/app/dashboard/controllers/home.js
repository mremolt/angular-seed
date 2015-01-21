import mod from '../_dashboard';
import Joke from 'as/chuck/models/Joke';


class HomeController {

  constructor($interval) {
    this.numberOfJokes = 0;
    this.showRandomJoke();

    Joke.count().then(number => {
      this.numberOfJokes = number;
    });

    $interval(() => {
      this.showRandomJoke();
    }, 60000);
  }

  showRandomJoke() {
    Joke.random().then(joke => {
      this.joke = joke;
    });
  }

}


export default HomeController;
