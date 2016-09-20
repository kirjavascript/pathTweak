import store from './index';


function getPath() {
    let output = store.commands.map((d) => {
        let output = d.type;
        if (d.type == 'C' || d.type == 'Q' || d.type == 'A') {
            output += `${snapTo(d.c1x)},${snapTo(d.c1y)} `;
        }
        if (d.type == 'C') {
            output += `${snapTo(d.c2x)},${snapTo(d.c2y)} `;
        }
        if (d.type == 'A') {
            output += `${d.rotate} ${d.large},${d.sweep}`;
        }
        output+=`${snapTo(d.x)},${snapTo(d.y)} `;
        return output;

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

export {
    snapTo,
    getPath
};