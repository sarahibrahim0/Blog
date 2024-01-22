
import './footer.css';
import  wave from '../../images/wave.svg'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
const Footer = () => {
    return (

<footer className="footer lg:mt-[140px] sm:mt-[40px] w-full ">


 <svg className='overflow-hidden absolute w-full  top-[-100px] left[-20px] z-0 xl:block lg:hidden md:hidden sm:hidden h-[100px] ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">

 <defs>
        <linearGradient id="gradient">
            <stop offset="0%" stopColor="#7f5bc4" />
            <stop offset="77%" stopColor="#60a3e6" />
        </linearGradient>
    </defs>


 <path className="z-0 elementor-shape-fill" fill="url(#gradient)" d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
 c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
 c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"></path>
 </svg>


    <ul className="flex flex-row  justify-between">

 <button className="smIcon" href='https://www.linkedin.com/in/sarahibrahim0' target="_blank" rel="noopener noreferrer">
 <i className="fa-brands fa-linkedin-in lg:text-xl md:text-base sm:text-base !text-white"></i>
             </button>

      <li >             <button className="smIcon" href='https://github.com/sarahibrahim0' target="_blank" rel="noopener noreferrer">
         <i className="fa-brands fa-github lg:text-lg md:text-base sm:text-base !text-white" ></i>
       </button></li>
      <li className="social-icon__item"> <button className="smIcon" href="mailto:sarahibrahimabdelhaimd@gmail.com" >
         <i className="fa-brands fa-google lg:text-lg md:text-base sm:text-base !text-white"></i>
 </button></li>


 <li > <button className="smIcon" href='#' >
 <i className="fa-brands fa-facebook lg:text-lg md:text-base sm:text-base !text-white"></i>
</button></li>

<li >
<button className="smIcon" href="#" >
 <i className="fa-brands fa-whatsapp lg:text-lg md:text-base sm:text-base !text-white"></i></button>
</li>
    </ul>

    <ul className="box-border my-1  flex flex-row space-x-3   items-start " >
      <li className=" "><a className="menu__link md:text-base sm:text-xs" href="#">Home</a></li>
      <li className=" "><a className="menu__link md:text-base sm:text-xs" href="#">About</a></li>
      <li className=""><a className="menu__link md:text-base sm:text-xs " href="#">Services</a></li>
      <li className=""><a className="menu__link md:text-base  sm:text-xs" href="#">Services</a></li>
      <li className=""><a className="menu__link md:text-base sm:text-xs" href="#">Team</a></li>
      <li className=""><a className="menu__link md:text-base sm:text-xs" href="#">Contact</a></li>
    </ul>
    <p className='md:text-base sm:text-xs'>&copy;2024 Sarah Ibrahim | All Rights Reserved</p>
  </footer>

 );
}

export default Footer;