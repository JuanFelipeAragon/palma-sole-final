import Navbar from '../../components/navbar/navbar'
import BNavbar from '../../components/navbar/bnavbar'
import FirstCarousel from '../../components/carousel/carousel';


export const MainPage = (props) => {
   
    return (
        <div className=''>
          <Navbar/>
          <FirstCarousel/>
          <BNavbar/>
            
        </div>
      );
};