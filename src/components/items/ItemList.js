import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { 
    callSelectItemsAPI,
    callMngSelectItemsAPI
} from '../../apis/GalleryAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';
import './ItemList.css';


function ItemList() {
    console.log('log = ItemList rendering');

//필요기능선언
    // url 이동을 위한 네비게이트 선언
    const navigate = useNavigate();
    // url 주소 이용
    const loaction = useLocation();
    console.log('location url = ' + loaction.pathname);
    // redux 이용 dispatcher selector 선언
    const dispatch = useDispatch();
    const getItems = useSelector(state => state.galleryReducer.data);

    // 로컬스토리지 토큰 불러오기
    const isLogin = window.localStorage.getItem('accessToken');    // Local Storage 에 token 정보 확인
    let decoded = null;

    
    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.auth[0];
    }

// useEffect 를 이용한 component logic 처리
    useEffect(() => {

        if(decoded === 'ADMIN' && loaction.pathname === '/gallery-manager/items') {
            dispatch(callMngSelectItemsAPI());
        } else {
            dispatch(callSelectItemsAPI());
        }       
        
        return console.log('');
        
    } // eslint-disable-next-line
    ,[]);

    console.log(Array.isArray(getItems));

    const onClickProductHandler = (itemNo) => { 
        if (loaction.pathname === '/gallery/items') {
            navigate(`/gallery/items/${itemNo}`, { replace: true });
        } else if (loaction.pathname === '/gallery-manager/items' && decoded === 'ADMIN') {
            navigate(`/gallery-manager/items/${itemNo}`, { replace: true });
        }
    }

    return (
        <div className='item-list'>
            { 
                Array.isArray(getItems) && getItems.map((item) => (                    
                    <div 
                        className='item' 
                        key={item.itemNo}
                        onClick={ () => onClickProductHandler(item.itemNo) }
                    >
                        <img src={ `${item.timgPath}` } alt="이미지확인!" />
                        <input type='hidden' id='itemNo' value={item.itemNo}/>
                        <input type='hidden' id='itemRegDate' value={item.itemRegDate}/>
                        <input type='hidden' id='itemStatus' value={item.itemStatus}/>
                    </div>                  
                ))               
            }
        </div>
    );
}

export default ItemList;
