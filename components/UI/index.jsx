import styles from './styles.scss';

let colours = {
    red: '#c06973',
    orange: '#d2945a',
    white: '#a6b2c0',
    grey: '#272b33',
    lightgrey: '#3d4350',
    green: '#86c378',
    purple: '#c679dd',
    blue: '#51b6c2'
};

const Colour = (props) => {
    return <span style={{color:colours[props.is]}}>{props.children}</span>;
};

const Flex = (props) => {

    return <div className={styles.flex}>
        {props.children}
    </div>;
};

const Tile = (props) => {
    return <div className={styles.tile} style={{
        padding: props.padding || 5
    }}>
        {props.children}
    </div>;
};

const AbsPos = (props) => {

    let [top, right, bottom, left] = props.pos
        .split(' ')
        .map((pos) => ~pos ? +pos : 'none');

    return <div
        style={{
            position: 'absolute',
            left, right, bottom, top,
            textAlign: props.align
        }}>
        {props.children}
    </div>;
};

const Icon = (props) => 
    <img 
        onClick={props.onClick}
        className={styles.icon}
        src={require(`./icons/${props.name}.svg`)}/>;

export {
    Flex,
    Tile,
    Colour,
    AbsPos,
    Icon,
    colours
};