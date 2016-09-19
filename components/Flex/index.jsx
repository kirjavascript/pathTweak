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

export {
    Flex,
    Tile
};