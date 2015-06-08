var alt = require('../alt');
var resp = require('../response.js');
var LocationActions = require('../actions/LocationActions');

// since we are using class/constructur method, all values assign to 'this' inside the store is accessible via LocationStore.getState()
class LocationStore {
  constructor() {
     this.locations = resp;
     this.lastRemoved = undefined;

/*
     this.bindListeners({
       handleUpdateLocations: LocationActions.UPDATE_LOCATIONS
     })
*/
     this.bindAction(LocationActions.remove, this.onRemoveLocation);
     this.bindAction(LocationActions.sort, this.onSort);
  }

  onSort(info) {
    console.log(info)
    let sortParam = info.sortParam;
    let isAsc = info.isAsc ? 1: -1;
    console.log(isAsc)
    
    this.locations = this.locations.sort(function(a,b) {
        return isAsc * a.data[sortParam].localeCompare(b.data[sortParam])
    });
  }
  
  onRemoveLocation(id) {
    if (!id) return
    
    this.locations = this.locations.filter(function(el) {
      return el.id !== id
    });
    this.lastRemoved = id;

  }

  /*
  handleUpdateLocations(locations) {
    this.locations = locations;
  }
  */
}

module.exports = alt.createStore(LocationStore, 'LocationStore');
