import "./form.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import * as yup from "yup";
import AppForm from "../../components/form/AppForm";

const Register = () => {
  const dispatch = useDispatch();
  const { registerMessage } = useSelector((state) => state.auth);

  const registrationSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "Username should contain only alphanumeric characters"
      )
      .max(15, "Username must be at most 15 characters long"),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email address"
      ),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!+@#\\$%\\^&\\*])(?=.{8,})/,
        "Must contain 8 characters, one uppercase, one lowercase, one number and one special character"
      ),
  });

  const formSubmitHandler = (values) => {
    return dispatch(
      registerUser({
        username: values["username"],
        email: values["email"],
        password: values["password"],
        isAdmin: false,
        isVerified: false,
      })
    );
  };

  const fields = [
    {
      name: "username",
      label: "Username",
      placeholder: "Enter your username",
    },
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

  const navigate = useNavigate();

  if (registerMessage) {
    navigate("/email-sent");
  }

  return (
    <section className="  w-full min-h-screen flex flex-col items-center justify-start  p-10 ">
      <div className="formShadow  flex flex-col justify-center items-center rounded-2xl mt-10 lg:w-auto sm:w-full h-full py-8 px-5">
        <i className="fa-solid fa-blog md:text-5xl sm:text-4xl text-very-blue "></i>
        <span className=" font-semibold md:text-2xl sm:text-base text-blue-black mb-5 mt-1 pt-5">
          Create New Account
        </span>

        <AppForm
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={registrationSchema}
          onSubmit={formSubmitHandler}
          fields={fields}
          formClassName=" w-full flex flex-col justify-start items-center   bg-white p-5 "
          submitLabel="Register"
          footer={
            <div className="lg:whitespace-nowrap sm:whitespace-wrap self-start mt-4 text-blue-black lg:text-base sm:text-sm">
              Do you already have an account?{" "}
              <Link
                to="/login"
                className="text-very-blue lg:text-base sm:text-sm whitespace-nowrap hover:text-blue-black transition-all duration-300"
              >
                Log In
              </Link>
            </div>
          }
        />
      </div>
    </section>
  );
};

export default Register;
