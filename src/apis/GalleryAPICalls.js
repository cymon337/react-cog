
import { 
    GET_ITEMS,
    GET_ITEMINFO,
    GET_MNG_ITEMS,    
    POST_MNG_ITEMS,
    PUT_MNG_ITEMS,
    GET_MNG_NEXT_ITEMNO
} from '../modules/GalleryModule';

// export const initializerAPI = () => {

//     return (dispatch) => {
//         console.log('[MypageAPICalls] initializerAPI : initialize mypageReducer');

//         dispatch({ type: initializer,  payload: []});

//     }    
// }

export const callSelectItemsAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/api/v1/gallery/items`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json())

        console.log('[GalleryAPICalls] callSelectItemsAPI RESULT : ', result);  

        alert(result.message);   
        
        if(result.status === 200){
            dispatch({ type: GET_ITEMS,  payload: result });
        }        
    };
}

export const callSelectItemInfoAPI = ({itemNo}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/api/v1/gallery/items/${itemNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json())

        console.log('[GalleryAPICalls] callSelectItemInfoAPI RESULT : ', result);
        
        if(result.status === 200){
            dispatch({ type: GET_ITEMINFO,  payload: result });
        }        
    };
}

export const callMngSelectItemsAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/api/v1/gallery-manager/items`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 
            }
        })
        .then(response => response.json())

        console.log('[GalleryAPICalls] callMngSelectItemsAPI RESULT : ', result);  

        alert(result.message);   
        
        if(result.status === 200){
            dispatch({ type: GET_MNG_ITEMS,  payload: result });
        }        
    };
}

export const callMngNextItemNoAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/api/v1/gallery-manager/items/nextItemNo`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 
            }
        })
        .then(response => response.json())

        console.log('[GalleryAPICalls] callMngNextItemNoAPI RESULT : ', result);  

        alert(result.message);   
        
        if(result.status === 200){
            dispatch({ type: GET_MNG_NEXT_ITEMNO,  payload: result });
        }        
    };
}

export const callMngRegistItemsAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/api/v1/gallery-manager/items`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body: form
        })
        .then(response => response.json())

        console.log('[GalleryAPICalls] callMngRegistItemsAPI RESULT : ', result);  

        alert(result.message);   
        
        if(result.status === 200){
            dispatch({ type: POST_MNG_ITEMS,  payload: result });
        }        
    };
}

export const callMngUpdateItemsAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/api/v1/gallery-manager/items`;
    console.log(form);
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body: form
        })
        .then(response => response.json())

        console.log('[GalleryAPICalls] callMngUpdateItemsAPI RESULT : ', result);  

        alert(result.message);   
        
        if(result.status === 200){
            dispatch({ type: PUT_MNG_ITEMS,  payload: result });
        }        
    };
}