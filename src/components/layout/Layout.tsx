import { Link, Outlet } from 'react-router-dom'
import Footer from '../footer/Footer';
import SideBar from './SideBar';

const Layout = () => {


    return (
       <div className='layout'>
            <header className="header">
                <Footer/>
            </header>
            <div className="layout-main-container">
                <SideBar/>
                <div className="outlet">
                    <Outlet/>
                </div>
            </div>
       </div>
  );
    
}

export default Layout