'use strict'

var React = window.React = require('react')
var LocationStore = require('../stores/LocationStore');
var LocationActions = require('../actions/LocationActions');


var BuddyList = React.createClass({
  _handleRemove: function(id) {
    // https://facebook.github.io/react/tips/communicate-between-components.html
    console.log('remove handler clicked');
    console.log(id)
    LocationActions.remove(id);

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

module.exports = BuddyList; 
