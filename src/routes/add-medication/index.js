import { h, Component } from 'preact';
import moment from 'moment';
import style from './style';
import { route } from 'preact-router';
import { setStore } from '../../utils/localstorage';

// follow up: add timer to show how much time is left
export default class AddMedication extends Component {
  componentDidMount() {
    this.h2.focus();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let currentMedication = this.props.medications;
    let date = new Date();
    let timeTaken = event.target.time_taken.value.split(':');
    date.setHours(timeTaken[0], timeTaken[1]);

    let newMed = {
      name: event.target.name.value,
      dosage: event.target.dosage.value,
      timeTaken: date,
      dosageDuration: event.target.doseage_duration.value
    };

    currentMedication.push(newMed);
    setStore(currentMedication);

    event.target.name.value = "";
    event.target.dosage.value = "";
    event.target.time_taken.value = "";
    event.target.doseage_duration.value = "";

    route('/', true);
  }

  render() {
    return (
      <div class={style.home}>
        <h2 tabIndex="-1" ref={c => this.h2 = c}>Add a new medication</h2>
        <form onSubmit={this.handleSubmit} class={style.form}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" required name="med-name"
                 placeholder="Advil" autocomplete="medication-name"/>

          <label htmlFor="dosage">Dosage</label>
          <input type="text" id="dosage" required name="dosage"
                 placeholder="200mg" autocomplete="medication-dosage" />

          <label htmlFor="time_taken">Time taken (24 hour format)</label>
          <input type="text" id="time_taken" required name="time-taken"
                 placeholder={`${moment().format('H:mm')}`}
                 autocomplete="medication-time-taken" />

          <label htmlFor="doseage_duration">Dosage duration (in hours)</label>
          <input type="text" id="doseage_duration" required name="doseage-duration"
                 placeholder="6" autocomplete="medication-dosage-duration" />

          <button class={style.btn}>Submit</button>
        </form>
      </div>
    );
  }
}
