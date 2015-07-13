'use strict';

var alt = require('../alt');

class LocationActions {
        constructor() {
                this.generateActions(
                        'add',
                        'remove'
                );
        }

        create(name, interval) {
                this.dispatch({name, interval});
        }
}

module.exports = alt.createActions(LocationActions);
