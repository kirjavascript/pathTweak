import styles from './root.scss';
import { render } from 'react-dom';
import { observer } from 'mobx-react';

import store from '../data/index';
import Command from './Command/index.jsx';
import Viewer from './Viewer/index.jsx';
import ComputedPath from './ComputedPath/index.jsx';
import TimeTravel from './TimeTravel/index.jsx';
import { Flex, Tile, Colour, AbsPos, Icon } from './UI/index.jsx';

{/*
    force snap to grid on state change??
    lowercase output
    add S/T Z in middle of path?
    // freehand draw!

    
    <g> rotate/etc </g> 
    url shortener api thingy save icon?
    README? ever need to makea  quick path - right click explain
    right click delete / hover stats
    one command at a time
    clear icon / close unclose

    https://upload.wikimedia.org/wikipedia/commons/4/42/Love_Heart_SVG.svg
*/}

@observer
class Root extends React.Component {

    constructor(props) {
        super(props);

        this.commandList = [
            {name:'move', type: 'M'},
            {name:'line', type: 'L'},
            {name:'horizontal', type: 'H'},
            {name:'vertical', type: 'V'},
            {name:'quadratic', type: 'Q'},
            {name:'bezier', type: 'C'},
            {name:'arc', type: 'A'},
        ];

    }

    render() {

        let store = this.props.store;

        return <div>

            <Viewer store={store}/>

            <h1>&lt;<Colour is="red">pathTweak</Colour>/&gt;</h1>

            <AbsPos pos="-1 0 10 0" align="center">
                <ComputedPath store={store}/>
            </AbsPos>

            <AbsPos pos="5 5 -1 -1">
                <TimeTravel/>
            </AbsPos>

            <AbsPos pos="100 10 -1 -1">

                {this.commandList.map((command, i) => {
                    return <Icon 
                        key={i}
                        name={command.name}
                        onClick={store.add.bind(store, command.type)}/>;
                })}
                <Icon 
                    name={store.closed ? 'unclose' : 'close'}
                    onClick={::store.closePath}/>
                <Icon 
                    name="clear"
                    onClick={::store.clear}/>

                <a href="http://github.com/kirjavascript/pathTweak" target="_blank">
                    <Icon name="github" onClick={this.github}/>
                </a>
                <a href="http://kirjava.xyz" target="_blank">
                    <Icon name="heart" onClick={this.heart}/>
                </a>

            </AbsPos>


            <div style={{display:'none'}}>

            <Flex>

                <Tile>

                    

                </Tile>

                <Tile>

                    Snap To: 
                    <input type="text" value={store.grid} onChange={::store.setGrid}/>



                    <button onClick={::store.closePath}>
                        
                    </button>
                    <button>
                        Clear
                    </button>

                    {store.commands.map((command) => {
                        return <Command key={command.id} data={command}/>;
                    })}
                </Tile>

            </Flex>

            </div>
        </div>;
    }
}



render(<Root store={store}/>, document.querySelector('#root'));