//echo '{"id": "{{unixtime}}" , "data": {"avatar": "{{avatar}}", "firstName": "{{name.first}}", "lastName": "{{name.last}}", "username": "{{username}}"}},' | phony --max 100 > response.json

'use strict'

var React = window.React = require('react')
var Timer = require("./ui/Timer")
var Ajax = require('react-ajax')
var resp = require('./response.js');
var AltContainer = require('alt/AltContainer');
var LocationStore = require('./stores/LocationStore');

var TodoList = React.createClass({
  render: function() {
    var createItem = function(user) {
      return <div>
          <div>
            <img src={user.data.avatar} />
          </div>
          {user.data.username}<br/>
          {user.data.firstName}<br/>
          {user.data.lastName}
      </div>;
    };

    return <div>{this.props.items.map(createItem)}</div>;
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      initialItems: LocationStore.getState().locations,  // we are returned {locatins: [..]}
      items: [],
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
    var updatedList = this.state.initialItems;
    var lowerCasedInput = event.target.value.toLowerCase()

    
    updatedList = updatedList.filter(function(item) {
        return [item.data.username.toLowerCase(),
               item.data.firstName.toLowerCase(),
               item.data.lastName.toLowerCase()]
                   .map(function(el) { return el.search(lowerCasedInput)})
                   .some(function(el) {return el !== -1});
    });

    console.log(updatedList)
    this.setState({items: updatedList});
    updatedList.length === 0 ? console.log('empty list'): !!1;
  },
  componentWillMount: function() {
    console.log('componentWillMount');
    this.setState({items: this.state.initialItems})
  },
  componentDidMount: function() {
    LocationStore.listen(this.onChange);
  },
  componentWillUnmount() {
    LocationStore.unlisten(this.onChange);
  },
  render: function() {
/*
    if (!this.state.items.length) {
      return (
        <div>Nothing here</div>
      );
    }
*/
    var nothingMsg = (!this.state.items.length) ? <div>Nothing here babe</div>: ''; 

    return (
      <div>
        <h3>Buddy</h3>
        <input type="text" placeholder="Search" onChange={this.filterList}/>

        <TodoList items={this.state.items} />
        <form onSubmit={this.onSubmitAddField}>
          <input onChange={this.onChangeAddField} value={this.state.text} placeholder='Add An Item'/>
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
        {nothingMsg}
        <Timer />
      </div>
    );
  }
});

React.render(<App />, document.getElementById("app"));
