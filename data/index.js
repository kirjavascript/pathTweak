import { action, computed, observable } from 'mobx';
import { getPath } from './util';

class Store {

    @observable commands = [];
    @observable state = {
        closed: false,
    };

    @observable fill = '#3399ff';
    @observable stroke = '#000000';
    @observable strokeWidth = 2;
    @observable width = 500;
    @observable height = 500;
    @observable grid = 20;

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
        this.commands.push(this.layout(type));
    }

    @action delete(id) {
        let index = this.commands.findIndex((d) => d.id == id);
        this.commands.splice(index, 1);
    }

    @action up(id) {
        let index = this.commands.findIndex((d) => d.id == id);
        if (index != 0) {
            let temp = this.commands[index];
            this.commands[index] = this.commands[index-1];
            this.commands[index-1] = temp;
        }
    }
    @action down(id) {
        let index = this.commands.findIndex((d) => d.id == id);
        if (index != this.commands.length-1) {
            let temp = this.commands[index];
            this.commands[index] = this.commands[index+1];
            this.commands[index+1] = temp;
        }

    }

    layout = (() => {
        let theta = Math.PI * (3 - Math.sqrt(5));
        return (type) =>  {
            let i = this.commands.length;
            let r = 50 * Math.sqrt(i), a = theta * i;
            let obj = {
                type,
                x: this.width / 2 + r * Math.cos(a),
                y: this.height / 2 + r * Math.sin(a),
                id: Math.random().toString(36).substring(7)
            };
            if (type == 'C' || type == 'Q' || type == 'A') {
                obj = Object.assign({
                    c1x: this.width / 2 + r * Math.cos(a)*2,
                    c1y: this.height / 2 + r * Math.sin(a)/2,

                }, obj);
            }
            if (type == 'C') {
                obj = Object.assign({
                    c2y: this.width / 2 + r * Math.cos(a)/2,
                    c2x: this.height / 2 + r * Math.sin(a)*2,
                }, obj);
            }
            if (type == 'A') {
                obj = Object.assign({
                    rotate: 0,
                    large: 0,
                    sweep: 0,
                }, obj);
            }
            return obj;
        };
    })();

    @action closePath() {
        this.state.closed = !this.state.closed;
    }


    

}




let store = new Store;

export default store;