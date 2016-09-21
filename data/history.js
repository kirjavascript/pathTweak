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

            if (this.mutate == -1) {
                let data = parent.commands.toJS();
                
                this.history.push(JSON.stringify(data));
            }
            
        });

        this.warp = () => {
            let historicArray = JSON.parse(this.history[this.mutate]);
            historicArray = historicArray.map((historic) => new Command({ historic, parent }));
            parent.commands.replace(historicArray);
        };

    }

}


