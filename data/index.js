import { action, computed, observable, autorun } from 'mobx';
import { getPath, parsePath } from './util';
import Command from './command';
import History from './history';

class Store {

    @observable commands = [];
    @observable grid = 1;

    getIndexById(id) {
        return this.commands.findIndex((d) => d.id == id);
    }

    @computed get path() {
        return this::getPath();
    }

    @action setGrid(e) {
        this.grid = e.target.value;
    }

    @action clear() {
        this.commands.replace([]);
    }

    @action add(type) {
        this.commands.push(new Command({type, parent:this}));
    }

    @action up(id) {
        let index = this.getIndexById(id);
        if (index != 0) {
            let temp = this.commands[index];
            this.commands[index] = this.commands[index-1];
            this.commands[index-1] = temp;
        }
    }
    @action down(id) {
        let index = this.getIndexById(id);
        if (index != this.commands.length-1) {
            let temp = this.commands[index];
            this.commands[index] = this.commands[index+1];
            this.commands[index+1] = temp;
        }

    }

    constructor() {

        let urlPath = decodeURI(location.hash).slice(1).trim();

        try {
            this::parsePath(urlPath);
        }
        catch(e) {
            // if path is invalid or doesn't exist
            this.commands.push(new Command({type: 'M', parent: this}));
        }
        
    }

}

let store = new Store;

let history = new History(store);

export { history };
export default store;