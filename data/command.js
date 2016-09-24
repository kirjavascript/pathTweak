import { observable, autorun, action, computed } from 'mobx';

import { snapTo } from './util';

let theta = Math.PI * (3 - Math.sqrt(5));

export default class {

    @observable id;
    @observable selected = 0;
    @observable type;

    @observable x;
    @observable y;
    @observable x1;
    @observable x2;
    @observable y1;
    @observable y2;
    @observable rotate;
    @observable large;
    @observable sweep;

    @action select;

    constructor({ type, parent, historic }) {

        this.id = Math.random().toString(36).slice(2);

        if (historic) {
            historic.id &&
            console.warn('Overwriting a command\'s ID can cause event issues with React');

            Object.keys(historic).forEach((attr) => {
                this[attr] = historic[attr];
            });
        }
        else {
            this.type = type;

            let i = parent.commands.length;
            let r = 50 * Math.sqrt(i), a = theta * i;

            let width = window.innerWidth;
            let height = window.innerHeight;

            if (type != 'V') {
                this.x = (width / 2 + r * Math.cos(a))|0;
            }
            if (type != 'H') {
                this.y = (height / 2 + r * Math.sin(a))|0;
            }
            if (type == 'C' || type == 'Q' || type == 'A') {
                this.x1 = (width / 2 + r * Math.cos(a)*2)|0;
                this.y1 = (height / 2 + r * Math.sin(a)/2)|0;
            }
            if (type == 'C') {
                this.y2 = (width / 2 + r * Math.cos(a)/2)|0;
                this.x2 = (height / 2 + r * Math.sin(a)*2)|0;
            }
            if (type == 'A') {
                this.rotate = 0;
                this.large = 0;
                this.sweep = 0;
            }
        }



        this.select = () => {
            parent.commands.forEach((command) => {
                command.selected = 0;
            });
            this.selected = 1;
        };

        this.snapTo = () => {
            return {
                x: snapTo(this.x),
                x1: snapTo(this.x1),
                x2: snapTo(this.x2),
                y: snapTo(this.y),
                y1: snapTo(this.y1),
                y2: snapTo(this.y2),
            };
        };

        this.getHY = () => {
            let index = parent.getIndexById(this.id);

            if (index) {
                return parent.commands[index-1].y;
            }
        };

        this.getVX = () => {
            let index = parent.getIndexById(this.id);

            if (index) {
                return parent.commands[index-1].x;
            }
        };

    }

}

