import { observable, action, computed } from 'mobx';

import { snapTo } from './util';

let theta = Math.PI * (3 - Math.sqrt(5));

export default class {

    @observable id = Math.random().toString(36).substring(7);
    @observable selected = 0;
    @observable type;

    @observable x;
    @observable y;
    @observable c1x;
    @observable c2x;
    @observable c1y;
    @observable c2y;
    @observable rotate;
    @observable large;
    @observable sweep;

    @action select;


    constructor(type, parent) {

        this.type = type;

        let i = parent.commands.length;
        let r = 50 * Math.sqrt(i), a = theta * i;

        this.x = (parent.width / 2 + r * Math.cos(a))|0;
        this.y = (parent.height / 2 + r * Math.sin(a))|0;

        if (type == 'C' || type == 'Q' || type == 'A') {
            this.c1x = (parent.width / 2 + r * Math.cos(a)*2)|0;
            this.c1y = (parent.height / 2 + r * Math.sin(a)/2)|0;
        }
        if (type == 'C') {
            this.c2y = (parent.width / 2 + r * Math.cos(a)/2)|0;
            this.c2x = (parent.height / 2 + r * Math.sin(a)*2)|0;
        }
        if (type == 'A') {
            this.rotate = 0;
            this.large = 0;
            this.sweep = 0;
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
                c1x: snapTo(this.c1x),
                c2x: snapTo(this.c2x),
                y: snapTo(this.y),
                c1y: snapTo(this.c1y),
                c2y: snapTo(this.c2y),
            };
        };

    }

}

