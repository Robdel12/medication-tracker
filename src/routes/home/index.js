import { h, Component } from 'preact';
import Medication from '../../utils/medication';
import { Link } from 'preact-router/match';
import style from './style';

export default class Home extends Component {
  removeMed = (index) => {
    this.props.removeMed(index);
    this.h1.focus();
  }

  componentDidMount() {
    this.h2.focus();
  }

  renderMedications() {
    let medications = this.props.medications;

    // ugh, ssr
    if (!medications) {
      return null;
    }

    return medications.map((med, index) => {
      let medModel = new Medication(med);

      return (
        <div class={style.medCard} style={medModel.hasExpired ? {border: "1px solid #c78484"} : null}>
          <div class={style.cardTitle}>
            <h4>
              {med.name}
            </h4>
          </div>
          <div class={style.cardBody}>
            <p>Dosage: {med.dosage}</p>
            <p>Time Taken: {medModel.displayTakenTime}</p>
            <p>Time Left: {medModel.timeLeft}</p>
            <p>Time Up: {medModel.timeUpDisplay}</p>
            <p>Has expired: {`${medModel.hasExpired}`}</p>
          </div>
          <div class={style.cardFooter}>
            <button onClick={this.removeMed.bind(this, index)}>
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
        <h2 tabIndex="-1" ref={c => this.h2 = c}>Medications</h2>
        <Link class={style.btn} activeClassName="active" href="/new">
          Add Medication
        </Link>
        {this.renderMedications()}
      </div>
    );
  }
}
