function getPath() {
    let output = this.commands.map((d) => {
        let output = d.type;
        if (d.type == 'C' || d.type == 'Q' || d.type == 'A') {
            output += `${this::snapTo(d.c1x)},${this::snapTo(d.c1y)} `;
        }
        if (d.type == 'C') {
            output += `${this::snapTo(d.c2x)},${this::snapTo(d.c2y)} `;
        }
        if (d.type == 'A') {
            output += `${d.rotate} ${d.large},${d.sweep}`;
        }
        output+=`${this::snapTo(d.x)},${this::snapTo(d.y)} `;
        return output;

    });

    if (this.closed) {
        output.push('z');
    }

    return output.join('');
}

function snapTo(num) {
    return this.grid*Math.round(num/this.grid);
}

export {
    snapTo,
    getPath
};