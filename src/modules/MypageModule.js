import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const PUT_PROFILE = 'member/PUT_PROFILE';
// eslint-disable-next-line
const actions = createActions({
    [PUT_PROFILE]: () => {}
});

/* 리듀서 */
const mypageReducer = handleActions(
    {
        [PUT_PROFILE]: (state, { payload }) => {
            
            return payload;
        }

    },
    initialState
);

export default mypageReducer;