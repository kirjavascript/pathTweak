import {DraggableCore} from 'react-draggable';
import { observer } from 'mobx-react';

const Command = (props) => {

    let store = props.store;

    return <svg xmlns="http://www.w3.org/2000/svg" width={store.width} height={store.height}>
        <rect x="0" y="0"  width={store.width} height={store.height} fill="none" stroke="black"/>
        <g>
            {store.commands.map((command) => {

                return <Node 
                    key={command.id}
                    command={command}/>;
            })}
        </g>    

        <path
            d={store.path}
            fill={store.fill}
            fillOpacity="0.2"
            stroke={store.stroke}
            strokeWidth={store.strokeWidth}
            style={{pointerEvents:'none'}}/>
    </svg>;

};

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
            command.x += dragEvent.deltaX;
            command.y += dragEvent.deltaY;
            if (command.type == 'C' || command.type == 'Q' || command.type == 'A') {
                this.onDragC1(e, dragEvent);
            }
            if (command.type == 'C') {
                this.onDragC2(e, dragEvent);
            }

        };

        this.onDragC1 = (e, dragEvent) => {
            e.preventDefault();
            command.c1x += dragEvent.deltaX;
            command.c1y += dragEvent.deltaY;
        };

        this.onDragC2 = (e, dragEvent) => {
            e.preventDefault();
            command.c2x += dragEvent.deltaX;
            command.c2y += dragEvent.deltaY;
        };

    }

    render() {
        let command = this.props.command;

        return <g>
            <DraggableCore
                onStart={onStart}
                onDrag={this.onDrag}
                disabled={false}>
                <circle 
                    onMouseEnter={command.select}
                    cx={command.x}
                    cy={command.y}
                    r={10}
                    fill="#f33"
                    fillOpacity={command.selected ? '0.5' : '0'}/>
            </DraggableCore>
                {(command.type == 'C' || command.type == 'Q' || command.type == 'A') &&
                    <Adjust 
                        drag={this.onDragC1}
                        x={command.x}
                        y={command.y}
                        cx={command.c1x}
                        cy={command.c1y} />
                }
                {(command.type == 'C') &&
                    <Adjust 
                        drag={this.onDragC2}
                        x={command.x}
                        y={command.y}
                        cx={command.c2x}
                        cy={command.c2y} />
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
                fill="#39f"
                fillOpacity="1"/>
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