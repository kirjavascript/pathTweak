import styles from './index.scss';

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


export {
    Flex,
    Tile,
    Colour,
    colours
};