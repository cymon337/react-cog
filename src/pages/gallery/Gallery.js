import { useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';


function Gallery() {
    console.log('log = Gallery rendering');

    useEffect(() => {

        
    } // eslint-disable-next-line
    ,[]);
    

    return (
        <>
            <h1>Gallery</h1>
            <NavLink to="/gallery/items" >
                <p>item search</p>
            </NavLink>
            
            <Outlet/>
        </>
    );
}

export default Gallery;