import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from '../routes/home';
import AddMedication from '../routes/add-medication';
// import Home from 'async!./home';

export default class App extends Component {
  /** Gets fired when the route changes.
   *      @param {Object} event           "change" event from [preact-router](http://git.io/preact-router)
   *      @param {string} event.url       The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  initLocalStorage() {
    let medications = window.localStorage.getItem('medications');

    if (!medications) {
      window.localStorage.setItem('medications', JSON.stringify({
        medications: []
      }));
    } else {
      return;
    }
  }

  componentDidMount() {
    this.initLocalStorage();
  }

  render() {
    return (
      <div id="app">
        <Header />
        <div style={{padding: "10px"}}>
          <Router onChange={this.handleRoute}>
            <Home path="/" />
            <AddMedication path="/new" />
          </Router>
        </div>
      </div>
    );
  }
}
