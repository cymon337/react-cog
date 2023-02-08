
import { 
    PUT_PROFILE
} from '../modules/MypageModule';

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
        
        if(result.status === 201){
            dispatch({ type: PUT_PROFILE,  payload: result });
        }        
    };
}