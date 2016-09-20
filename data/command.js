import { observable } from 'mobx';

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


    constructor(type, parent) {

        this.type = type;

        let i = parent.commands.length;
        let r = 50 * Math.sqrt(i), a = theta * i;

        this.x = parent.width / 2 + r * Math.cos(a);
        this.y = parent.height / 2 + r * Math.sin(a);

        if (type == 'C' || type == 'Q' || type == 'A') {
            this.c1x = parent.width / 2 + r * Math.cos(a)*2;
            this.c1y = parent.height / 2 + r * Math.sin(a)/2;
        }
        if (type == 'C') {
            this.c2y = parent.width / 2 + r * Math.cos(a)/2;
            this.c2x = parent.height / 2 + r * Math.sin(a)*2;
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

    }

}

