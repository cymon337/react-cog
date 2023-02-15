import logoBtn from '../../assets/icons/logo_button.png';
import galleryBtn from '../../assets/icons/gallery_button.png';
import mypageBtn from '../../assets/icons/mypage_button.png';
// import menuBtn from '../../assets/icons/menu_button.png';
import loginBtn from '../../assets/icons/login_button.png';
import logoutBtn from '../../assets/icons/islogin.png';
import galleryMngBtn from '../../assets/icons/gallery_manager_button.png';
import adminLoginBtn from '../../assets/icons/admin_login_button.png';
import { NavLink, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import { callLogoutAPI } from '../../apis/MemberAPICalls';
import './Header.css';

function Header() {

//  사용할 api 구조분해할당 선언
    const navigate = useNavigate();


    // 리덕스를 이용하기 위한 디스패치
    const dispatch = useDispatch();
    // 로컬스토리지 토큰 불러오기
    const isLogin = window.localStorage.getItem('accessToken');    // Local Storage 에 token 정보 확인
    let decoded = null;

    
    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.auth[0];
    }

//  event handler
    const onClickLogoutHandler = () => {
        window.localStorage.removeItem('accessToken');  
        //로그아웃
        dispatch(callLogoutAPI());
        
        alert('Logout~!');
        navigate("/", { replace: true })
        window.location.reload();
    }

    return (
        <div className='header'>            
            <NavLink to="/" ><img className='button' id='logo' src={ logoBtn } alt='logo'/></NavLink>
            <NavLink to="/gallery" ><img className='button' id='gallery' src={ galleryBtn } alt='gallery'/></NavLink>
            { decoded ==="ADMIN" && <NavLink to="/gallery-manager" ><img className='button' id='gallery-manager' src={ galleryMngBtn } alt='gallery-manager'/></NavLink>}
            {/* <NavLink to="/" ><img className='button' id='menu' src={ menuBtn } alt='any menu'/></NavLink> */}
            

            {/* 로그인 상태에 따라 다른 컴포넌트 랜더링 */}
            { (isLogin == null || isLogin === undefined) ?
             <NavLink to="/login" ><img className='button' id='login' src={ loginBtn } alt='login'/></NavLink> :
             <>
                <NavLink to="/mypage" ><img className='button' id='myPage' src={ mypageBtn } alt='myPage'/></NavLink>
                { decoded ==="USER" && <img className='button' id='login' src={ logoutBtn } alt='login' onClick={ onClickLogoutHandler }/>}
                { decoded ==="ADMIN" && <img className='button' id='login' src={ adminLoginBtn } alt='login' onClick={ onClickLogoutHandler }/>}
             </> }
        </div>
    );
}

export default Header;