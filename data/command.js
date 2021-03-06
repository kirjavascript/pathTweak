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

            let width = window.innerWidth-60;
            let height = window.innerHeight-80;

            this.x = (width / 2 + r * Math.cos(a))|0;
            this.y = (height / 2 + r * Math.sin(a))|0;
            this.x1 = (width / 2 + r * Math.cos(a)/2)|0;
            this.y1 = (height / 2 + r * Math.sin(a)/3)|0;
            this.x2 = (width / 2 + r * Math.cos(a)*2)|0;
            this.y2 = (height / 2 + r * Math.sin(a)/2)|0;
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

            let x = snapTo(this.x);
            let y = snapTo(this.y);

            if (this.type == 'V') {
                x = this.getVX();
            }
            else if (this.type == 'H') {
                y = this.getHY();
            }
            else if (this.type == 'Z') {
                [x, y] = this.getZ();
            }

            return {
                x,
                y,
                x1: snapTo(this.x1),
                x2: snapTo(this.x2),
                y1: snapTo(this.y1),
                y2: snapTo(this.y2),
            };
        };

        this.getHY = () => {
            let index = this.getIndex();

            if (index) {
                return snapTo(parent.commands[index-1].y);
            }
        };

        this.getVX = () => {
            let index = this.getIndex();

            if (index) {
                return snapTo(parent.commands[index-1].x);
            }
        };

        this.getZ = () => {
            let index = this.getIndex();
            let startIndex = 0;

            for (let i=index-1;i>=0;i--) {
                if (parent.commands[i].type=='M') {
                    startIndex = i;
                    break;
                }
            }

            let end = parent.commands[startIndex].snapTo();
            let start = parent.commands[index-1].snapTo();

            return [(start.x+end.x)/2,(start.y+end.y)/2];
        };

        this.hasX1 = () => {
            return ~'CQAS'.indexOf(this.type);
        };

        this.getIndex = () => {
            return parent.getIndexById(this.id);
        };

        this.delete = () => {
            let index = this.getIndex();
            parent.commands.splice(index, 1);
        };

    }

}
