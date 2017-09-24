import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

export default class Header extends Component {
  refresh = () => {
    this.props.refreshStore();
  }

  render() {
    return (
      <header class={style.header}>
        <h1>Medication Tracker</h1>
        <button onClick={this.refresh} style={style.refresh}>
          Refresh
        </button>
      </header>
    );
  }
}
