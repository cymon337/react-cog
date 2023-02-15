import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { 
    callSelectItemInfoAPI
} from '../../apis/GalleryAPICalls';


function ItemDetails() {
    
    // Using url parameter
    const params = useParams();
    // for redux
    const dispatch = useDispatch();
    const galleryState = useSelector(state => state.galleryReducer);

    //  component 내에서 관리할 state
    const [form, setForm] = useState({
        itemNo: params.itemNo,
        itemRegDate: '',
        itemStatus: '',
        timgPath: '',
        fimgPath: '',
        bimgPath: '',
        dimgPath: ''
    });
    const [isTure, setIsTrue] = useState(true);


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
                timgPath: galleryState.data.timgPath,
                fimgPath: galleryState.data.fimgPath,
                bimgPath: galleryState.data.bimgPath,
                dimgPath: galleryState.data.dimgPath
            })
            
        }
        
    }, // eslint-disable-next-line
    [galleryState])

    return (
        <div className='body'>
            <h1>Item Details</h1>
            {/* === Thumbnail Image === */}
            <div className='body-form'>
                    <label name="itemNo">itemNo</label>
                    <input
                        type='text'
                        name="itemNo"
                        disabled={isTure}
                        value={form.itemNo}
                    />
                    <label name="itemRegDate">itemRegDate</label>
                    <input
                        type='text'
                        name="itemRegDate"
                        disabled={isTure}
                        value={form.itemRegDate}
                    />
                    <label name="itemStatus">itemStatus</label>
                    <input
                        type='text'
                        name="itemStatus"
                        disabled={isTure}
                        value={form.itemStatus}
                    />

                    <label name="timg">timg</label>
                    <img 
                        name="timg"
                        className='item-image'
                        src={ form.timgPath } 
                        
                        alt="preview"
                    />
                    <label name="fimg">fimg</label>
                    <img 
                        name="fimg"
                        className='item-image'
                        src={ form.fimgPath } 
                        alt="preview"
                    />
                    <label name="bimg">bimg</label>
                    <img 
                        name="bimg"
                        className='item-image'
                        src={ form.bimgPath } 
                        alt="preview"
                    />
                    <label name="dimg">dimg</label>
                    <img 
                        name="dimg"
                        className='item-image'
                        src={ form.dimgPath } 
                        alt="preview"
                    />

                </div>
        </div>
    );
}

export default ItemDetails;