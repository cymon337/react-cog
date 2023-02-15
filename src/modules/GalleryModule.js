import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_ITEMS = 'gallery/GET_ITEMS';
export const GET_ITEMINFO = 'gallery/GET_ITEMINFO';
export const GET_MNG_ITEMS = 'gallery/GET_MNG_ITEMS';
export const POST_MNG_ITEMS = 'gallery/GET_MNG_ITEMS';
export const PUT_MNG_ITEMS = 'gallery/PUT_MNG_ITEMS';
export const GET_MNG_NEXT_ITEMNO = 'gallery/GET_MNG_NEXT_ITEMNO';

// eslint-disable-next-line
const actions = createActions({
    [GET_ITEMS]: () => {},
    [GET_ITEMINFO]: () => {},
    [GET_MNG_ITEMS]: () => {},
    [POST_MNG_ITEMS]: () => {},
    [PUT_MNG_ITEMS]: () => {},
    [GET_MNG_NEXT_ITEMNO]: () => {}
});

/* 리듀서 */
const galleryReducer = handleActions(
    {
        [GET_ITEMS]: (state, { payload }) => {
            
            return payload;
        },
        [GET_ITEMINFO]: (state, { payload }) => {
            
            return payload;
        },
        [GET_MNG_ITEMS]: (state, { payload }) => {
            
            return payload;
        },
        [POST_MNG_ITEMS]: (state, { payload }) => {
            
            return payload;
        },
        [PUT_MNG_ITEMS]: (state, { payload }) => {
            
            return payload;
        },
        [GET_MNG_NEXT_ITEMNO]: (state, { payload }) => {
            
            return payload;
        }

    },
    initialState
);

export default galleryReducer;