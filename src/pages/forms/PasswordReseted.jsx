import { Link } from "react-router-dom";
const PasswordReseted = () => {
    return (

        <div className='box-border m-auto  xl:w-[704px] lg:w-[704] md:w-full sm:w-full  md:static sm:static h-auto rounded-lg xl:bg-[#f4f7f957] lg:bg-[#f4f7f957] sm:bg-[#d3e6f257] backdrop-blur-[15px] 2xl:mt-5 xl:mt-5 lg:mt-5 md:mt-5 sm:mt-5  2xl:mb-0 xl:mb-0 lg:mb-0 md:mb-5 sm:mb-5 p-10 text-center flex flex-col justify-start items-center space-y-4 '>
        
        <i class="fa-regular fa-circle-check text-4xl text-[#5bb157] "></i>
        <span className="text-2xl text-blue-black block">
          Password reset successfully
        </span>
        <Link to="/login" className="text-xl font-[600] text-very-blue">
          Go To Login Page
        </Link>
   
      </div>
      );
}

export default PasswordReseted;