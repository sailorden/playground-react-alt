'use strict'

var React = window.React = require('react');
var List = require('./components/List');
var AltContainer = require('alt/AltContainer');
var LocationStore = require('./stores/LocationStore');
var LocationActions = require('./actions/LocationActions');

var App = React.createClass({
  getInitialState() {
    return {
      items: [],
      filterStr: ''
    };
  },

  onAdd (e) {
    LocationActions.add({ id: Math.random() * 100000, note: ''});
  },

  filterList(event) {
    var lowerCasedInput = event.target.value.toLowerCase();
    var updatedList = this.getFilteredList(lowerCasedInput);

    console.log(updatedList)
    this.setState({items: updatedList, filterStr: lowerCasedInput});
    updatedList.length === 0 ? console.log('empty list'): !!1;
  },

  getFilteredList(str) {
    return LocationStore.getState().locations.filter(function(item) {
        return item.note.toLowerCase().search(str) !== -1
    });
  },

  componentWillMount() {
    console.log('in componentWillMount');
    this.setState({items: LocationStore.getState().locations})
  },

  componentDidMount() {
    LocationStore.listen(this._onStoreChange);// all instances returned by alt.createStore have a listen method.
  },

  componentWillUnmount() {
    LocationStore.unlisten(this._onStoreChange);
  },

  _onStoreChange() {
    console.log('onChange fired');

    this.setState({
        items: this.getFilteredList(this.state.filterStr) 
    }, () => {
      console.log(this.state.items.length)
      console.log(this.state.items)
    });

    //console.log(LocationStore.getState().lastRemoved)

    // if we were to call getInitialState instead of using setState, then we could lose our current filtered view?
  },

  render() {
    var nothingMsg = (!this.state.items.length) ? <div>Nothing here babe</div>: ''; 
    var mainDiv = {
      position: 'relative',
      height: 'inherit',
      width: 'inherit'
    };
    var addStyle = {
      position: 'fixed',
      bottom: '40px',
      right: '40px'
    };

    var margin15 = {
      margin: '15px'
    }

    // curly braces inside jsx attributes allow us to use JS expressions
    return (
      <div style={mainDiv}>
        <h3 style={margin15}>Notes Manager</h3>
        <input style={margin15} className="filter-field" type="text" placeholder="Search my notes..." onChange={this.filterList}/>

        <List items={this.state.items} />
        <img src="../img/add-circle.png" style={addStyle} onClick={this.onAdd}/>
        {nothingMsg}
      </div>
    );
  }
});

React.render(<App />, document.getElementById("app"));
