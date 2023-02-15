import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { 
    callSelectItemInfoAPI,
    callMngUpdateItemsAPI
} from '../../apis/GalleryAPICalls';


function UpdateItem() {
    
    // Using url parameter
    const params = useParams();
    // for redux
    const dispatch = useDispatch();
    const galleryState = useSelector(state => state.galleryReducer);
    // useRef for event
    const tImgInput = useRef();
    const fImgInput = useRef();
    const bImgInput = useRef();
    const dImgInput = useRef();

    //  component 내에서 관리할 state
    const [form, setForm] = useState({
        itemNo: params.itemNo,
        itemRegDate: '',
        itemStatus: '',
        tImgPath: '',
        fImgPath: '',
        bImgPath: '',
        dImgPath: '',
        tImg: null,
        fImg: null,
        bImg: null,
        dImg: null
    });
    const [isTure, setIsTrue] = useState(true);
    const [uploadFileName, setUploadFileName] = useState({
        tImg: '',
        fImg: '',
        bImg: '',
        dImg: ''
    });

    useEffect(() => {
        dispatch(callSelectItemInfoAPI({
            itemNo : params.itemNo
        }))

    }, // eslint-disable-next-line
    [])
    useEffect(() => {
        if (galleryState.message === `${form.itemNo}번 아이템 조회 성공`) {
            setForm({
                ...form,
                itemNo: galleryState.data.itemNo,
                itemRegDate: galleryState.data.itemRegDate,
                itemStatus: galleryState.data.itemStatus,
                tImgPath: galleryState.data.timgPath,
                fImgPath: galleryState.data.fimgPath,
                bImgPath: galleryState.data.bimgPath,
                dImgPath: galleryState.data.dimgPath
            })
            
        }
        
    }, // eslint-disable-next-line
    [galleryState])

    useEffect(() => {
        // 이미지 업로드시 미리보기 세팅
        if(form.tImg && form.tImg.name !== uploadFileName.tImg){
            setUploadFileName({
                ...uploadFileName,
                tImg: form.tImg.name
            });
            
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if( result ){
                    setForm({
                        ...form,
                        tImgPath: result
                    });

                }
            }
            fileReader.readAsDataURL(form.tImg);

            console.log('set tImg');
        }

        if(form.fImg  && form.fImg.name !== uploadFileName.fImg){     
            setUploadFileName({
                ...uploadFileName,
                fImg: form.fImg.name
            });       
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if( result ){
                    setForm({
                        ...form,
                        fImgPath: result
                    });
                }
            }
            fileReader.readAsDataURL(form.fImg);
            console.log('set fImg');
        }

        if(form.bImg && form.bImg.name !== uploadFileName.bImg){     
            setUploadFileName({
                ...uploadFileName,
                bImg: form.bImg.name
            });    
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if( result ){
                    setForm({
                        ...form,
                        bImgPath: result
                    });
                }
            }
            fileReader.readAsDataURL(form.bImg);
            console.log('set bImg');
        }

        if(form.dImg && form.dImg.name !== uploadFileName.dImg){     
            setUploadFileName({
                ...uploadFileName,
                dImg: form.dImg.name
            });    
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if( result ){
                    setForm({
                        ...form,
                        dImgPath: result
                    });
                }
            }
            fileReader.readAsDataURL(form.dImg);
            console.log('set dImg');
        }
    },
    [form]);

// event handler
    const updateItemOnCilckHandler = () => {
        if(isTure === true) {
            setIsTrue(false)
        } else {
            setIsTrue(true)
        }
    }

    const deleteItemOnCilckHandler = () => {
        if(isTure === true) {
            setIsTrue(false)
        } else {
            setIsTrue(true)
        }
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onChangeImageUpload = (e) => {
        
        setForm({
            ...form,
            [e.target.name]: e.target.files[0]
        });
    };

    const onClickImageUpload = (e) => {
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

    const onClickUpdateItemHandler = () => {
        console.log('[ItemUpdate] onClickUpdateItemHandler');

        const formData = new FormData();
        formData.append("itemNo", form.itemNo);
        formData.append("itemStatus", form.itemStatus);
        
        if(form.tImg !== null) formData.append("tImg", form.tImg);
        
        if(form.fImg !== null) formData.append("fImg", form.fImg);
        
        if(form.bImg !== null) formData.append("bImg", form.bImg);
        
        if(form.dImg !== null) formData.append("dImg", form.dImg);
        
        dispatch(callMngUpdateItemsAPI({	// 아이템 업데이트
            form: formData
        }));        

    }

    return (
        <div className='body'>

            <button onClick={ updateItemOnCilckHandler }>
                update item
            </button>

            <button onClick={ deleteItemOnCilckHandler }>
                delete item
            </button>
            
            <div className='body-form'>
                    <label name="itemNo">itemNo</label>
                    <input
                        type='text'
                        name="itemNo"
                        disabled
                        value={form.itemNo}                        
                    />

                    <label name="itemRegDate">itemRegDate</label>
                    <input
                        type='text'
                        name="itemRegDate"
                        disabled
                        value={form.itemRegDate}
                    />

                    <label name="itemStatus">itemStatus</label>                    
                    <select
                        name="itemStatus"
                        onChange={ onChangeHandler }
                        value={ form.itemStatus }
                        disabled={isTure}
                    >
                        <option value='Y'>Y</option>
                        <option value='N'>N</option>
                    </select>
                {/* === Thumbnail Image === */}
                    <label name="tImg">tImg</label>
                    <img 
                        name="tImg"
                        className='item-image'
                        src={ form.tImgPath } 
                        
                        alt="preview"
                    />
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
                        disabled={isTure}
                    >
                        T 이미지 업로드
                    </button>
                {/* === Front Image === */}
                    <label name="fImg">fImg</label>
                    <img 
                        name="fImg"
                        className='item-image'
                        src={ form.fImgPath } 
                        alt="preview"
                    />
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
                        disabled={isTure}
                    >
                        F 이미지 업로드
                    </button>
                {/* === Back Image === */}
                    <label name="bImg">bImg</label>
                    <img 
                        name="bImg"
                        className='item-image'
                        src={ form.bImgPath } 
                        alt="preview"
                    />
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
                        disabled={isTure}
                    >
                        B 이미지 업로드
                    </button>
                {/* === Details Image === */}
                    <label name="dImg">dImg</label>
                    <img 
                        name="dImg"
                        className='item-image'
                        src={ form.dImgPath } 
                        alt="preview"
                    />
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
                        disabled={isTure}
                    >
                        D 이미지 업로드
                    </button>

                    {!isTure &&
                    <button 
                        className='item-image-button'
                        onClick={ onClickUpdateItemHandler }
                    >
                        업데이트!
                    </button>
                    }

                </div>
        </div>
    );
}

export default UpdateItem;