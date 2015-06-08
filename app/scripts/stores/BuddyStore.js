var alt = require('../alt');
var resp = require('../response.js');
var BuddyActions = require('../actions/BuddyActions');

// since we are using class/constructur method, all values assign to 'this' inside the store is accessible via BuddyStore.getState()
class BuddyStore {
  constructor() {
     this.buddys = resp; // pretend this was received from Ajax call and we need to store a clean copy of it
     this.buddysFiltered = resp; // our filtered state of list
     this.lastRemoved = undefined;

     this.bindAction(BuddyActions.remove, this.onRemoveBuddy);
     this.bindAction(BuddyActions.sort, this.onSort);
     this.bindAction(BuddyActions.updateFiltered, this.onUpdateFiltered);
  }

  onUpdateFiltered(list) {
    console.log(list)
     this.buddysFiltered = list; 
  }

  onSort(info) {
    console.log(info)
    let sortParam = info.sortParam;
    let isAsc = info.isAsc ? 1: -1;
    console.log(isAsc)

    // we sort both of our stores so that if user is in filtered mode, his sorting changes will remain after he exists filtered mode
    var sortFunc = function(a,b) {
      /*
        if (a.data[sortParam] > b.data[sortParam]) {
            return isAsc * 1;
        } 
        if (a.data[sortParam] < b.data[sortParam]) {
            return isAsc * -1;
        }
        return 0;
        */
        return isAsc * a.data[sortParam].toLowerCase().localeCompare(b.data[sortParam].toLowerCase())
    }

    this.buddysFiltered = this.buddysFiltered.sort(sortFunc);
    this.buddys= this.buddys.sort(sortFunc);
  }
  
  onRemoveBuddy(id) {
    if (!id) return
    
    this.buddys = this.buddys.filter(function(el) {
      return el.id !== id
    });
    this.buddysFiltered = this.buddysFiltered.filter(function(el) {
      return el.id !== id
    }); // repeat the same filtration for buddys altered so that we dont lose altered state upon delete
    this.lastRemoved = id;

  }

}

module.exports = alt.createStore(BuddyStore, 'BuddyStore');
