import styles from './root.scss';
import { render } from 'react-dom';
import { observer } from 'mobx-react';

import store from '../data/index';
import Command from './Command/index.jsx';
import Viewer from './Viewer/index.jsx';
import ComputedPath from './ComputedPath/index.jsx';
import TimeTravel from './TimeTravel/index.jsx';
import { Flex, Tile, Colour } from './UI/index.jsx';

{/*
    fill stroke stroke-width
    (calculate smallest int) <path
    force snap to grid on state change??
    lowercase output
    fix H/V UI, add S/T Z in middle of path?
    
    <g> rotate/etc </g> 
    icons on right for types of thing :)
    d3 axis?!
    // fullscreen path (!)

    load svg heart
*/}

@observer
class Root extends React.Component {

    constructor(props) {
        super(props);

        this.commandList = [
            {name:'Move', type: 'M'},
            {name:'Line', type: 'L'},
            // {name:'HLine', type: 'H'},
            // {name:'VLine', type: 'V'},
            {name:'Quadratic', type: 'Q'},
            {name:'Bezier', type: 'C'},
            {name:'Arc', type: 'A'},
        ];

    }

    render() {

        let store = this.props.store;

        return <div>

            <h1>&lt;<Colour is="red">pathTweak</Colour>/&gt;</h1>

            <TimeTravel/>

            <Flex>

                <Tile>

                    <Viewer store={store}/>
                    <ComputedPath store={store}/>

                </Tile>

                <Tile>

                    Snap To: 
                    <input type="text" value={store.grid} onChange={::store.setGrid}/>

                    {this.commandList.map((command, i) => {
                        return <button key={i} onClick={store.add.bind(store, command.type)}>
                            {command.name}
                        </button>;
                    })}

                    <button onClick={::store.closePath}>
                        {store.closed ? 'Unclose' : 'Close'}
                    </button>
                    <button onClick={::store.clear}>
                        Clear
                    </button>

                    {store.commands.map((command) => {
                        return <Command key={command.id} data={command}/>;
                    })}
                </Tile>

            </Flex>

        </div>;
    }
}



render(<Root store={store}/>, document.querySelector('#root'));