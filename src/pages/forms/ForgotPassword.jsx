import "./form.css";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/apiCalls/passwordApiCalls";
import * as Yup from "yup";
import AppForm from "../../components/form/AppForm";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const formSubmitHandler = (values) => {
    return dispatch(forgotPassword(values["email"]));
  };

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email address"
      ),
  });

  const fields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      layout: "inline",
      outerClassName: "w-full",
      rowClassName:
        "w-full flex flex-row justify-between items-center space-x-2 p-5",
    },
  ];

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-start  p-10 ">
      <div className="formShadow min-w-[60vh] min-h-[50vh] flex flex-col justify-center items-center rounded-2xl mt-10 lg:w-auto sm:w-full   h-full py-8 px-5">
        <AppForm
          initialValues={{ email: "" }}
          validationSchema={schema}
          onSubmit={formSubmitHandler}
          fields={fields}
          formClassName=" w-full flex flex-col justify-center items-center text-center p-3"
          submitLabel="Reset Password"
          submitClassName="relative z-10 !bg-gradient-to-r from-sky-500 to-indigo-500 my-5 text-white min-h-[41.6px] box-border  hover:!bg-custom-color  transition-all duration-500 ease-in-out  border-[1px] rounded-full py-2 px-7 mr-2"
        />
      </div>
    </section>
  );
};

export default ForgotPassword;
