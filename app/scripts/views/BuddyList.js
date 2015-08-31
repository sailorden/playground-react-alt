'use strict'

var React = window.React = require('react')
var BuddyStore = require('../stores/BuddyStore');
var BuddyActions = require('../actions/BuddyActions');

var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var BuddyList = React.createClass({
  _handleRemove: function(id, ev) {
    // https://facebook.github.io/react/tips/communicate-between-components.html
    console.log('remove handler clicked');
    console.log(id)
    BuddyActions.remove(id);
    ev.stopPropagation();

  },
  render: function() {
    var createItem = function(user) {
      var listStyle = {
          display: 'inline-block',
          margin: '10px',
      };

      return (
        <div style={listStyle}>
          <Link to={"/profile/" + user.id}>
            <div className="profile-clickable">
              <div>
                <img src={user.data.avatar} />
              </div>

              {user.data.username}<br/>
              {user.data.firstName}<br/>
              {user.data.lastName}<br/>
  
            </div>

          </Link>

          <button onClick={this._handleRemove.bind(this, user.id)}>Delete me</button>
          {/*TODO: include this button inside Link. as of now, it causes bug in that a deletion will popup the profile page of the next node. This even happens with stopPropagation*/}
        </div>
      );
    }.bind(this);

    return <div>{this.props.items.map(createItem)}</div>;
  }
});

module.exports = BuddyList; 
