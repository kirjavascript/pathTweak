import {DraggableCore} from 'react-draggable';
import { observer } from 'mobx-react';
import styles from './styles.scss';
import Axis from './axis.jsx';

const Command = observer((props) => {

    let store = props.store;

    return (
    <svg 
        className={styles.viewer}
        xmlns="http://www.w3.org/2000/svg">
        
        <Axis/>

        <g transform={'translate(60,80)'}>
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

});

function onStart(e) {
    e.preventDefault();
}

@observer
class Node extends React.Component {
    constructor(props) {
        super(props);

        let command = this.props.command;

        this.onDrag = (e, dragEvent) => {
            e.preventDefault();

            if (command.type != 'V') {
                command.x += dragEvent.deltaX;
            }
            if (command.type != 'H') {
                command.y += dragEvent.deltaY;
            }

            if (command.type == 'C' || command.type == 'Q' || command.type == 'A') {
                this.onDragC1(e, dragEvent);
            }
            if (command.type == 'C') {
                this.onDragC2(e, dragEvent);
            }

        };

        this.onDragC1 = (e, dragEvent) => {
            e.preventDefault();
            command.x1 += dragEvent.deltaX;
            command.y1 += dragEvent.deltaY;
        };

        this.onDragC2 = (e, dragEvent) => {
            e.preventDefault();
            command.x2 += dragEvent.deltaX;
            command.y2 += dragEvent.deltaY;
        };
    }

    render() {
        let command = this.props.command;

        let type = command.type;

        let { rotate } = command;

        let { x, y, x1, x2, y1, y2 } = command.snapTo();

        if (type == 'H') {
            y = command.getHY();
        }
        else if (type == 'V') {
            x = command.getVX();
        }

        return <g onMouseEnter={command.select} className={styles.group}>
            <DraggableCore
                onStart={onStart}
                onDrag={this.onDrag}>
                <circle 
                    cx={x}
                    cy={y}
                    r={9}
                    fill="#c06973"
                    fillOpacity={command.selected ? 0.6 : 0.3}
                    className={styles[type]}/>
            </DraggableCore>
                {(type == 'C' || type == 'Q' || type == 'A') &&
                    <Adjust 
                        drag={this.onDragC1}
                        x={x}
                        y={y}
                        cx={x1}
                        cy={y1} />
                }
                {(type == 'C') &&
                    <Adjust 
                        drag={this.onDragC2}
                        x={x}
                        y={y}
                        cx={x2}
                        cy={y2} />
                }
        </g>;
    }
}

const Adjust = (props) => {
    return <g>
        <DraggableCore
            onStart={onStart}
            onDrag={props.drag}
            disabled={false}>
            <circle 
                cx={props.cx}
                cy={props.cy}
                r={5}
                fill="#c679dd"
                fillOpacity="1"
                className={styles.move}/>
        </DraggableCore>
        <line 
            x1={props.x}
            x2={props.cx}
            y1={props.y}
            y2={props.cy}
            stroke="grey"
            strokeWidth="1"/>
    </g>;
};

export default Command;