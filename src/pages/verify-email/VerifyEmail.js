import './VerifyEmail.css';


import { Link,useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyEmail } from '../../redux/apiCalls/authApiCall';
import NotFound from '../not-found/NotFound';
import { Oval } from "react-loader-spinner";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const { isEmailVerified, isVerifying } = useSelector(state => state.auth);

  const { userId, token } = useParams();
  useEffect(() => {
    // console.log(userId +'user', token);

    dispatch(verifyEmail(userId, token));
  }, [userId, token]);


  return (
    <section className="h-screen w-full flex flex-row items-center justify-center ">
      {
        isVerifying ?  (

          <div className="flex flex-row justify-center items-center w-full h-[100vh]">
          <Oval
            height={70}
            width={70}
            color="#7f5bc4"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#60a3e6"
            strokeWidth={4}
            strokeWidthSecondary={4}
          />
        </div>

        ):
        <>
                {isEmailVerified ? (
          <div className='box-border   xl:w-[704px] lg:w-[704] md:w-full sm:w-full xl:absolute lg:absolute  md:static sm:static h-auto rounded-lg xl:bg-[#f4f7f957] lg:bg-[#f4f7f957] sm:bg-[#d3e6f257] backdrop-blur-[15px] 2xl:mb-0 xl:mb-0 lg:mb-0 md:mb-5 sm:mb-5 p-10 text-center flex flex-col justify-start items-center space-y-4 '>
          <i class="fa-regular fa-circle-check text-6xl text-[#5bb157] "></i>
          <span className="text-3xl text-blue-black">
            Your email address has been successfully verified
          </span>
          <Link to="/login" className="text-2xl font-[600] text-very-blue">
            Go To Login Page
          </Link>
        </div>
      ) : (
        <>
                    <div className='box-border   xl:w-[704px] lg:w-[704] md:w-full sm:w-full xl:absolute lg:absolute  md:static sm:static h-auto rounded-lg xl:bg-[#f4f7f957] lg:bg-[#f4f7f957] sm:bg-[#d3e6f257] backdrop-blur-[15px] 2xl:mb-0 xl:mb-0 lg:mb-0 md:mb-5 sm:mb-5 p-10 text-center flex flex-col justify-start items-center space-y-4 '>
          <span className="text-3xl text-blue-black">
            Invalid Link
           </span>
          <Link to="/login" className="text-2xl font-[600] text-very-blue">
            Go To Login Page
          </Link>
        </div>
        </>
      )}</>


      }



    </section>
  );
};

export default VerifyEmail;
