
import { 
    GET_MEMBER
  , POST_LOGIN
  , POST_SIGNUP
} from '../modules/MemberModule';

export const callGetMemberAPI = () => {
                                // 환경변수 root.env 에 설정
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/api/v1/mypage/member-info`;

    return async (dispatch, getState) => {

        // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
        // 서버에서 cors 허용을 해주어야 함
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 
            }
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callGetMemberAPI RESULT : ', result);

        dispatch({ type: GET_MEMBER,  payload: result });
        
    };
}

// 로그인 API 로 form = { memberId:'id', memberPwd:'pwd'} 값 전달
export const callLoginAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/auth/login`;
    // dispatch: 상태값 수정 메소드 ,getState: 현재 스토어의 상태 반환
    return async (dispatch, getState) => {

        // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
        // 서버에서 cors 허용을 해주어야 함
        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Access-Control-Allow-Origin": "*"      
            },
            body: JSON.stringify({
                memberId: form.memberId,
                memberPwd: form.memberPwd
            })
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callLoginAPI RESULT : ', result);
        if(result.status === 200){
            // localStorage 에 엑세스토큰 저장
            window.localStorage.setItem('accessToken', result.data.accessToken);            
        }
        // MemberModule 의 POST_LOGIN 엑션 수행 result 값으로 변경
        dispatch({ type: POST_LOGIN,  payload: result });
        
    };
}


export const callLogoutAPI = () => {
    

    return async (dispatch, getState) => {            

        dispatch({ type: POST_LOGIN,  payload: '' });        
        console.log('[MemberAPICalls] callLogoutAPI RESULT : SUCCESS');
    };
}


export const callSignUpAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/auth/signup`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                memberId: form.memberId,
                memberPwd: form.memberPwd,
                memberEmail: form.memberEmail,
                memberMobile: form.memberMobile                
            })
        })
        .then(response => response.json())

        console.log('[MemberAPICalls] callSignUpAPI RESULT : ', result);        
        
        if(result.status === 201){
            dispatch({ type: POST_SIGNUP,  payload: result });
        }        
    };
}