import { useSelector } from "react-redux/es/hooks/useSelector";
const EmailSent = () => {

    const { registerMessage } = useSelector(state => state.auth);

    return (
        <section className="h-screen w-full flex flex-row items-center justify-center ">

          <div className='box-border   xl:w-[704px] lg:w-[704] md:w-full sm:w-full xl:absolute lg:absolute  md:static sm:static h-auto rounded-lg xl:bg-[#f4f7f957] lg:bg-[#f4f7f957] sm:bg-[#d3e6f257] backdrop-blur-[15px] 2xl:mb-0 xl:mb-0 lg:mb-0 md:mb-5 sm:mb-5 p-10 text-center flex flex-col justify-start items-center space-y-4 '>

          <i className="fa-solid fa-envelope  text-5xl text-very-blue "></i>

          <span className="text-xl text-blue-black font-semibold">
Please verify you email           </span>
            <span className="text-xl text-blue-black font-semibold whitespace-pre-line">
You're almost there!
We sent an email to :
       </span>
       <strong className="text-very-blue"> {registerMessage} </strong>

          </div>


      </section>
     );
}

export default EmailSent;