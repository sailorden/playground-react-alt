'use strict'
var React = require('react');
var LocationStore = require('../stores/LocationStore');
var LocationActions = require('../actions/LocationActions');

var Sort = React.createClass({
    _toggleSortDisplay: function(event, b) {
        console.log(event)
        console.log(b)
        console.log(this)
  // in the mean time, lets just sort by Username Ascending
        LocationActions.sort({
          'sortType': 'username',
          'isAsc': true
        });
    },

    render() {
        return (
            <div onClick={this._toggleSortDisplay}>Sort</div>
        )
    }
});

module.exports = Sort;
