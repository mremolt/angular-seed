import mod from '../_dashboard';
import Joke from '../../chuck/models/Joke';

class HomeController {

  constructor($interval) {
    this.showRandomJoke();

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
