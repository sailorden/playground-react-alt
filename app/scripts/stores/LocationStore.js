var alt = require('../alt');
var resp = require('../response.js');
var LocationActions = require('../actions/LocationActions');

class LocationStore {
  constructor() {
     this.locations = resp;

     this.bindListeners({
       handleUpdateLocations: LocationActions.UPDATE_LOCATIONS
     });
  }

  handleUpdateLocations(locations) {
    this.locations = locations;
  }
}

module.exports = alt.createStore(LocationStore, 'LocationStore');
