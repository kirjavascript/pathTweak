import { observer } from 'mobx-react';
import styles from './index.scss';
import { Colour } from '../UI/index.jsx';
import debounce from 'lodash.debounce';

const setURL = debounce(function(path) {
    requestAnimationFrame(() => {
        location.replace(`#${path}`);
    });
}, 50);

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
            // {name:'fill',value:store.fill},
            // {name:'stroke',value:store.stroke},
            // {name:'stroke-width',value:store.strokeWidth},
        ];

        return <pre className={styles.path} style={{
            maxWidth: store.width
        }}>
            <span>&lt;</span>
            <Colour is="red">path</Colour>
            {attrs.map((attr, i) => <span key={i}>
                <Colour is="orange">&nbsp;{attr.name}</Colour>
                <span>=</span>
                <Colour is="green">"{attr.value}"</Colour>
            </span>)}
            <span>/&gt;</span>
        </pre>;

    }
}

export default ComputedPath;