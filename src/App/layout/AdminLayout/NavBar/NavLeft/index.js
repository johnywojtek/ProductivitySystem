import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import windowSize from 'react-window-size';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import NavSearch from './NavSearch';
import Aux from '../../../../../hoc/_Aux';
import DEMO from '../../../../../store/constant';
import * as actionTypes from '../../../../../store/actions';
import ProgressBar from '../../../../components/ProgressBar';

class NavLeft extends Component {
    render() {
        let iconFullScreen = ['feather'];
        iconFullScreen = this.props.isFullScreen
            ? [...iconFullScreen, 'icon-minimize']
            : [...iconFullScreen, 'icon-maximize'];

        let navItemClass = ['nav-item'];
        if (this.props.windowWidth <= 575) {
            navItemClass = [...navItemClass, 'd-none'];
        }
        let dropdownRightAlign = false;
        if (this.props.rtlLayout) {
            dropdownRightAlign = true;
        }

        return (
            <Aux>
                <ul className="navbar-nav mr-auto">
                    <li>
                        <a
                            href={DEMO.BLANK_LINK}
                            className="full-screen"
                            onClick={this.props.onFullScreen}>
                            <i className={iconFullScreen.join(' ')} />
                        </a>
                    </li>
                    <li>
                        <ProgressBar
                            currentAmount={5}
                            maxAmount={25}
                            dateToEnd={'2020-06-06T12:34:52+02:00'}
                        />
                    </li>
                </ul>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isFullScreen: state.appState.isFullScreen,
        rtlLayout: state.appState.rtlLayout,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFullScreen: () => dispatch({ type: actionTypes.FULL_SCREEN }),
    };
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    firestoreConnect([
        {
            collection: 'users',
        },
    ])
)(windowSize(NavLeft));
