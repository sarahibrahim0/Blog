
const HeaderUpper = () => {



    const date = new Date().toDateString()
    return (
        <div className="header-upper h-12 w-full bg-transparent py-0 lg:px-5  md:px-3 flex  flex-row justify-between items-center ">
              <div  className="flex-1 basis-0 flex  text-xs  lg:flex flex-row justify-start items-center md:hidden sm:hidden ">
            <i class="fa-solid fa-file text-[10px] text-[#fff] "></i>

            <span className='inline-block text-xs text-white ml-1'>
            {date}
            </span>
            </div>
                <ul className=" min-w-max flex flex-row  lg:justify-end ms:justify-center  sm:justify-center   items-center flex-1 basis-0 " >
                    <li className='li1  text-xs text-white' style={{'marginLeft':'0px'}} >
                    <i class="fa-solid fa-phone-volume text-[10px] text-[#fff] rotate-45"></i>
            <span className='inline-block   text-xs color-white ml-1 ' >
            +201146446791
            </span>
                    </li>


            <li className="text-xs text-white"  style={{'marginRight':'0px'}}>
            <i class="fa-solid fa-envelope text-[10px] text-[#fff] "></i>
                 <span className='  text-xs text-white ml-1' >Sarahibrahim0176@gmail.com</span>
            </li>

            </ul>
        </div>
     );
}

export default HeaderUpper;