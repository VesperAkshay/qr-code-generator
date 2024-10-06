import icon from '../assets/logo.ico'
import { IoMdSettings } from "react-icons/io";
import './componnent.css'
import { Link } from 'react-router-dom';

import title from '../assets/QR-Code-Customizer.png'
const NewNavbar = () => {
  return (

    <div className=' sticky top-0 z-50'>
        <div className=' h-16 w-full custome-gredient flex  items-center'>
            <Link to={'/'}>
            <div className='h-10 w-10 ml-4'><img src={icon} alt="" className=' object-contain'/></div>
            </Link>
           <div className=' flex items-center justify-between w-full mx-5 cursor-pointer'>
          <Link to={'/'}>
          <span className=''><img src={title} alt="" /></span>
          </Link>
          <Link to={"/settings"}>
          <div className=' text-white text-3xl'> <IoMdSettings /></div>
          </Link>
           </div>
        </div>
    </div>
  )
}

export default NewNavbar