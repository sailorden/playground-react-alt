//echo '{"id": "{{unixtime}}" , "data": {"avatar": "{{avatar}}", "firstName": "{{name.first}}", "lastName": "{{name.last}}", "username": "{{username}}"}},' | phony --max 100 > response.json

var React = window.React = require('react')
var Timer = require("./ui/Timer")
var Ajax = require('react-ajax')
var resp = require('./response.js');
console.log(resp)

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
      initialItems: [], 
      items: [],
      text: ''
    };
  },
  handleChange: function(e) {
    this.setState({text: e.target.value});// calling this triggers UI update
  },
  handleSubmit: function(e) {
    e.preventDefault();

    var nextItems = this.state.items.concat([this.state.text]);
    this.setState({items: nextItems, text: ''}); //calling this triggers UI update
  },
  filterList: function(event){
    var updatedList = this.state.initialItems;
    var lowerCasedInput = event.target.value.toLowerCase()

    
    updatedList = updatedList.filter(function(item) {
        return [item.data.username.toLowerCase(),
               item.data.firstName.toLowerCase(),
               item.data.lastName.toLowerCase()].
                   map(function(el) { return el.search(lowerCasedInput)}).
                   some(function(el) {return el !== -1});
    });

    this.setState({items: updatedList});
  },
  componentWillMount: function() {
    console.log('componentWillMount');
    this.setState({items: this.state.initialItems})
  },
  componentDidMount: function() {
    setTimeout(function() {
        console.log('componentDidMount');
        this.setState({initialItems: resp});
        this.setState({items: this.state.initialItems});
    }.bind(this), 300); // use this timeout to simulate an AJAX request. otherwise, initItems is not set on first render as desired
  },
  render: function() {
    return (
      <div>
        <h3>Buddy</h3>
        <input type="text" placeholder="Search" onChange={this.filterList}/>

        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.text} placeholder='Add An Item'/>
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
        <Timer />
      </div>
    );
  }
});

React.render(<App />, document.getElementById("app"));
