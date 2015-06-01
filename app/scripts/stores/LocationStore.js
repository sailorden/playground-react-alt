var alt = require('../alt');
var resp = require('../response.js');
var LocationActions = require('../actions/LocationActions');

// since we are using class/constructur method, all values assign to 'this' inside the store is accessible via LocationStore.getState()
class LocationStore {
  constructor() {
     this.locations = resp;

/*
     this.bindListeners({
       handleUpdateLocations: LocationActions.UPDATE_LOCATIONS
     })
*/
     this.bindAction(LocationActions.remove, this.onRemoveLocation);
  }
  
  onRemoveLocation(id) {
    if (!id) return
    
    this.locations = this.locations.filter(function(el) {
      return el.id !== id
    });

  }

  handleUpdateLocations(locations) {
    this.locations = locations;
  }
}

module.exports = alt.createStore(LocationStore, 'LocationStore');
