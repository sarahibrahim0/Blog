import "./form.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";
import { ErrorMessage, Field, Form ,Formik } from "formik";
import * as Yup from 'yup';
const Login = () => {


  const dispatch = useDispatch();

  // From Submit Handler
  const formSubmitHandler = (values) => {
   return dispatch(loginUser({email: values['email'], password: values['password']}));
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const initialValues = {
    email:'',
    password: ''
  }

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-start  p-10 ">

      <div className="formShadow  flex flex-col justify-center items-center rounded-2xl mt-10 lg:w-auto sm:w-full   h-full py-8 px-5">
      <i className="fa-solid fa-blog md:text-5xl sm:text-4xl text-very-blue "></i>
      <span className=" font-semibold md:text-2xl sm:text-base text-blue-black mb-5 mt-1 pt-5">Login to your account</span>
<Formik onSubmit={formSubmitHandler} initialValues={initialValues} validationSchema={loginSchema}>
  {
    (formik)=>{
      return(
        <Form  className=" w-full flex flex-col justify-start items-center   bg-white p-5 ">
        <div className="flex flex-col items-start mb-4 w-full ">
          <label htmlFor="email" className=" mb-1 text-sm font-[500]  text-blue-black ">
            Email
          </label>
          <Field
          name="email"
            type="email"
            id="email"
            placeholder="Enter your email"
            className=" w-full rounded-lg md:text-base sm:text-sm p-2  border-[1px]"
          />
        </div>
        <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic"/>

        <div className="flex flex-col items-start mb-4 w-full">
          <label htmlFor="password" className="mb-1  text-sm font-[500]  text-blue-black ">
            Password
          </label>
          <Field
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className=" w-full rounded-lg md:text-base sm:text-sm p-2  border-[1px]"
          />
        </div>
        <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic"/>

        <button  type='submit' disabled={formik.isSubmitting} className="w-full self-center relative z-10  !bg-gradient-to-r from-sky-500 to-indigo-500 my-5 text-white min-h-[41.6px] box-border  hover:!bg-custom-color  transition-all duration-500 ease-in-out  border-[1px] rounded-lg py-2 px-7 " >
    <span className="text-inherit text-sm inline-block   ">
       Login
    </span>
    </button>

    <div className="lg:whitespace-nowrap sm:whitespace-wrap self-start mt-4 text-blue-black lg:text-base sm:text-sm">
        Did you forget your password?{" "}
        <Link to="/forgot-password" className="text-very-blue lg:text-base sm:text-sm whitespace-nowrap hover:text-blue-black transition-all duration-300">Reset Password</Link>
      </div>
      </Form>
      )
    }
  }


</Formik>




      </div>

    </section>
  );
};

export default Login;
