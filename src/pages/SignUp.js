import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { callSignUpAPI } from '../apis/MemberAPICalls'

function SignUp() {
// 사용할 api 구조분해할당
    // 네비게이트 : url 주소로 이동
    const navigate = useNavigate();

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);  // API 요청하여 가져온 loginMember 정보
    
//  component 내에서 관리할 state
    const [form, setForm] = useState({
        memberId: '',
        memberPwd: '',
        memberEmail: '',
        memberMobile: ''
    });
    const [ inputState, setInputState] = useState(false)

//  컴포넌트 로직 관리할 useEffect    
    useEffect(() => {
        if(member.status === 201){   // redux 의 state 불러와서 check log in 
            console.log("[Login] SignUp SUCCESS {}", member);
            navigate("/login", { replace: true })
        }
    }, // eslint-disable-next-line
    [member]);

//  event handler
    //input 변화값 저장    
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        if(form.memberId === '' || form.memberPwd === '' || form.memberEmail === '' || form.memberMobile === ''){
            console.log('input empty = setInputState(false)');
            setInputState(false)

        } else {
            console.log('input all info = setInputState(true)');
            setInputState(true)
        }
    };    
    // 메인페이지로 돌아가기버튼
    const onClickBackHandler = () => {
        // 돌아가기 클릭시 메인 페이지로 이동
        navigate("/", { replace: true })
    }
    // 회원가입 버튼 클릭 : 입력값으로 가입하기 위한 데이터 전달
    const onClickSignUpHandler = () => {
        if(inputState === true){
            dispatch(callSignUpAPI({
                form: form
            }));
        } else {
            alert('가입정보를 모두 입력해주세요!')
        }        
    }

    return (
        <div className='wrapper'>
            <div className='body-form'>
                <h1>회원가입</h1>
                <input 
                    type="text" 
                    name="memberId"
                    placeholder="아이디" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input 
                    type="password"
                    name="memberPwd" 
                    placeholder="패스워드" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input 
                    type="text" 
                    name="memberEmail"
                    placeholder="이메일" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input 
                    type="text" 
                    name="memberMobile"
                    placeholder="모바일번호" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <button
                    onClick = { onClickSignUpHandler }
                >   
                    회원가입
                </button>
                <button
                    style={ { border: 'none', margin: 0, fontSize: '10px', height: '10px' } }
                    onClick = { onClickBackHandler }
                >
                    돌아가기
                </button>
            </div>
        </div>
    );
}

export default SignUp;