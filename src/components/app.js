import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { getStore, setStore } from '../utils/localstorage';
import Header from './header';
import Home from '../routes/home';
import AddMedication from '../routes/add-medication';
// import Home from 'async!./home';

export default class App extends Component {
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  initLocalStorage() {
    let medications = getStore();

    this.setState({medications});
  }

  // wrap with promise
  removeMed = (index) => {
    let medications = this.state.medications;
    medications.splice(index, 1);

    setStore(medications);

    this.setState({medications});
  }

  refreshStore = () => {
    let medications = getStore();

    this.setState({medications});
  }

  componentDidMount() {
    this.initLocalStorage();
  }

  render(props, state) {
    return (
      <div id="app">
        <Header refreshStore={this.refreshStore} />

        <div style={{padding: "10px"}}>
          <Router onChange={this.handleRoute}>
            <Home path="/" medications={state.medications}
                  removeMed={this.removeMed} />

            <AddMedication path="/new" medications={state.medications} />
          </Router>
        </div>
      </div>
    );
  }
}
