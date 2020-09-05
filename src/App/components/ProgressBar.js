import React from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const Container = styled.div`
    width: 100%;
    height: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Label = styled.p`
    font-size: 12px;
    margin: 0;
    color: #000;
    line-height: 16px;
`;
const Main = styled.div`
    border: 1px solid #000;
    display: flex;
    width: 500px;
    display: flex;
`;
const Item = styled.div`
    width: ${({ maxAmount }) => 500 / maxAmount}px;
    height: 13px;
    border-left: 1px solid black;
    border-right: 1px solid black;
    font-size: 9px;
    font-weight: 900;
    display: flex;
    align-items: center;
    justify-content: center;
    ${({ isDone }) =>
        isDone &&
        css`
            border-left: 1px solid #ffd700;
            border-right: 1px solid #ffd700;
            background-color: #ffd700;
        `}
`;
const ProgressBar = ({ user: userInArr }) => {
    if (userInArr) {
        var [user] = userInArr;
    }
    return (
        <Container>
            {user ? (
                <>
                    <Label>
                        {`Muszę wykonać najpóźniej do ${moment(
                            user.endDate
                        ).format('DD/MM')}`}
                    </Label>
                    <Main>
                        {Array.from({ length: user.goalAmountIZG }).map(
                            (item, index) => (
                                <Item
                                    key={index}
                                    maxAmount={user.goalAmountIZG}
                                    isDone={index + 1 <= user.currentAmountIZG}>
                                    {index + 1}
                                </Item>
                            )
                        )}
                    </Main>
                </>
            ) : (
                'ładowanie'
            )}
        </Container>
    );
};
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        user: state.firestore.ordered.users,
    };
};
export default compose(
    connect(
        mapStateToProps,
        {}
    ),
    firestoreConnect((props) => {
        if (!props.auth.uid) return [];
        return [{ collection: 'users', doc: props.auth.uid }];
    })
)(ProgressBar);
