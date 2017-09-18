import { h, Component } from 'preact';
import style from './style';
import { route } from 'preact-router';

// follow up: add timer to show how much time is left
export default class AddMedication extends Component {
  componentDidMount() {
    this.h1.focus();
  }

  handleSubmit(event) {
    event.preventDefault();
    let currentMedication = JSON.parse(window.localStorage.getItem('medications'));
    let newMed = {
      name: event.target.name.value,
      dosage: event.target.dosage.value,
      timeTaken: event.target.time_taken.value
    };

    let newMedicationData = Object.assign({}, currentMedication);
    newMedicationData.medications.push(newMed);
    window.localStorage.setItem('medications', JSON.stringify(newMedicationData));

    event.target.name.value = "";
    event.target.dosage.value = "";
    event.target.time_taken.value = "";

    route('/', true);
  }

  render() {
    return (
      <div class={style.home}>
        <h1 tabIndex="-1" ref={c => this.h1 = c}>Add a new medication</h1>
        <form onSubmit={this.handleSubmit} class={style.form}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" required placeholder="Advil" />

          <label htmlFor="dosage">Dosage</label>
          <input type="text" id="dosage" required placeholder="200mg" />

          <label htmlFor="time_taken">Time taken</label>
          <input type="text" id="time_taken" required placeholder="6:30am" />

          <button class={style.btn}>Submit</button>
        </form>
      </div>
    );
  }
}
