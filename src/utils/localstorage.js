function initEmptyStore() {
  window.localStorage.setItem('medications', JSON.stringify({
    medications: []
  }));
}

export function getStore() {
  let medications = window.localStorage.getItem('medications');
  if (!medications) { initEmptyStore(); }
  let parsedMeds = JSON.parse(medications).medications;

  return sortMeds(parsedMeds);
}

function sortMeds(array) {
  // sort by newest to oldest
  array.sort(function(a, b) {
    return new Date(b.timeTaken) - new Date(a.timeTaken);
  });

  return array;
}

export function setStore(meds) {
  let rootKeyObj = { medications: sortMeds(meds) };

  window.localStorage.setItem('medications', JSON.stringify(rootKeyObj));
}
