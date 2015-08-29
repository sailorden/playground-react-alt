var React = window.React = require('react')
var AltContainer = require('alt/AltContainer');
var LocationStore = require('../stores/LocationStore');
var LocationActions = require('../actions/LocationActions');
var BuddyList = require('./BuddyList');

var ReactRouter = window.ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;

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

module.exports = Profile;
