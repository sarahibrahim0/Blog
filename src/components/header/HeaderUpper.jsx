import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-regular-svg-icons';
const HeaderUpper = () => {



    const date = new Date().toDateString()
    return (
        <div className="header-upper h-12 w-full bg-transparent py-0 lg:px-5 sm:px-2 md:px-3 grid grid-flow-col gap-0 grid-rows-1 grid-cols-2 md:grid-cols-1   sm:grid-cols-1 items-center ">
              <div  className="col-span-4 text-xs  lg:flex flex-row justify-start items-center md:hidden sm:hidden ">
            <FontAwesomeIcon icon={faFile } size='xs' color='white' className='icon' />

            <span className='text-xs text-white ml-1'>
            {date}
            </span>
            </div>
                <ul className="col-span-8 min-w-max flex flex-row lg:justify-end md:justify-center sm:justify-center  items-center md:col-span-12 sm:col-span-12" >
                    <li className='li1 lg:text-xs text-white ml-1' style={{'marginLeft':'0px'}} >
                    <FontAwesomeIcon  icon={faPhoneVolume}  size='xs' color='white' transform={{rotate: 45}}/>
            <span className='sm:text-3xs text-xs color-white ml-1 ' >
            +201146446791
            </span>
                    </li>


            <li  style={{'marginRight':'0px'}}>
            <FontAwesomeIcon icon={faEnvelope} size='xs' color='white'/>
                 <span className='sm:text-3xs  text-xs text-white ml-1' >Sarahibrahim0176@gmail.com</span>
            </li>

            </ul>
        </div>
     );
}

export default HeaderUpper;