import styles from './root.scss';
import { render } from 'react-dom';
import { observer } from 'mobx-react';

import store from '../data/index';
import Command from './Command/index.jsx';
import Viewer from './Viewer/index.jsx';
import { Flex, Tile } from './Flex/index.jsx';

@observer
class Root extends React.Component {

    constructor(props) {
        super(props);

        this.commandList = [
            {name:'Move', type: 'M'},
            {name:'Line', type: 'L'},
            {name:'Quadratic', type: 'Q'},
            {name:'Bezier', type: 'C'},
            {name:'Arc', type: 'A'},
        ];

    }

    render() {

        let store = this.props.store;

        return <div>

            <h1>pathTweak</h1>

            <Flex>

                <Tile>
                    <Viewer store={store}/>

                    <div style={{
                        maxWidth: store.width
                    }}>{store.path}</div>
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
                        {store.state.closed ? 'Unclose' : 'Close'}
                    </button>
                    <button onClick={::store.clear}>
                        Clear
                    </button>

                    

                    {store.commands.map((command) => {
                        return <Command key={command.id} data={command}/>;
                    })}
                </Tile>

            </Flex>


        {/*
            fill stroke stroke-width
            /#M0,0 (parser)
            h/v path info ??
        */}

        </div>;
    }
}



render(<Root store={store}/>, document.querySelector('#root'));