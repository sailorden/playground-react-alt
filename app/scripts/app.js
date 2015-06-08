//echo '{"id": "{{unixtime}}" , "data": {"avatar": "{{avatar}}", "firstName": "{{name.first}}", "lastName": "{{name.last}}", "username": "{{username}}"}},' | phony --max 100 > response.json

'use strict'

var React = window.React = require('react')
var Ajax = require('react-ajax')
var resp = require('./response.js');
var Sort = require('./components/Sort');
var AltContainer = require('alt/AltContainer');
var BuddyStore = require('./stores/BuddyStore');
var BuddyActions = require('./actions/BuddyActions');

var BuddyList = React.createClass({
  _handleRemove: function(id) {
    // https://facebook.github.io/react/tips/communicate-between-components.html
    console.log('remove handler clicked');
    console.log(id)
    BuddyActions.remove(id);

  },
  render: function() {
    var createItem = function(user) {
      var listStyle = {
          display: 'inline-block'
      };

      return (
        <div style={listStyle}>
          <div>
            <img src={user.data.avatar} />
          </div>
          {user.data.username}<br/>
          {user.data.firstName}<br/>
          {user.data.lastName}<br/>

          <button onClick={this._handleRemove.bind(this, user.id)}>Delete me</button>
        </div>
      );
    }.bind(this);

    return <div>{this.props.items.map(createItem)}</div>;
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      items: BuddyStore.getState().buddys,  // we are returned {locatins: [..]}
      text: ''
    };
  },
  onChangeAddField: function(e) {
    this.setState({text: e.target.value});// calling this triggers UI update
  },
  onSubmitAddField: function(e) {
    e.preventDefault();

    var nextItems = this.state.items.concat([this.state.text]);
    this.setState({items: nextItems, text: ''}); //calling this triggers UI update
  },

  filterList: function(event) {
    // use buddys as opposed to buddysFilteredList as it is the base of our filtration
    var updatedList = BuddyStore.getState().buddys;
    var lowerCasedInput = event.target.value.toLowerCase()

    updatedList = updatedList.filter(function(item) {
        return [item.data.username.toLowerCase(),
               item.data.firstName.toLowerCase(),
               item.data.lastName.toLowerCase()]
                   .map(function(el) { return el.search(lowerCasedInput)})
                   .some(function(el) {return el !== -1});
    });

    console.log(updatedList)
    BuddyActions.updateAltered(updatedList)

    updatedList.length === 0 ? console.log('empty list'): !!1;
  },

  componentWillMount: function() {
    console.log('in componentWillMount');
  },

  componentDidMount: function() {
    BuddyStore.listen(this._onStoreChange);// all instances returned by alt.createStore have a listen method.
  },

  componentWillUnmount() {
    BuddyStore.unlisten(this._onStoreChange);
  },

  _onStoreChange() {
    console.log('onChange fired');
    // As we console logged, Location stores are indeed being deleted
    this.replaceState({
        items: BuddyStore.getState().buddysAltered 
    }, function() {
      console.log('Items length:');
      console.log(this.state.items.length)
    }.bind(this));

    console.log(BuddyStore.getState().lastRemoved)

    // if we were to call getInitialState instead of using setState, then we could lose our current filtered view?
  },

  render: function() {
    var nothingMsg = (!this.state.items.length) ? <div>Nothing here babe</div>: ''; 

    // curly braces inside jsx attributes allow us to use JS expressions
    return (
      <div>
        <h3>Buddy List</h3>
        <input className="filter-field" type="text" placeholder="Filter" onChange={this.filterList}/>
        <Sort />

        <BuddyList items={this.state.items} />
        <form onSubmit={this.onSubmitAddField}>
          <input onChange={this.onChangeAddField} value={this.state.text} placeholder='Add An Item'/>
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
        {nothingMsg}
      </div>
    );
  }
});

React.render(<App />, document.getElementById("app"));
