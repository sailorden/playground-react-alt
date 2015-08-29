//echo '{"id": "{{unixtime}}" , "data": {"avatar": "{{avatar}}", "firstName": "{{name.first}}", "lastName": "{{name.last}}", "username": "{{username}}"}},' | phony --max 100 > response.json

'use strict'

var React = window.React = require('react')
var Ajax = require('react-ajax')
var resp = require('./response.js');
var AltContainer = require('alt/AltContainer');
var LocationStore = require('./stores/LocationStore');
var LocationActions = require('./actions/LocationActions');
var BuddyList = require('./views/BuddyList');

var ReactRouter = window.ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;

var HashHistory = require('react-router/lib/HashHistory').default;

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
    console.log('in componentWillMount');
    this.setState({items: this.state.initialItems})
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
    this.setState({
        initialItems: LocationStore.getState().locations,
        items: this.state.items.filter(function(el) {
            return el.id !== LocationStore.getState().lastRemoved
        })// items has to go through this filter and look at lastRemoved incase the user is using the filter search function. we dont want them to lose their current search view 
    }, function() {
      console.log(this.state.items.length)
    }.bind(this));

    console.log(LocationStore.getState().lastRemoved)

    // if we were to call getInitialState instead of using setState, then we could lose our current filtered view?
  },

  render: function() {
    var nothingMsg = (!this.state.items.length) ? <div>Nothing here babe</div>: ''; 

    // curly braces inside jsx attributes allow us to use JS expressions
    return (
      <div>
        <h3>Buddy List</h3>
        <input className="filter-field" type="text" placeholder="Filter" onChange={this.filterList}/>

        <BuddyList items={this.state.items} />
        <form onSubmit={this.onSubmitAddField}>
          <input onChange={this.onChangeAddField} value={this.state.text} placeholder='Add An Item'/>
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
        {nothingMsg}

        {/*children refers to route children*/}
        {this.props.children}
      </div>
    );
  }
});

// https://www.npmjs.com/package/react-router
// https://github.com/rackt/react-router/pull/1323

var profileStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#E0F2FF',
};

var Profile = React.createClass({
    render: function() {
        return (
          <div style={profileStyle}>
            I am profile
          </div>
        )
    }
});

React.render((
  <Router history={new HashHistory} >
    <Route path="/" component={App}>
      {/* Add the route, nested where we want the UI to nest */}
      <Route path="profile/:id" component={Profile}/>
    </Route>
  </Router>
), document.getElementById("app"));

