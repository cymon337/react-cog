
import { 
    PUT_PROFILE,
    POST_PASSWORD,
    PUT_PASSWORD,
    initializer
} from '../modules/MypageModule';

export const initializerAPI = () => {

    return (dispatch) => {
        console.log('[MypageAPICalls] initializerAPI : initialize mypageReducer');

        dispatch({ type: initializer,  payload: []});

    }    
}

export const callUpdateProfileAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/api/v1/mypage/member-info/profile`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body: JSON.stringify({                
                memberEmail: form.memberEmail,
                memberMobile: form.memberMobile                
            })
        })
        .then(response => response.json())

        console.log('[MypageAPICalls] callUpdateProfileAPI RESULT : ', result);  

        alert(result.message);   
        
        if(result.status === 200){
            dispatch({ type: PUT_PROFILE,  payload: result });
        }        
    };
}

export const callUpdatePasswordAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/api/v1/mypage/member-info/password`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 
            },
            body: JSON.stringify({                
                updatePwd: form.memberPwd,               
            })
        })
        .then(response => response.json())

        console.log('[MypageAPICalls] callUpdatePasswordAPI RESULT : ', result);  

        alert(result.message);   
        
        if(result.status === 200){
            dispatch({ type: PUT_PASSWORD,  payload: result });
        }        
    };
}

export const callcheckPasswordAPI = (checkPwd) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/api/v1/mypage/member-info/password`;

    return (
        async (dispatch, getState) => {

            const result = await fetch(requestURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 
                },
                body: JSON.stringify({                
                    checkPwd: checkPwd           
                })
            })
            .then(response => response.json())

            console.log('[MypageAPICalls] callcheckPasswordAPI RESULT : ', result);  

            alert(result.message);   
            
            if(result.status === 200){
                dispatch({ type: POST_PASSWORD,  payload: result });
            }else{
                dispatch({ type: POST_PASSWORD,  payload: result });
            }
        }
    );
}
