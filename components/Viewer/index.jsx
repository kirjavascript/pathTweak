import { observer } from 'mobx-react';
import styles from './styles.scss';
import Axis from './axis.jsx';
import Node from './node.jsx';

@observer
class Command extends React.Component {

    // constructor(props) {
    //     super(props);

    //     let store = this.props.store;

    //     window.addEventListener('DOMMouseScroll', (e) => {
    //         if (e.detail > 0) {
    //             store.zoom += .5;

    //         }
    //         else if (store.zoom > .5) {
    //             store.zoom -= .5;
    //         }
    //     });
    // }

    render() {
        let store = this.props.store;

        return (
        <svg
            className={styles.viewer}
            xmlns="http://www.w3.org/2000/svg">

            <Axis zoom={store.zoom} />
            <g transform={`translate(60,80),scale(${store.zoom})`}>
                <path
                    d={store.path}
                    fill="#a6b2c0"
                    fillOpacity="0.2"
                    stroke="#a6b2c0"
                    strokeWidth={2}
                    style={{pointerEvents:'none'}}/>
                <g>
                    {store.commands.map((command) => {

                        return <Node
                            key={command.id}
                            command={command}/>;
                    })}
                </g>
            </g>
        </svg>
        );
    }
}



export default Command;
