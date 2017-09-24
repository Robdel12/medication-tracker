import moment from 'moment';

class Medication {
  constructor(medication) {
    this.medication = medication;
  }

  get name() {
    return this.medication.name;
  }

  get timeTaken() {
    return moment(this.medication.timeTaken);
  }

  get displayTakenTime() {
    return this.timeTaken.format("h:mma (MM/DD)");
  }

  get timeUp() {
    return moment(this.medication.timeTaken).add(this.medication.dosageDuration, 'hours');
  }

  get timeLeft() {
    return moment().to(this.timeUp);
  }

  get hasExpired() {
    return this.timeLeft.includes('ago');
  }
}

export default Medication;
