'use strict'

var React = window.React = require('react')
var Ajax = require('react-ajax')
var resp = require('./response.js');
var AltContainer = require('alt/AltContainer');
var LocationStore = require('./stores/LocationStore');
var LocationActions = require('./actions/LocationActions');

var BuddyList = React.createClass({
  _handleRemove: function(id) {
    // https://facebook.github.io/react/tips/communicate-between-components.html
    console.log('remove handler clicked');
    console.log(id)
    LocationActions.remove(id);

  },

  _onEditNote: function(id, e) {
    console.log(arguments)
    console.log(e.target.value);
    LocationActions.edit([id, e.target.value]);
  },

  render: function() {
    var createItem = function(note) {
      var width = '200px';

      var listStyle = {
          display: 'inline-block',
          position: 'relative',
          width: width,
          margin: '15px'
      };
      
      var textArea = {
          height: '100px',
          width: width,
          resize: 'none'
      };

      var img = {
        position: 'absolute',
        bottom: '10px',
        right: '2px'
      };

      return (
        <div key={note.id} style={listStyle}>
          <textarea style={textArea} value={note.note} onChange={this._onEditNote.bind(this, note.id)}>
          </textarea>
          <img
            src="../img/clear.png"
            onClick={this._handleRemove.bind(this, note.id)}
            style={img}/>

        </div>
      );
    }.bind(this);

    return <div>{this.props.items.map(createItem)}</div>;
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      items: [],
      filterStr: ''
    };
  },

  onAdd: function(e) {
    LocationActions.add({ id: Math.random() * 100000, note: ''});
  },

  filterList: function(event) {
    var lowerCasedInput = event.target.value.toLowerCase();
    var updatedList = this.getFilteredList(lowerCasedInput);

    console.log(updatedList)
    this.setState({items: updatedList, filterStr: lowerCasedInput});
    updatedList.length === 0 ? console.log('empty list'): !!1;
  },

  getFilteredList: function(str) {
    return LocationStore.getState().locations.filter(function(item) {
        return item.note.toLowerCase().search(str) !== -1
    });
  },

  componentWillMount: function() {
    console.log('in componentWillMount');
    this.setState({items: LocationStore.getState().locations})
  },

  componentDidMount: function() {
    LocationStore.listen(this._onStoreChange);// all instances returned by alt.createStore have a listen method.
  },

  componentWillUnmount() {
    LocationStore.unlisten(this._onStoreChange);
  },

  _onStoreChange() {
    console.log('onChange fired');

    // As we console logged, Location stores are indeed being deleted
    // ---- the correct behavior is to, reapply the filter on updated storage change. **
    this.setState({
        items: this.getFilteredList(this.state.filterStr) 
        /*
        items: this.state.items.filter(function(el) {
            return el.id !== LocationStore.getState().lastRemoved
        })// items has to go through this filter and look at lastRemoved incase the user is using the filter search function. we dont want them to lose their current search view 
       */
    }, function() {
      console.log(this.state.items.length)
    console.log(this.state.items)
    }.bind(this));

    //console.log(LocationStore.getState().lastRemoved)

    // if we were to call getInitialState instead of using setState, then we could lose our current filtered view?
  },

  render: function() {
    var nothingMsg = (!this.state.items.length) ? <div>Nothing here babe</div>: ''; 
    var mainDiv = {
      position: 'relative',
      height: 'inherit',
      width: 'inherit'
    };
    var addStyle = {
      position: 'absolute',
      bottom: '40px',
      right: '40px'
    };

    // curly braces inside jsx attributes allow us to use JS expressions
    return (
      <div style={mainDiv}>
        <h3>Notes Manager</h3>
        <input className="filter-field" type="text" placeholder="Search my notes..." onChange={this.filterList}/>

        <BuddyList items={this.state.items} />
        <img src="../img/add-circle.png" style={addStyle} onClick={this.onAdd}/>
        {nothingMsg}
      </div>
    );
  }
});

React.render(<App />, document.getElementById("app"));
