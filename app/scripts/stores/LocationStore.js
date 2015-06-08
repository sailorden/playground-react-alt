var alt = require('../alt');
var resp = require('../response.js');
var LocationActions = require('../actions/LocationActions');

// since we are using class/constructur method, all values assign to 'this' inside the store is accessible via LocationStore.getState()
class LocationStore {
  constructor() {
     this.locations = resp; // pretend this was received from Ajax call and we need to store a clean copy of it
     this.locationsAltered = resp;
     this.lastRemoved = undefined;

     this.bindAction(LocationActions.remove, this.onRemoveLocation);
     this.bindAction(LocationActions.sort, this.onSort);
     this.bindAction(LocationActions.updateAltered, this.onUpdateAltered);
  }

  onUpdateAltered(list) {
    console.log(list)
     this.locationsAltered = list; 
  }

  onSort(info) {
    console.log(info)
    let sortParam = info.sortParam;
    let isAsc = info.isAsc ? 1: -1;
    console.log(isAsc)
    
    this.locationsAltered = this.locationsAltered.sort(function(a,b) {
        return isAsc * a.data[sortParam].localeCompare(b.data[sortParam])
    });
  }
  
  onRemoveLocation(id) {
    if (!id) return
    
    this.locations = this.locations.filter(function(el) {
      return el.id !== id
    });
    this.locationsAltered = this.locationsAltered.filter(function(el) {
      return el.id !== id
    }); // repeat the same filtration for locations altered so that we dont lose altered state upon delete
    this.lastRemoved = id;

  }

}

module.exports = alt.createStore(LocationStore, 'LocationStore');
