import { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from "react-redux";
import './MemberInfo.css';
import { callGetMemberAPI } from '../../apis/MemberAPICalls';
import { callUpdateProfileAPI } from '../../apis/MypageAPICalls';


function MemberInfo() {
    console.log('*** rendering = MemberInfo');

//필요기능선언
    // url 이동을 위한 네비게이트 선언

    // redux 이용 dispatcher selector 선언
    const dispatch = useDispatch();
    const loginMember = useSelector(state => state.memberReducer);
    
//  component 내에서 관리할 state
    const [form, setForm] = useState({
        memberId: '',
        memberPwd: '',
        memberEmail: '',
        memberMobile: ''
    });
    const [ inputState, setInputState] = useState(false)

    useEffect(() => {
        console.log('===== useEffect =====');
        dispatch(callGetMemberAPI());
    }, // eslint-disable-next-line
    []);

    useEffect(() => {        
        if(loginMember.data !== undefined) {
            setForm({
                memberId: loginMember.data.memberId,
                memberEmail: loginMember.data.memberEmail,
                memberMobile: loginMember.data.memberMobile
            });
            console.log('set');
        }
    }, // eslint-disable-next-line
    [loginMember]);



//  event handler
    //input 변화값 저장    
    const onChangeHandler = (e) => {
        const event = e;
        console.log(event);
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

    // 회원정보변경 버튼 클릭 : 입력값으로 가입하기 위한 데이터 전달    
    const onClickUpdateInfoHandler = () => {
        if(inputState === true){
            dispatch(callUpdateProfileAPI({
                form: form
            }));
        } else {
            alert('가입정보를 모두 입력해주세요!')
        }        
    }

    // 비밀번호변경 버튼 클릭
    const onClickChangePwdHandler = () => {
        if(inputState === true){
            // dispatch(callSignUpAPI({
            //     form: form
            // }));
        } else {
            alert('가입정보를 모두 입력해주세요!')
        }        
    }

    

    return (
        <div className='body-form'>
            <label>ID</label>
            <input 
                type="text" 
                name="memberId"
                placeholder="아이디" 
                autoComplete='off'
                disabled
                value={ form.memberId }
            />

            <label>PWD</label>
            <input 
                type="password"
                name="memberPwd" 
                placeholder="패스워드" 
                autoComplete='off'
                onChange={ onChangeHandler }
                // value={ form.memberPwd }
            />

            <label>Email</label>
            <input 
                type="text" 
                name="memberEmail"
                placeholder="이메일" 
                autoComplete='off'
                onChange={ onChangeHandler }
                value={ form.memberEmail }
            />

            <label>Mobile</label>
            <input 
                type="text" 
                name="memberMobile"
                placeholder="모바일번호" 
                autoComplete='off'
                onChange={ onChangeHandler }
                value={ form.memberMobile }
            />

            <br></br>

            <button
                style={ { border: 'none', margin: 0, fontSize: '10px', height: '10px' } }
                onClick = { onClickUpdateInfoHandler }
            >
                회원정보수정
            </button>

            <br></br>

            <button
                style={ { border: 'none', margin: 0, fontSize: '10px', height: '10px' } }
                onClick = { onClickChangePwdHandler }
            >
                비밀번호변경
            </button>

        </div>
    )
}

export default MemberInfo;