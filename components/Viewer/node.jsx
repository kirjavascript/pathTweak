import { observer } from 'mobx-react';
import {DraggableCore} from 'react-draggable';
import Menu from './menu.jsx';
import styles from './styles.scss';

function onStart(e) {
    e.preventDefault();
}

@observer
class Node extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuActive: false
        };

        let command = this.props.command;

        this.onDrag = (e, dragEvent) => {
            e.preventDefault();

            if (command.type == 'Z') {
                return;
            }

            if (command.type != 'V') {
                command.x += dragEvent.deltaX;
            }
            if (command.type != 'H') {
                command.y += dragEvent.deltaY;
            }

            if (command.hasX1()) {
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

        this.openMenu = (e) => {
            e.preventDefault();
            this.setState({menuActive:true});
        };
        this.closeMenu = (e) => {
            this.setState({menuActive:false});
        };
    }

    render() {
        let command = this.props.command;

        let type = command.type;

        let { rotate } = command;

        let { x, y, x1, x2, y1, y2 } = command.snapTo();

        return (
            <g 
                onMouseEnter={command.select}
                onMouseLeave={this.closeMenu}
                className={styles.group}>

                <DraggableCore
                    onStart={onStart}
                    onDrag={this.onDrag}>
                    <circle
                        onContextMenu={this.openMenu}
                        cx={x}
                        cy={y}
                        r={9}
                        fill="#c06973"
                        fillOpacity={command.selected ? 0.6 : 0.3}
                        className={styles[type]}/>
                </DraggableCore>

                {(command.hasX1()) &&
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

                <Menu active={this.state.menuActive} data={command}/>
            </g>
        );
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

export default Node;