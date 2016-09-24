import styles from './styles.scss';

import { axisBottom, axisLeft, axisTop, axisRight } from 'd3-axis';
import { scaleLinear } from 'd3-scale';
import * as d3 from 'd3-selection';

function formatTicks(value) {
    return value == 0 ? '' : `${value}px`;
}

class Axis extends React.Component {

    constructor (props) {
        super(props);

        this.setAxis = () => {
            let iWidth = window.innerWidth;
            let iHeight = window.innerHeight;
            let width = [0,iWidth];
            let height = [0,iHeight];

            this.scaleX = scaleLinear()
                .domain(width)
                .range(width);

            this.scaleY = scaleLinear()
                .domain(height)
                .range(height);

            this.xAxis = axisTop(this.scaleX)
                .ticks(iWidth/100)
                .tickFormat(formatTicks);
            this.yAxis = axisLeft(this.scaleY)
                .ticks(iHeight/100)
                .tickFormat(formatTicks);
        };

    }

    componentDidMount() {

        this.setAxis();

        let group = d3.select(this.refs.group);

        this.xAxisGroup = group.append('g')
            .attr('class', styles.axis)
            .attr('transform', 'translate(60,80)')
            .call(this.xAxis);

        this.yAxisGroup = group.append('g')
            .attr('class', styles.axis)
            .attr('transform', 'translate(60,80)')
            .call(this.yAxis);

        window.addEventListener('resize', () => {
            this.setAxis();
            this.xAxisGroup.call(this.xAxis);
            this.yAxisGroup.call(this.yAxis);

        });
    }

    shouldComponentUpdate() {
        return false;
    }

    // componentWillReceiveProps(nextProps) {
    // }

    render () {

        return <g ref="group"/>;
    }

}

export default Axis;