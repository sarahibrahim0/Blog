import "./form.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  getResetPassword,
  resetPassword,
} from "../../redux/apiCalls/passwordApiCalls";
import AppForm from "../../components/form/AppForm";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { userId, token } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getResetPassword(userId, token));
  }, [userId, token]);

  const formSubmitHandler = (values) => {
    dispatch(resetPassword(values["password"], { userId, token }));
    navigate("/password-reset-successfully");
  };

  const schema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!+@#\\$%\\^&\\*])(?=.{8,})/,
        "Must contain 8 characters, one uppercase, one lowercase, one number and one special character"
      ),
  });

  const fields = [
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter new password",
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
          initialValues={{ password: "" }}
          validationSchema={schema}
          onSubmit={formSubmitHandler}
          fields={fields}
          formClassName=" w-full flex flex-col justify-center items-center  text-center "
          submitLabel="Update Password"
          submitClassName="relative z-10 !bg-gradient-to-r from-sky-500 to-indigo-500 my-5 text-white min-h-[41.6px] box-border  hover:!bg-custom-color  transition-all duration-500 ease-in-out  border-[1px] rounded-full py-2 px-7 mr-2"
        />
      </div>
    </section>
  );
};

export default ResetPassword;
