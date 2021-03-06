import { observable, action, computed, autorun } from 'mobx';

import Command from './command';

export default class {

    @observable history = [];
    @observable mutate = -1;
    @observable mutating = 0;

    @computed get current() {
        if (~this.mutate) {
            return this.mutate;
        }
        else {
            return this.history.length -1;
        }
    }

    @computed get length() {
        return this.history.length -1;
    }

    @action update(e) {
        this.mutate = +e.target.value;

        this.warp();
    }

    constructor(parent) {

        autorun(() => {

            // log commands
            if (this.mutate == -1) {
                let data = parent.commands
                        .toJS()
                        .map((d) => {
                            delete d.id;
                            delete d.selected;
                            return d;
                        });

                let dump = JSON.stringify(data);

                this.history.push(dump);
            }
            // snap back to present
            else {

                let futureLength = this.history.length - this.mutate +1;

                if (parent.commands.filter((d)=>d.selected).length) {
                    this.history.splice(-futureLength);

                    this.mutate = -1;
                }

            }

        });

        this.warp = () => {
            let historicArray = JSON.parse(this.history[this.mutate]);

            let difference = historicArray.length - parent.commands.length;

            // if historic is smaller, splice extra off

            if (difference < 0) {
                parent.commands.splice(difference);
            }

            parent.commands.forEach((command, i) => {

                let historic = historicArray[i];

                if (historic) {
                    Object.keys(historic).forEach((attr) => {
                        command[attr] = historic[attr];
                    });
                }

                // selected check to stop time warp
                command.selected = 0;

            });

            // if historic is longer, add new

            if (difference > 0) {

                historicArray
                    .splice(-difference)
                    .forEach((historic) => {

                        parent.commands.push(new Command({historic, parent}));

                    });

            }

        };

    }

}


