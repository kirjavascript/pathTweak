import styles from './root.scss';
import { render } from 'react-dom';
import { observer } from 'mobx-react';

import store from '../data/index';
import Commands from './Commands/index.jsx';
import Viewer from './Viewer/index.jsx';
import ComputedPath from './ComputedPath/index.jsx';
import TimeTravel from './TimeTravel/index.jsx';
import { Flex, Tile, Colour, AbsPos, Icon } from './UI/index.jsx';

{/*
    electron
    serialize to localstorage
    lowercase output
    select multiple (d3-brush?)
    // freehand draw!
    add S/T Z in middle of path?
    force snap to grid on state change??

    README? ever need to makea  quick path - right click explain
    #M300,300H600Q650,300 650,350V400Q650,450 600,450H300z
    
    add node between
    url shortener api thingy save icon?http://stackoverflow.com/questions/35544698/generate-tinyurl-with-client-side-javascript-need-cors-workaround
    <g> rotate/etc </g> 
    keyboard controls
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
            {name:'close', type: 'Z'},
        ];

    }

    render() {

        let store = this.props.store;

        return <div>

            <Viewer store={store}/>

            <h1>&lt;<Colour is="red">pathTweak</Colour>/&gt;</h1>

            <AbsPos pos="58 -1 -1 0">
                &nbsp;SnapTo
                <input 
                    className={styles.snapTo}
                    type="text"
                    value={store.grid}
                    onChange={::store.setGrid}/>
            </AbsPos>

            <AbsPos pos="6 -1 -1 230">
                <Commands commands={store.commands} />
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
                    name="clear"
                    onClick={::store.clear}/>

                <a href="http://github.com/kirjavascript/pathTweak" target="_blank">
                    <Icon name="github" onClick={this.github}/>
                </a>
                <a href="http://kirjava.xyz" target="_blank">
                    <Icon name="heart" onClick={this.heart}/>
                </a>

            </AbsPos>

            <AbsPos pos="-1 0 20 0" align="center">
                <ComputedPath store={store}/>
            </AbsPos>

        </div>;
    }
}



render(<Root store={store}/>, document.querySelector('#root'));