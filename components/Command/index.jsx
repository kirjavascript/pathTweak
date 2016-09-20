import { observer } from 'mobx-react';

import store from '../../data/index';

@observer
class Command extends React.Component {
    constructor(props) {
        super(props);

        let data = this.props.data;

        this.setX = (e) => {
            data.x = +e.target.value;
        };
        this.setY = (e) => {
            data.y = +e.target.value;
        };

        this.set1X = (e) => {
            data.c1x = +e.target.value;
        };
        this.set1Y = (e) => {
            data.c1y = +e.target.value;
        };

        this.set2X = (e) => {
            data.c2x = +e.target.value;
        };
        this.set2Y = (e) => {
            data.c2y = +e.target.value;
        };

        this.delete = () => {
            store.delete(data.id);
        };
        this.up = () => {
            store.up(data.id);
        };
        this.down = () => {
            store.down(data.id);
        };

        this.toggleSweep = () => {
            data.sweep = +(!data.sweep);
        };

        this.toggleLarge = () => {
            data.large = +(!data.large);
        };

        this.rotate = (e) => {
            data.rotate = +e.target.value;
        };
    }

    render() {
        let data = this.props.data;
        let type = data.type;

        let { x, y, c1x, c2x, c1y, c2y } = data.snapTo();

        return <div 
            onMouseEnter={data.select} 
            style={{
                opacity: data.selected ? 1 : 0.7,
            }}>

        <h2>
            {type}
        </h2>
        
        X <input type="text" value={x} onChange={this.setX}/>
        Y <input type="text" value={y} onChange={this.setY}/>

        {(type == 'C' || type == 'Q' || type == 'A') &&
            <span>
                1X <input type="text" value={c1x} onChange={this.set1X}/>
                1Y <input type="text" value={c1y} onChange={this.set1Y}/>
            </span>
        }

        {(type == 'C') &&
            <span>
                2X <input type="text" value={c2x} onChange={this.set2X}/>
                2Y <input type="text" value={c2y} onChange={this.set2Y}/>
            </span>
        }

        {(type == 'A') &&
            <span>
                rotate <input type="text" value={data.rotate} onChange={this.rotate}/>
                <button onClick={this.toggleSweep}>{data.sweep?'Clockwise':'Anti Clockwise'}</button>
                <button onClick={this.toggleLarge}>{data.large?'Large':'Small'}</button>
            </span>
        }

        

        <button onClick={this.up}>Up</button>
        <button onClick={this.down}>Down</button>

        <button onClick={this.delete}>Delete</button>
    </div>;
    }
}

export default Command;