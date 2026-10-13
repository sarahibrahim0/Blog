import "./form.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";
import * as Yup from "yup";
import AppForm from "../../components/form/AppForm";

const Login = () => {
  const dispatch = useDispatch();

  const formSubmitHandler = (values) => {
    return dispatch(
      loginUser({ email: values["email"], password: values["password"] })
    );
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const fields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
    },
  ];

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-start  p-10 ">
      <div className="formShadow  flex flex-col justify-center items-center rounded-2xl mt-10 lg:w-auto sm:w-full   h-full py-8 px-5">
        <i className="fa-solid fa-blog md:text-5xl sm:text-4xl text-very-blue "></i>
        <span className=" font-semibold md:text-2xl sm:text-base text-blue-black mb-5 mt-1 pt-5">
          Login to your account
        </span>

        <AppForm
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={formSubmitHandler}
          fields={fields}
          formClassName=" w-full flex flex-col justify-start items-center   bg-white p-5 "
          submitLabel="Login"
          footer={
            <div className="lg:whitespace-nowrap sm:whitespace-wrap self-start mt-4 text-blue-black lg:text-base sm:text-sm">
              Did you forget your password?{" "}
              <Link
                to="/forgot-password"
                className="text-very-blue lg:text-base sm:text-sm whitespace-nowrap hover:text-blue-black transition-all duration-300"
              >
                Reset Password
              </Link>
            </div>
          }
        />
      </div>
    </section>
  );
};

export default Login;
