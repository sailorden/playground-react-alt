
var React = window.React = require('react')
var Timer = require("./ui/Timer")

var TodoList = React.createClass({
  render: function() {
    var createItem = function(itemText) {
      return <li>{itemText}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {items: ['Theo\'s Meatballs', 'Teddy Supreme'], text: ''};
  },
  handleChange: function(e) {
    this.setState({text: e.target.value});// calling this triggers UI update
  },
  handleSubmit: function(e) {
    console.log(e)
    e.preventDefault();

    var nextItems = this.state.items.concat([this.state.text]);
    this.setState({items: nextItems, text: ''}); //calling this triggers UI update
  },
  render: function() {
    return (
      <div>
        <h3>TODO</h3>
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
