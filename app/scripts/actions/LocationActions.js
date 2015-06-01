'use strict';

var alt = require('../alt');

class LocationActions {
        constructor() {
                this.generateActions(
                        'remove'
                );
        }

        create(name, interval) {
                this.dispatch({name, interval});
        }
}

module.exports = alt.createActions(LocationActions);
