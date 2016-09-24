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
            data.x1 = +e.target.value;
        };
        this.set1Y = (e) => {
            data.y1 = +e.target.value;
        };

        this.set2X = (e) => {
            data.x2 = +e.target.value;
        };
        this.set2Y = (e) => {
            data.y2 = +e.target.value;
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

        let { x, y, x1, x2, y1, y2 } = data.snapTo();

        return <div 
            onMouseEnter={data.select} 
            style={{
                opacity: data.selected ? 1 : 0.7,
            }}>

        <h2>
            {type}
        </h2>

        {type != 'V' && 
            <span>
                X 
                <input type="text" value={x} onChange={this.setX}/>
            </span>
        }

        {type != 'H' && 
            <span>
                Y 
                <input type="text" value={y} onChange={this.setY}/>
            </span>
        }

        {(type == 'C' || type == 'Q' || type == 'A') &&
            <span>
                1X <input type="text" value={x1} onChange={this.set1X}/>
                1Y <input type="text" value={y1} onChange={this.set1Y}/>
            </span>
        }

        {(type == 'C') &&
            <span>
                2X <input type="text" value={x2} onChange={this.set2X}/>
                2Y <input type="text" value={y2} onChange={this.set2Y}/>
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