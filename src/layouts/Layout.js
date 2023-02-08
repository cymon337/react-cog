import { Outlet } from 'react-router-dom';
import Header from '../components/commons/Header';

function Layout() {


    return (
        <div className='wrapper'>
            <Header/>
            <Outlet/>
        </div>
    );
}

export default Layout;
