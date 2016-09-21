import { observer } from 'mobx-react';

import { history } from '../../data/index';
import styles from './time.scss';

const TimeTravel = observer((props) => {

    return <div className={styles.time}>
        <input type="range"
        min="0"
        step="1"
        value={history.current}
        onChange={::history.update}
        max={history.length}/>
        <div className={styles.stats}>
            time travel &emsp; {history.current} / {history.length}
        </div>
    </div>;
});

export default TimeTravel;