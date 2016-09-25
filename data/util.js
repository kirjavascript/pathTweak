import { parse } from '../lib/svgPathParser';
import store from './index';
import Command from './command';

function getPath() {
    let output = store.commands.map((d) => {
        let output = d.type;
        if (d.hasX1()) {
            output += `${snapTo(d.x1)},${snapTo(d.y1)} `;
        }
        if (d.type == 'C') {
            output += `${snapTo(d.x2)},${snapTo(d.y2)} `;
        }
        if (d.type == 'A') {
            output += `${d.rotate} ${d.large},${d.sweep}`;
        }

        if (d.type == 'H') {
            output+=`${snapTo(d.x)} `;
        }
        else if (d.type == 'V') {
            output+=`${snapTo(d.y)} `;
        }
        else if (d.type == 'Z') {
            output+='z';
        }
        else {
            output+=`${snapTo(d.x)},${snapTo(d.y)} `;
        }
        
        return output.slice(0,-1);

    });

    output = output.join('');

    return output;
    
}

function snapTo(num) {
    let grid = store.grid > 0 ? store.grid : 1;
    return grid*Math.round(num/grid);
}

function parsePath(urlPath) {

    if (!urlPath.length) {
        throw 'Empty path';
    }

    let commands = parse(urlPath);

    // relative to absolute
    commands.forEach((command, i) => {
        if (command.relative && i) {
            command.relative = false;
            command.type = command.type.toUpperCase();
            command.x += commands[i-1].x;
            command.y += commands[i-1].y;
        }
    });

    commands
        .forEach((command) => {

            this.commands.push(new Command({ 
                parent: this,
                historic: command
            }));

        });
}

export {
    snapTo,
    getPath,
    parsePath
};