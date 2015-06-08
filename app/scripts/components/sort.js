'use strict'
var React = require('react');
var LocationStore = require('../stores/LocationStore');
var LocationActions = require('../actions/LocationActions');

var Sort = React.createClass({
    _toggleSortDisplay: function(isAsc, event) { // if we are passing in params to this eventHandler, then the event param is added by react to the end of our arguments list
        console.log(isAsc)
        console.log(this)
  // in the mean time, lets just sort by Username Ascending
        LocationActions.sort({
          'sortParam': 'username',
          'isAsc': isAsc
        });
    },

    render() {
        return (
          <div>
            <div onClick={this._toggleSortDisplay.bind(this, true)}>Sort Asc</div>
            <div onClick={this._toggleSortDisplay.bind(this, false)}>Sort Desc</div>
          </div>
        )
    }
});

module.exports = Sort;
