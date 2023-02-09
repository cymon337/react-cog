import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const PUT_PROFILE = 'mypage/PUT_PROFILE';
export const POST_PASSWORD = 'mypage/POST_PASSWORD';
export const PUT_PASSWORD = 'mypage/POST_PASSWORD';
export const initializer = 'mypage/INITIALIZER';
// eslint-disable-next-line
const actions = createActions({
    [PUT_PROFILE]: () => {},
    [POST_PASSWORD]: () => {},
    [PUT_PASSWORD]: () => {},
    [initializer]: () => {}
});

/* 리듀서 */
const mypageReducer = handleActions(
    {
        [PUT_PROFILE]: (state, { payload }) => {
            
            return payload;
        },
        [POST_PASSWORD]: (state, { payload }) => {
            
            return payload;
        },
        [PUT_PASSWORD]: (state, { payload }) => {
            
            return payload;
        },
        [initializer]: (state, { payload }) => {
            
            return payload;
        }

    },
    initialState
);

export default mypageReducer;