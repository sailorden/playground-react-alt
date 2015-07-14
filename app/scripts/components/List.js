'use strict'

var React = window.React = require('react');
var AltContainer = require('alt/AltContainer');
var LocationStore = require('../stores/LocationStore');
var LocationActions = require('../actions/LocationActions');

module.exports = React.createClass({
  _handleRemove: function(id) {
    // https://facebook.github.io/react/tips/communicate-between-components.html
    console.log('remove handler clicked');
    console.log(id)
    LocationActions.remove(id);

  },

  _onEditNote: function(id, e) {
    console.log(arguments)
    console.log(e.target.value);
    LocationActions.edit([id, e.target.value]);
  },

  render: function() {
    var createItem = function(note) {
      var width = '200px';

      var listStyle = {
          display: 'inline-block',
          position: 'relative',
          width: width,
          margin: '15px'
      };
      
      var textArea = {
          height: '100px',
          width: width,
          resize: 'none'
      };

      var img = {
        position: 'absolute',
        bottom: '10px',
        right: '2px'
      };

      return (
        <div key={note.id} style={listStyle}>
          <textarea style={textArea} value={note.note} onChange={this._onEditNote.bind(this, note.id)}>
          </textarea>
          <img
            src="../img/clear.png"
            onClick={this._handleRemove.bind(this, note.id)}
            style={img}/>

        </div>
      );
    }.bind(this);

    return <div>{this.props.items.map(createItem)}</div>;
  }
});
