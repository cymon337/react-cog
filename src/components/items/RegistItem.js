import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    callMngRegistItemsAPI,
    callMngNextItemNoAPI
} from '../../apis/GalleryAPICalls';

function RegistItem() {
    console.log('log = ItemList rendering');


// 사용할 api 구조분해할당
    // 네비게이트 : url 주소로 이동
    const navigate = useNavigate();

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const galleryState = useSelector(state => state.galleryReducer);
    
    
//  component 내에서 관리할 state
    const [form, setForm] = useState({
        itemNo: 0,
    });

    const [image, setImage] = useState({
        tImg: null,
        fImg: null,
        bImg: null,
        dImg: null
    });
    const [imageUrl, setImageUrl] = useState({
        tUrl: null,
        fUrl: null,
        bUrl: null,
        dUrl: null
    });
    const tImgInput = useRef();
    const fImgInput = useRef();
    const bImgInput = useRef();
    const dImgInput = useRef();

    console.log('log = useState image');
    console.log(image);
    console.log('log = useState imageUrl');
    console.log(imageUrl);
    console.log('log = useState imageInput');
    console.log(tImgInput);

//  useDffect
    useEffect(() => {
        // 이미지 업로드시 미리보기 세팅
        if(image.tImg){
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if( result ){
                    setImageUrl({
                        ...imageUrl,
                        tUrl: result
                    });
                }
            }
            fileReader.readAsDataURL(image.tImg);
        }

        if(image.fImg){
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if( result ){
                    setImageUrl({
                        ...imageUrl,
                        fUrl: result
                    });
                }
            }
            fileReader.readAsDataURL(image.fImg);
        }

        if(image.bImg){
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if( result ){
                    setImageUrl({
                        ...imageUrl,
                        bUrl: result
                    });
                }
            }
            fileReader.readAsDataURL(image.bImg);
        }

        if(image.dImg){
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if( result ){
                    setImageUrl({
                        ...imageUrl,
                        dUrl: result
                    });
                }
            }
            fileReader.readAsDataURL(image.dImg);
        }
 
        
    },
    [image]);

    useEffect(() => {
        // next itemNo
        dispatch(callMngNextItemNoAPI());

    } // eslint-disable-next-line
    ,[]);

    useEffect(() => {

        if(galleryState.message === "admin01 nextItemNo 조회 성공 ") {
            setForm({
                ...form,
                itemNo: galleryState.data.nextItemNo
            });
        }

        if(galleryState.message === "admin01 관리자 갤러리 아이템 등록 성공 ") {                   
            
            alert('gallery-manager로 이동합니다.');
            navigate('/gallery-manager', { replace: true });
            window.location.reload();
        }
        
    } // eslint-disable-next-line
    ,[galleryState]);

//  event handler
    const onChangeImageUpload = (e) => {
        
        setImage({
            ...image,
            [e.target.name]: e.target.files[0]
        });
    };

    const onClickImageUpload = (e) => {
        console.log(e.target);
        switch (e.target.name) {
            case 'tImgInput':                
                tImgInput.current.click();
                break;
            case 'fImgInput':
                fImgInput.current.click();
                break;
            case 'bImgInput':
                bImgInput.current.click();
                break;
            case 'dImgInput':
                dImgInput.current.click();
                break;
        
            default:
                console.log('onClickImageUpload error');
                break;
        }
    }
     
    // form 데이터 세팅    
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };   

    // gallery-manager 돌아가기버튼
    const onClickBackHandler = () => {
        // 돌아가기 클릭시 gallery-manager 페이지로 이동
        navigate("/gallery-manager", { replace: true })
    }

    // 아이템 등록
    const onClickRegistItemHandler = () => {

        console.log('[ItemRegistration] onClickRegistItemHandler');

        const formData = new FormData();        

        if(!!image.tImg && !!image.fImg && !!image.bImg && !!image.dImg){
            formData.append("itemNo", form.itemNo);
            formData.append("tImg", image.tImg);
            formData.append("fImg", image.fImg);
            formData.append("bImg", image.bImg);
            formData.append("dImg", image.dImg);
        }else{
            return alert('이미지를 모두 업로드해주세요!');
        }

        dispatch(callMngRegistItemsAPI({	// 상품 상세 정보 조회
            form: formData
        }));        

    }


    return (
        <div className=''>
            <h1>RegistItem {form.nextItemNo} </h1>
            <br></br>
            
            <div className='regist-item'>

                <label name='nextItemNo'>nextItemNo</label>
                <input
                    type='text'
                    name='nextItemNo'
                    value={ form.itemNo }
                    disabled
                />

            {/* === Thumbnail Image === */}
                <div className='uploading-image'>
                    { imageUrl.tUrl && <img 
                        className='item-image'
                        src={ imageUrl.tUrl } 
                        alt="preview"
                    />}
                    
                    <input                
                        style={ { display: 'none' }}
                        type="file"
                        name='tImg' 
                        accept='image/jpg,image/png,image/jpeg,image/gif'
                        onChange={ onChangeImageUpload }
                        ref={ tImgInput }
                    />
                    
                    <button 
                        className='item-image-button'
                        name='tImgInput'
                        onClick={ onClickImageUpload } 
                    >
                        T 이미지 업로드
                    </button>
                </div>
            {/* === Front Image === */}
                <div className='uploading-image'>
                    { imageUrl.fUrl && <img 
                        className='item-image'
                        src={ imageUrl.fUrl } 
                        alt="preview"
                    />}
                    
                    <input                
                        style={ { display: 'none' }}
                        type="file"
                        name='fImg' 
                        accept='image/jpg,image/png,image/jpeg,image/gif'
                        onChange={ onChangeImageUpload }
                        ref={ fImgInput }
                    />
                    
                    <button 
                        className='item-image-button'
                        name='fImgInput'
                        onClick={ onClickImageUpload } 
                    >
                        F 이미지 업로드
                    </button>
                </div>

            {/* === Back Image === */}
                <div className='uploading-image'>
                    { imageUrl.bUrl && <img 
                        className='item-image'
                        src={ imageUrl.bUrl } 
                        alt="preview"
                    />}
                    
                    <input                
                        style={ { display: 'none' }}
                        type="file"
                        name='bImg' 
                        accept='image/jpg,image/png,image/jpeg,image/gif'
                        onChange={ onChangeImageUpload }
                        ref={ bImgInput }
                    />
                    
                    <button 
                        className='item-image-button'
                        name='bImgInput'
                        onClick={ onClickImageUpload } 
                    >
                        B 이미지 업로드
                    </button>
                </div>
            {/* === Detail Image === */}
                <div className='uploading-image'>
                    { imageUrl.dUrl && <img 
                        className='item-image'
                        src={ imageUrl.dUrl } 
                        alt="preview"
                    />}
                    
                    <input                
                        style={ { display: 'none' }}
                        type="file"
                        name='dImg' 
                        accept='image/jpg,image/png,image/jpeg,image/gif'
                        onChange={ onChangeImageUpload }
                        ref={ dImgInput }
                    />
                    
                    <button 
                        className='item-image-button'
                        name='dImgInput'
                        onClick={ onClickImageUpload } 
                    >
                        D 이미지 업로드
                    </button>
                </div>               
            </div>

            <br></br>
            <button       
                onClick={ onClickRegistItemHandler }             
            >
                아이템 등록
            </button>

            <br></br>
            <button
                style={ { border: 'none', margin: 0, fontSize: '10px', height: '10px' } }
                onClick = { onClickBackHandler }
            >
                돌아가기
            </button>
        </div>
    );
}

export default RegistItem;