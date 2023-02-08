import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from 'react-router-dom';
import { callLoginAPI } from '../../apis/MemberAPICalls'


function LoginForm() {

//필요기능선언
    // url 이동을 위한 네비게이트 선언
    const navigate = useNavigate();

    // redux 이용 dispatcher selector 선언
    const dispatch = useDispatch();
    const loginMember = useSelector(state => state.memberReducer);
    

// state 선언 컴포넌트 내부 사용
    // 폼 데이터 State 로 관리
    const [form, setForm] = useState({
        memberId: '',
        memberPwd: ''
    });

// useEffect 를 이용한 component logic 처리
    useEffect(() => {
            
        if(loginMember.status === 200){
            console.log("[Login] Login SUCCESS {}", loginMember);
            navigate("/", { replace: true });
        }

    } // eslint-disable-next-line
    ,[loginMember]); // loginMember 변화 감지


// 로그인 상태일 시 로그인페이지로 접근 방지
    if(loginMember.length > 0) {
        console.log("[Login] Login is already authenticated by the server");        
        return <Navigate to="/"/>
    }

// event handler

    // useState 에 input 변화값 저장
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // 로그인 버튼 클릭시 디스패처 실행 및 메인 페이지로 이동
    const onClickLoginHandler = () => { 
        dispatch(callLoginAPI({	// 로그인
            form: form
        }));
    }

    
    return (
        <div>
            <label>ID : </label>
            <input 
                    type="text" 
                    name='memberId'
                    placeholder="아이디" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />

            <br></br>

            <label>PASSWORD : </label>
            <input 
                    type="password"
                    name='memberPwd' 
                    placeholder="패스워드" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />

            <br></br>

            <button className ="button" onClick={ onClickLoginHandler }>로그인</button>
        </div>
    );
}

export default LoginForm;