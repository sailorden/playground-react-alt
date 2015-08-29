var React = window.React = require('react')
var AltContainer = require('alt/AltContainer');
var LocationStore = require('../stores/LocationStore');
var LocationActions = require('../actions/LocationActions');
var BuddyList = require('./BuddyList');

var ReactRouter = window.ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;

var wrapper = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#E0F2FF',
};

var coverStyle = {
    height: '66%',
    width: '100%',
    background: 'url("http://www.sonicagenda.com/wp-content/uploads/2014/07/ibiza.jpg")',
    backgroundSize: 'cover',
};

var profileBody = {
}

var Profile = React.createClass({
    render: function() {
        return (
          <div style={wrapper}>
            <div style={coverStyle} >
            </div>
            <div style={profileBody}>
              Profile body
            </div>
          </div>
        )
    }
});

module.exports = Profile;
