var React = window.React = require('react')
var AltContainer = require('alt/AltContainer');
var LocationStore = require('../stores/BuddyStore');
var LocationActions = require('../actions/BuddyActions');
var BuddyList = require('./BuddyList');
var resp = require('../response.js');

var ReactRouter = window.ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var Navigation = ReactRouter.Navigation;

var wrapper = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: '3%',
    backgroundColor: 'rgba(224, 242, 255, 0.75)',
};

var coverStyle = {
    position: 'relative',
    height: '66%',
    width: '100%',
    background: 'url("http://www.sonicagenda.com/wp-content/uploads/2014/07/ibiza.jpg")',
    backgroundSize: 'cover',
};

var profileBody = {
    height: '33%',
    textAlign: 'right',
    backgroundColor: 'white',
}

var profilePic = {
    position: 'absolute',
    width: '128px',
    height: '128px',
    left: '16px',
    bottom: '-64px',
}

var backBtn = {
    marginTop: '40px',
    cursor: 'pointer',
}

var Profile = React.createClass({
    mixins: [ Navigation ],
    render: function() {
        var id = this.props.params.id;
        console.log(this.props.params.id)
  
        var profile = resp.filter(function(el) {
            return el.id === id
        }).map(function(el) {
            return {
                avatar: el.data.avatar,
                firstName: el.data.firstName,
                lastName: el.data.lastName,
                username: el.data.username
            }
        });
        // this crap is just a shortcut. be sure to use proper model for this data later

        var profile = profile[0];
        console.log(profile);

        return (
          <div style={wrapper}>
            <div style={coverStyle} >
              <img src={profile.avatar} style={profilePic} />
            </div>
            <div style={profileBody}>
              {profile.firstName} {profile.lastName}
              <br/>
              {profile.username}
              <div onClick={function() {this.goBack()}.bind(this)} style={backBtn}>
                Go back
              </div>
            </div>
          </div>
        )
    }
});

module.exports = Profile;
