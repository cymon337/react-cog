import { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from "react-redux";
import { useNavigate } from 'react-router-dom';
import './MemberInfo.css';
import { callGetMemberAPI } from '../../apis/MemberAPICalls';
import { 
    callUpdateProfileAPI, 
    callcheckPasswordAPI,
    callUpdatePasswordAPI,
    initializerAPI
} from '../../apis/MypageAPICalls';


function MemberInfo() {
    console.log('*** rendering = MemberInfo');

//필요기능선언
    // url 이동을 위한 네비게이트 선언
    const navigate = useNavigate();
    // redux 이용 dispatcher selector 선언
    const dispatch = useDispatch();
    const loginMember = useSelector(state => state.memberReducer);
    const mypageMember = useSelector(state => state.mypageReducer);
    
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
        if(mypageMember.message === "비밀번호 변경 성공") {
            dispatch(initializerAPI());
        }
    }, // eslint-disable-next-line
    [mypageMember]);

    useEffect(() => {        
        if(loginMember.data !== undefined) {
            setForm({
                memberId: loginMember.data.memberId,
                memberEmail: loginMember.data.memberEmail,
                memberMobile: loginMember.data.memberMobile
            });
            console.log('set');
        } 

        if (loginMember.state === 401) {
            console.log('need login');
            navigate("/login", { replace: true })
        }
    }, // eslint-disable-next-line
    [loginMember, mypageMember]);


//  event handler
    //input 변화값 저장    
    const onChangeHandler = (e) => {
        const event = e;
        console.log(event);
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        if(form.memberId === '' || form.memberEmail === '' || form.memberMobile === ''){
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

    // 비밀번호확인 버튼 클릭
    const onClickCheckPwdHandler = () => {
        const checkPwd = prompt('[Check Password] 현재 비밀번호를 입력하세요!');

        console.log(checkPwd);      

        if(checkPwd !== ''){
            dispatch(callcheckPasswordAPI(checkPwd))
        } else {
            alert('현재 비밀번호를 입력하세요!')
        }          
    }

    // 비밀번호변경 버튼 클릭
    const onClickChangePwdHandler = () => {
        if(form.memberPwd !== ''){
            dispatch(callUpdatePasswordAPI({
                form: form
            }));

        } else {
            alert('변경할 패스워드를 입력해주세요!')
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
            { (mypageMember.message === '비밀번호 확인 성공') ?
            <input 
            type="password"
            name="memberPwd" 
            placeholder="변경할 비밀번호를 입력하세요" 
            autoComplete='off'
            onChange={ onChangeHandler }
            />:
            <input 
                type="password"
                name="memberPwd" 
                placeholder="비밀번호를 확인하세요" 
                autoComplete='off'
                disabled
            /> }
            

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
                onClick = { onClickCheckPwdHandler }
            >
                비밀번호확인
            </button>

            <br></br>

            { (mypageMember.message === '비밀번호 확인 성공') &&
            <button
                style={ { border: 'none', margin: 0, fontSize: '10px', height: '10px' } }
                onClick = { onClickChangePwdHandler }
            >
                비밀번호변경
            </button> }

        </div>
    )
}

export default MemberInfo;