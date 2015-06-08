'use strict';

var React = require('React');
var BuddyStore = require('../stores/BuddyStore');
var BuddyActions = require('../actions/BuddyActions');

var BuddyNodes = React.createClass({
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

module.exports = BuddyNodes;
