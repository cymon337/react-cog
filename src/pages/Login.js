import LoginForm from '../components/form/LoginForm';
import googleImg from '../assets/icons/google.png';
import naverImg from '../assets/icons/naver.png';
import kakaoImg from '../assets/icons/kakao.png';
import signUpImg from '../assets/icons/account_circle.png';
import './Login.css';
import { Link } from 'react-router-dom';


function Login() {

    return(
        <div className='wrapper'>
            <div className='header'>
                <h1>Login</h1>
            </div>            
            <div className='body-form'>
                <LoginForm/>
            </div>
            <div className='body-button'>
                <div>
                    <h3>Sign Up Using</h3>
                    <img id='google-login' src={ googleImg } alt='login by google'/>
                    <img id='naver-login' src={ naverImg } alt='login by naver'/>
                    <img id='kakao-login' src={ kakaoImg } alt='login by kakao'/>
                </div>
                <div>
                    <Link to='/signup'>
                        <img id='sign-up' src={ signUpImg } alt='sign up'/>
                    </Link>
                    <h3>SIGN UP</h3>                    
                </div>
            </div>
        </div>
    )
}

export default Login;