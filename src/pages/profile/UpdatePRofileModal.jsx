import "./UpdateProfileModal.css";
import { toast } from "react-toastify";
import { useDispatch , useSelector } from "react-redux";
import { deleteProfile, updateProfile  } from "../../redux/apiCalls/profileApiCalls";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
import swal from "sweetalert";

import * as yup from "yup";
import { Modal } from 'tw-elements';
import { useNavigate} from "react-router-dom";

const UpdatePRofileModal = (props) => {



  const dispatch = useDispatch();
  const {  isProfileDeleted } = useSelector((state) => state.profile);
  const navigate = useNavigate();




  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters long")
      .max(15, "Username must be at most 15 characters long"),
    password: yup
      .string()
      // .required("Password is required")
      .min(6, "Password must be at least 6 characters long")
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      //   "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      // )
      ,
    email: yup
      .string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    bio: yup
      .string()
      .required("Bio is required")
      .max(200, "Bio must be at most 200 characters long"),
  });

  const initialValues = {
    username: props.profile.username,
    email: props.profile.email,
    bio: props.profile.bio,
    password: "",
  };

  const deleteProfileHandler = ()=>{
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteProfile(props.profile._id));
        dispatch(logoutUser());
        if (isProfileDeleted) {
          navigate("/");
        }
      }
    });
  };

  // From Submit Handler
  const formSubmitHandler = (values) => {
    const updatedUser = {
      username: values["username"],
      email:values["email"],
      bio: values["bio"],
    };

if(values["password"]){
  updatedUser.password=values["password"];
}

    dispatch(updateProfile(props.profile?._id, updatedUser));
    props.setUpdateProfile(false);
  };

  return (
    <div   className="z-20 fixed top-0 left-0 bg-[rgba(0,0,0,0.7)] h-full w-full flex flex-col items-center justify-center ">
     <div onClick={()=>props.setUpdateProfile(false)}  className="w-full h-full absolute top-0 left-0 bg-transparent ">
     </div>

      <div className={props.updateProfile? 'modal': 'modalHidden'}>
        <i
        title="exit form"
          class="box-border fa-solid fa-x text-lg cursor-pointer absolute 2xl:right-4 xl:right-4 lg:right-4  md:m-auto sm:m-auto text-very-blue top-3"
          onClick={() => props.setUpdateProfile(false)}
        ></i>
        <Formik
          onSubmit={formSubmitHandler}
          validationSchema={schema}
          initialValues={initialValues}
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form className="flex flex-col items-start justify-evenly m-auto relative w-[80%]  h-full ">
                <div className="w-full flex flex-col space-y-1 items-center  ">
                <div className="w-full flex flex-row  items-center space-x-3 ">

                  <label htmlFor="username" className="font-semibold text-blue-black">Username</label>
                  <Field
                    name="username"
                    id="username"
                    placeholder="username"
                    className='w-full  text-normal leading-tight text-blue-black border-[1px] rounded-lg p-2'
                  ></Field>
                  </div>
                  <ErrorMessage name="username" component="div" className="text-red-500 text-xs italic" />
                </div>

                <div className="w-full flex flex-col space-y-1 items-center ">
                <div className="w-full flex flex-row  items-center space-x-3 ">

                  <label htmlFor="email" className="font-semibold text-blue-black">email</label>
                  <Field
                    name="email"
                    id="email"
                    placeholder="email"
                    className='w-full text-normal leading-tight text-blue-black border-[1px] rounded-lg p-2'


                  ></Field>
                  </div>
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic" />

                </div>

                <div className="w-full flex flex-col space-y-1 items-center ">
                <div className="w-full flex flex-row  items-center space-x-3 ">

                  <label htmlFor="bio" className="font-semibold text-blue-black">Bio</label>
                  <Field
                    name="bio"
                    id="bio"
                    placeholder="bio"
                    className='w-full text-normal leading-tight text-blue-black border-[1px] rounded-lg p-2'

                  ></Field>
                  </div>
                                    <ErrorMessage name="bio" component="div" className="text-red-500 text-xs italic" />

                </div>

                <div className="w-full flex flex-col space-y-1 items-center ">
                  <div className="w-full flex flex-row  items-center space-x-3 ">
                  <label htmlFor="password" className="font-semibold text-blue-black">Password</label>
                  <Field
                    name="password"
                    id="password"
                    placeholder="password"
                    className='w-full text-normal leading-tight text-blue-black border-[1px] rounded-lg p-2'
                    type="password"

                  ></Field>
                  </div>

                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic" />
                </div>

                <div className="flex flex-row justify-between w-full items-center  ">

                <button disabled={formik.isSubmitting} type="submit" className=  "text-white  box-border !bg-very-blue  hover:bg-[#4776E6] transition-all duration-500 ease-in-out  border-[1px] rounded-full px-3 py-2.5 text-sm" >
        update Profile

</button>


<button className="delete" type="button" href="" data-title='Delete Profile' onClick={deleteProfileHandler}>
<i class="fa-solid fa-user-xmark text-xl inline-block text-very-blue"></i>

</button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      </div>
  );
};

export default UpdatePRofileModal;
