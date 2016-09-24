import { observer } from 'mobx-react';

import styles from './styles.scss';

@observer
class Commands extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        let selected, filtered = this.props.commands.filter((command) => command.selected);

        let type, snapTo, index;

        if (filtered.length) {
            selected = filtered[0];

            type = selected.type;
            snapTo = selected.snapTo();
            index = selected.getIndex();
        }

        return selected ? <div>

            <span className={styles.type}>
                {type}
            </span>

            <span className={styles.attr}>
                index: {index}
            </span>
            <span className={styles.attr}>
                x: {snapTo.x}
            </span>
            <span className={styles.attr}>
                y: {snapTo.y}
            </span>
            
        </div> : null;
    }
}

export default Commands;