import "./UpdateProfileModal.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProfile,
  updateProfile,
} from "../../redux/apiCalls/profileApiCalls";
import { FieldArray, Field, ErrorMessage } from "formik";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
import swal from "sweetalert";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import AppForm from "../../components/form/AppForm";

const UpdatePRofileModal = (props) => {
  const dispatch = useDispatch();
  const { isProfileDeleted } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters long")
      .max(15, "Username must be at most 15 characters long"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters long"),
    email: yup
      .string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    bio: yup
      .string()
      .required("Bio is required")
      .max(200, "Bio must be at most 200 characters long"),
    socialMedia: yup.array().of(
      yup.object().shape({
        name: yup.string().required("Required"),
        url: yup.string().required("Url required"),
      })
    ),
  });

  const initialValues = {
    username: props.profile.username,
    email: props.profile.email,
    bio: props.profile.bio,
    password: "",
    socialMedia: [...props.profile.socialMedia],
  };

  const socialOptions = [
    "facebook",
    "linkedin",
    "github",
    "whatsapp",
    "gmail",
  ];

  const deleteProfileHandler = () => {
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

  const formSubmitHandler = (values) => {
    const updatedUser = {
      username: values["username"],
      email: values["email"],
      bio: values["bio"],
      socialMedia: values["socialMedia"],
    };

    if (values["password"]) {
      updatedUser.password = values["password"];
    }
    dispatch(updateProfile(props.profile?._id, updatedUser));
    props.setUpdateProfile(false);
  };

  const inlineField = {
    layout: "inline",
    outerClassName: "w-full flex flex-col space-y-1 items-center",
    rowClassName: "w-full flex flex-row  items-center space-x-3",
    labelClassName: "font-semibold text-blue-black",
    inputClassName:
      "w-full text-normal leading-tight text-blue-black border-[1px] rounded-lg p-2",
  };

  const fields = [
    {
      ...inlineField,
      name: "username",
      label: "Username",
      placeholder: "username",
    },
    {
      ...inlineField,
      name: "email",
      label: "Email",
      placeholder: "email",
    },
    {
      ...inlineField,
      name: "bio",
      label: "Bio",
      placeholder: "bio",
      as: "textarea",
      rows: 3,
    },
    {
      ...inlineField,
      name: "password",
      label: "Password",
      placeholder: "password",
      type: "password",
      outerClassName: "w-full flex flex-col  space-y-1 items-center  mb-4",
    },
  ];

  return (
    <div className="z-20 fixed top-0 left-0 bg-[rgba(0,0,0,0.7)] h-full w-full flex flex-col items-center justify-center ">
      <div
        onClick={() => props.setUpdateProfile(false)}
        className="w-full h-full absolute top-0 left-0 bg-transparent "
      ></div>

      <div className={props.updateProfile ? "modal " : "modalHidden"}>
        <div className="modalHeader">
          <div>
            <h2 className="modalTitle">Edit Profile</h2>
            <span className="modalSubtitle">Update your account details</span>
          </div>
          <button
            type="button"
            title="Exit form"
            className="modalClose"
            onClick={() => props.setUpdateProfile(false)}
          >
            <i className="fa-solid fa-x text-sm"></i>
          </button>
        </div>

        <div className="modalBody">
          <AppForm
            onSubmit={formSubmitHandler}
            validationSchema={schema}
            initialValues={initialValues}
            enableReinitialize
            fields={fields}
            showSubmit={false}
            formClassName="w-full flex flex-col items-start gap-5"
            renderActions={() => (
              <div className="flex flex-row justify-between w-full items-center mt-2 pt-5 border-t border-[#e7e9f3]">
                <button
                  type="submit"
                  className="text-white box-border !bg-gradient-to-r from-sky-500 to-indigo-500 hover:!bg-custom-color transition-all duration-500 ease-in-out border-[1px] rounded-full px-6 py-2.5 text-sm"
                >
                  Update Profile
                </button>

                <button
                  className="delete"
                  type="button"
                  data-title="Delete Profile"
                  onClick={deleteProfileHandler}
                >
                  <i className="fa-solid fa-user-xmark text-xl inline-block text-very-blue"></i>
                </button>
              </div>
            )}
          >
            {(formik) => (
              <div className="w-full flex flex-col space-y-3 items-start">
                <FieldArray name="socialMedia">
                  {({ remove, push }) => (
                    <>
                      <label
                        htmlFor="socialMedia"
                        className="socialLabel"
                        onClick={() => {
                          if (formik.values.socialMedia.length < 5) {
                            push({ name: "", url: "" });
                          }
                        }}
                      >
                        <i className="fa-solid fa-plus text-xs"></i>
                        Add Social Link
                      </label>

                      <div className="w-full flex flex-col space-y-4 self-center">
                        {formik.values.socialMedia.length > 0 &&
                          formik.values.socialMedia.map((option, index) => (
                            <div
                              key={index}
                              className="socialRow w-full flex flex-row items-star"
                            >
                              <div className="flex-1 flex flex-col justify-center items-start pr-2">
                                <Field name={`socialMedia[${index}].url`}>
                                  {(field) => {
                                    return (
                                      <input
                                        placeholder="Enter your url"
                                        value={option?.url}
                                        className="w-full text-normal leading-tight text-blue-black border-[1px] rounded-lg p-2"
                                        {...field}
                                        type="text"
                                        onChange={(e) => {
                                          formik.setFieldValue(
                                            `socialMedia.${index}.url`,
                                            e.currentTarget.value
                                          );
                                        }}
                                      />
                                    );
                                  }}
                                </Field>

                                <ErrorMessage
                                  name={`socialMedia.${index}.url`}
                                  component="div"
                                  className="inline-block text-red-500 text-xs italic"
                                />
                              </div>

                              <div className="flex flex-col justify-center items-center">
                                <Field
                                  className=" text-normal p-2 leading-tight text-blue-black border-[1px] rounded-lg "
                                  as="select"
                                  name={`socialMedia[${index}].name`}
                                >
                                  <option disabled value="">
                                    Select Social Link
                                  </option>
                                  {socialOptions?.map((option, index) => {
                                    return (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    );
                                  })}
                                </Field>

                                <ErrorMessage
                                  name={`socialMedia[${index}].name`}
                                  component="div"
                                  className="text-red-500 text-xs italic"
                                />
                              </div>

                              <button
                                type="button"
                                title="Remove link"
                                className="socialRowRemove"
                                onClick={() => remove(index)}
                              >
                                <i className="fa-solid fa-x text-xs"></i>
                              </button>
                            </div>
                          ))}
                      </div>
                    </>
                  )}
                </FieldArray>
              </div>
            )}
          </AppForm>
        </div>
      </div>
    </div>
  );
};

export default UpdatePRofileModal;
