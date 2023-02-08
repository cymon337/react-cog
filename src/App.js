import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/Main';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Gallery from './pages/gallery/Gallery';
import GalleryManager from './pages/gallery-manager/GalleryManager';
import Mypage from './pages/mypage/Mypage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={ <Layout/> }>
          <Route index element={ <Main/> }/>
          <Route path='/gallery' element={ <Gallery/> }/>
          <Route path='/gallery-manager' element={ <GalleryManager/> }/>
          <Route path='/mypage' element={ <Mypage/> }/>
        </Route>

        <Route path="login" element={ <Login/> }/>

        <Route path="signup" element={ <SignUp/> }/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
