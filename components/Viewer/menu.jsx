import { observer } from 'mobx-react';
import styles from './styles.scss';

const Stats = observer((props) => {

    let data = props.data;

    let { x, y } = data.snapTo();

    let index = data.getIndex();

    return props.active ? (
        <g transform={`translate(${x},${y})`} className={styles.menu}>
            <g onClick={data.delete}>
                <rect x="0" y="0" width="65" height="20"/>
                <text x="10" y="15" fill="#a6b2c0" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
                    Delete
                </text>
            </g>
        </g>
    ) : null;

});

export default Stats;