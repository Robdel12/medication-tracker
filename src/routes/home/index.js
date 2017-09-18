import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

export default class Home extends Component {
  constructor(props) {
    super(props);
    let medications = JSON.parse(window.localStorage.getItem('medications')).medications;

    this.setState({medications});
  }

  removeMed(index) {
    let medications = { medications: this.state.medications };

    medications.medications.splice(index, 1);
    window.localStorage.setItem('medications', JSON.stringify(medications));
    this.setState({medications: medications.medications});
    this.h1.focus();
  }

  componentDidMount() {
    this.h1.focus();
  }

  renderMedications() {
    let medications = this.state.medications;

    return medications.map((med, index) => {
      return (
        <div>
          <h4>
            {med.name}
            <button aria-label="Remove Medication" onClick={this.removeMed.bind(this, index)}>
              X
            </button>
          </h4>
          <p>Dosage: {med.dosage}</p>
          <p>Time Taken: {med.timeTaken}</p>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h1 tabIndex="-1" ref={c => this.h1 = c}>Medications</h1>
        <Link class={style.btn} activeClassName="active" href="/new">
          Add Medication
        </Link>
        {this.renderMedications()}
      </div>
    );
  }
}
