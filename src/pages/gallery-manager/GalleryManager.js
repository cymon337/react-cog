import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function GalleryManager() {

    return (
        <>
            <h1>GalleryManager</h1>
            <NavLink to="/gallery-manager/items" >
                <button>
                    search item
                </button>
            </NavLink>

            <NavLink to="/gallery-manager/items/regist" >
                <button>
                    regist item
                </button>
            </NavLink>
            
            <Outlet/>
        </>
    );
}

export default GalleryManager; 