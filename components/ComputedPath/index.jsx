import { observer } from 'mobx-react';
import styles from './index.scss';

function setURL(path) {
    requestAnimationFrame(() => {
        location.replace(`#${path}`);
    });
}

@observer 
class ComputedPath extends React.Component {

    componentDidMount() {
        setURL(this.props.store.path);
    }

    componentWillUpdate(nextProps) {
        setURL(nextProps.store.path);
    }

    render() {
        let store = this.props.store;

        let attrs = [
            {name:'d',value:store.path},
            {name:'fill',value:store.fill},
            {name:'stroke',value:store.stroke},
            {name:'stroke-width',value:store.strokeWidth},
        ];

        return <pre className={styles.path} style={{
            maxWidth: store.width
        }}>
            <span>&lt;</span>
            <span className="red">path</span>
            {attrs.map((attr, i) => <div key={i}>
                <span className="orange">&emsp;{attr.name}</span>
                <span>=</span>
                <span className="green">"{attr.value}"</span>
            </div>)}
            <span>/&gt;</span>
        </pre>;

    }
}

export default ComputedPath;