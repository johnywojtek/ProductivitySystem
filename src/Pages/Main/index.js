import React from 'react';
import styled from 'styled-components';
import Aux from '../../hoc/_Aux';
import Range from '../../App/components/Range';

class Dashboard extends React.Component {
    render() {
        return (
            <Aux>
                <Range color="109, 53%," title="Koncentracja">
                    {this.props.values}
                </Range>
                <Range color="211, 56%," title="Energia">
                    {this.props.values}
                </Range>
                <Range color="58, 87%," title="Spokój/Opanowanie">
                    {this.props.values}
                </Range>
                <Range color="0, 85%," title="Siła woli">
                    {this.props.values}
                </Range>
                <Range color="25, 100%," title="Samopoczucie">
                    {this.props.values}
                </Range>
            </Aux>
        );
    }
}

export default Dashboard;
