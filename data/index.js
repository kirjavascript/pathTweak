import { action, computed, observable, autorun } from 'mobx';
import { getPath } from './util';
import Command from './command';

class Store {

    @observable commands = [];

    @observable closed = 0;
    @observable fill = '#3399ff';
    @observable stroke = '#000000';
    @observable strokeWidth = 2;
    @observable width = 500;
    @observable height = 500;
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
        this.commands.push(new Command(type, this));
    }

    @action delete(id) {
        let index = this.getIndexById(id);
        this.commands.splice(index, 1);
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

    @action closePath() {
        this.closed = +(!this.closed);
    }

}




let store = window.store = new Store;

autorun(() => {
    console.log(store.grid);
});

export default store;