import { Link } from "react-router-dom";
const PasswordReseted = () => {
    return (

        <div className='box-border min-h-screen xl:w-[704px] lg:w-[704] md:w-full sm:w-full xl:absolute lg:absolute  md:static sm:static h-auto rounded-lg xl:bg-[#f4f7f957] lg:bg-[#f4f7f957] sm:bg-[#d3e6f257] backdrop-blur-[15px] 2xl:mb-0 xl:mb-0 lg:mb-0 md:mb-5 sm:mb-5 p-10 text-center flex flex-col justify-start items-center space-y-4 '>
        
        <div>
        <i class="fa-regular fa-circle-check text-6xl text-[#5bb157] "></i>
        <span className="text-3xl text-blue-black block">
          Password reset successfully
        </span>
        <Link to="/login" className="text-2xl font-[600] text-very-blue">
          Go To Login Page
        </Link>
        </div>
   
      </div>
      );
}

export default PasswordReseted;