import { h, Component } from 'preact';
import moment from 'moment';
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
      let timeTaken = moment(med.timeTaken);
      let timeUp =  moment(med.timeTaken).add(med.dosageDuration, 'hours');
      let timeLeft = moment().to(timeUp);
      let hasExpired = timeLeft.includes('ago');

      return (
        <div class={style.medCard} style={hasExpired ? {border: "1px solid #c78484"} : null}>
          <div class={style.cardTitle}>
            <h4>
              {med.name}
            </h4>
          </div>
          <div class={style.cardBody}>
            <p>Dosage: {med.dosage}</p>
            <p>Time Taken: {timeTaken.format("dddd, MM/DD, h a")}</p>
            <p>Time Left: {timeLeft}</p>
            <p>Has expired: {`${hasExpired}`}</p>
          </div>
          <div class={style.cardFooter}>
            <button  onClick={this.removeMed.bind(this, index)}>
              Remove {med.name}
            </button>
          </div>
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
