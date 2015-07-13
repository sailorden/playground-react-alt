var alt = require('../alt');
var LocationActions = require('../actions/LocationActions');

resp = [
  {id: 1, note: 'Happy to be here'},
  {id: 2, note: 'Sad to be here'}
]


// since we are using class/constructur method, all values assign to 'this' inside the store is accessible via LocationStore.getState()
class LocationStore {
  constructor() {
     this.locations = resp; // this needs to connect with local storage
     this.lastRemoved = undefined;

     this.bindAction(LocationActions.add, this.onAddNote);
     this.bindAction(LocationActions.remove, this.onRemoveLocation);
  }
  
  onRemoveLocation(id) {
    if (!id) return
    
    this.locations = this.locations.filter(function(el) {
      return el.id !== id
    });
    this.lastRemoved = id;

  }

  onAddNote(data) {
    console.log('note added');
    console.log(data);

    var tempArray = Array.prototype.slice.call(this.locations, 0)
    tempArray.unshift(data);
    this.locations = tempArray;
  }
}

module.exports = alt.createStore(LocationStore, 'LocationStore');
