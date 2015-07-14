var alt = require('../alt');
var LocationActions = require('../actions/LocationActions');
var Store = require('../../3p/store');

var localStorage = Store.get('notes');

// in case its empty, bootstrap
localStorage = localStorage || [
  {id: 1, note: 'I am a sample note.'},
  {id: 2, note: 'Delete me with the X button on lower right of note'},
  {id: 3, note: 'Add another note with the + button on lower right of screen'},
  {id: 4, note: 'For fun, try searching through your notes :)'}
];

function updateStorage(data) {
    Store.set('notes', data);
}

// since we are using class/constructur method, all values assign to 'this' inside the store is accessible via LocationStore.getState()
class LocationStore {
  constructor() {
     this.locations = localStorage; // this needs to connect with local storage
     this.lastRemoved = undefined;

     this.bindAction(LocationActions.add, this.onAddNote);
     this.bindAction(LocationActions.remove, this.onRemoveLocation);
     this.bindAction(LocationActions.edit, this.onEditNote);
  }
  
  onRemoveLocation(id) {
    if (!id) return
    console.log(id)
    
    this.locations = this.locations.filter(function(el) {
      return el.id !== id
    });
    this.lastRemoved = id;
    console.log(this.locations)
    updateStorage(this.locations);
  }

  onAddNote(data) {
    console.log('note added');
    console.log(data);

    var tempArray = Array.prototype.slice.call(this.locations, 0)
    tempArray.unshift(data);
    this.locations = tempArray;
    updateStorage(this.locations);
  }

  onEditNote(data) {
    console.log(data)
    this.locations = this.locations.map(function(el) {
      if (el.id !== data[0]) {return el}
      return {id: data[0], note: data[1]}
    });
    updateStorage(this.locations);
  }
}

module.exports = alt.createStore(LocationStore, 'LocationStore');
