'use strict';

var alt = require('../alt');

class BuddyActions {
        constructor() {
                this.generateActions(
                        'remove',
                        'sort',
                        'updateAltered'
                );
        }

        create(name, interval) {
                this.dispatch({name, interval});
        }
}

module.exports = alt.createActions(BuddyActions);
