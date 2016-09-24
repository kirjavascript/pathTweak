import { parse } from '../lib/svgPathParser';
import store from './index';
import Command from './command';

function getPath() {
    let output = store.commands.map((d) => {
        let output = d.type;
        if (d.type == 'C' || d.type == 'Q' || d.type == 'A') {
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
        else {
            output+=`${snapTo(d.x)},${snapTo(d.y)} `;
        }
        
        return output.slice(0,-1);

    });

    if (store.closed) {
        output.push('z');
    }

    return output.join('');
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

            if (command.type == 'Z') {
                this.closed = 1;
            }
            else {
                this.commands.push(new Command({ 
                    parent: this,
                    historic: command
                }));
            }

        });
}

export {
    snapTo,
    getPath,
    parsePath
};