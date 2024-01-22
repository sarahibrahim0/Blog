import "./Profile.css";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import UpdatePRofileModal from "./UpdatePRofileModal";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Avatar from '@mui/material/Avatar';
import myImage from '../../images/9264822.jpg'



import {
  deleteProfile,
  getUserPosts,
  getUserProfile,
  uploadProfilePhoto,
} from "../../redux/apiCalls/profileApiCalls";
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
import PostItem from "../../components/posts/PostItem";
import Pagination from "../../components/pagination/Pagination";
import { Form, Formik, Field, ErrorMessage } from "formik";

const POST_PER_PAGE = 6;




const Profile = () => {
  const [updateProfile, setUpdateProfile] = useState(false);
  const [hoverEff, setHoverEff] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();
  const { profile, loading, isProfileDeleted } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [img,setImg] = useState(null);
  const { userPostsCount , userFilteredPosts } = useSelector((state) => state.profile);

  const pages = Math.ceil(userPostsCount/POST_PER_PAGE);


  const initialValues = {
    image: null,
  };




  const validationSchema = Yup.object().shape({
    image: Yup.mixed()
    .required("image is required")
      .test('fileSize', 'File size is too large', (value) => {
        return value && value.size <= 7000000;
      })
      .test('fileType', 'Unsupported File Format', (value) => {
        return (
          value &&
          ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/jfif'].includes(
            value.type
          )
        );
      }),
  });





  useEffect(() => {
    if(user !== null)
{    dispatch(getUserProfile(id));
}    window.scrollTo(0, 0);
  }, [user]);

  useEffect(() => {
    dispatch(getUserPosts(id, currentPage));
    window.scrollTo(0, 0);
    console.log(pages, userFilteredPosts )
  }, [currentPage]);

  useEffect(() => {
    if (isProfileDeleted) {
      navigate("/");
    }
  }, [isProfileDeleted, navigate]);

  const formHandler = (values) => {
    const formData = new FormData();
    formData.append("image", values['image']);
    return dispatch(uploadProfilePhoto(formData));
  };

  console.log(userFilteredPosts)


  if (loading) {
    return (
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
    );
  }

  return (

<>
{user ? (
      <div className="box-border w-auto h-auto mt-10 mx-2 my-10 relative">


      <section className="box-border w-auto rounded-xl 2xl:gap-2 xl:gap-2 lg:gap-2 grid 2xl:grid-flow-col xl:grid-flow-col lg:grid-flow-col  grid-cols-12 border-[1px] min-h-max mb-10  p-12  ">

        <div className=" box-border w-auto flex 2xl:col-span-2 xl:col-span-3 lg:col-span-4 md:col-span-12 sm:col-span-12 flex-row  xl:justify-start lg:justify-start md:justify-center sm:justify-center items-center xl:h-[190px] lg:h-[190px]">

  <div className=" relative">

  <Avatar src={img ? URL.createObjectURL(img) : profile?.profilePhoto?.url} alt="" sx={{'width':'120px' , 'height' :'120px' , 'objectFit':'cover'}}/>

  {user?._id === profile?._id &&
  (<div className="absolute z-0 top-[40%] left-[100%]" title="upload new photo">

  <Formik
     validationSchema={validationSchema}
            onSubmit={formHandler}
            initialValues={initialValues}
            >
    {(formik)=>{
      return(
        <Form title="upload new photo">
  <div>
  <label htmlFor="image" className="text-center  cursor-pointer inline-block relative z-10 left-[-11px] px-[7px] pt-[5px] pb-[2.5px] rounded-full bg-[#ffffff] ">
  {
    formik.isSubmitting? (
    <i className="loading  fa-solid fa-spinner  text-very-blue text-xl"></i>
    ):
    (
      <i className=" fa-solid fa-camera text-very-blue text-xl"></i>
    )
  }
   </label>
    <Field name="image"
                    >
                      {(field)=>{
                                return(
                                  <input
                                  style={{ display: "none" }}
                                  id="image"
                                   {...field} type="file" onChange={(e)=>{
                                    formik.setFieldValue('image',e.currentTarget.files[0]);
                                    setImg(e.currentTarget.files[0]);
                                    }}
                                  />
                                )
                              }}
                    </Field>

                    {/* <ErrorMessage name="image">
                      {msg=>
                      <toast className="text-red-500 text-xs italic" >
                      {msg}
                        </toast>
                      )}
                    </ErrorMessage> */}
                  </div>

                <button disabled={!formik.isValid}  type="submit " className="relative text-faint-gray text-sm font-normal">
  upload
                </button>

        </Form>
      )

    }}
  </Formik>


  </div>)
  }
  </div>





  </div>
        <div className= "md:mt-2 sm:mt-2  min-w-min flex 2xl:col-span-10 xl:col-span-9 lg:col-span-8 md:col-span-12 sm:col-span-12 flex-col xl:items-start lg:items-start md:items-center sm:items-center justify-between box-border ">

  <div className="flex flex-col w-full xl:items-start lg:items-start md:items-center sm:items-center xl:justify-end lg:justify-end box-border">
  <span className="text-blue-black font-sm " title="author">Author</span>
            <span className=" text-blue-black font-semibold lg:text-4xl md:text-2xl sm:text-lg ">
              {profile?.username}
            </span>
            <div className=" box-border h-auto  w-full my-2">
            <div className="dividerLine0 box-border border-blue-black rounded-full "></div>
          </div>
  </div>



          <div className="info md:mt-2 sm:mt-2 md:mb-4 sm:mb-4 sm:text-center">
            <span className=" font-xs text-faint-gray">{profile?.bio}</span>
          </div>
          <div className="  flex xl:flex-row lg:flex-row md:flex-col sm:flex-col items-center justify-between w-full h-auto ">


            <div className="w-auto min-w-max rounded-full border-[1px] flex flex-row items-center xl:justify-start lg:justify-start md:justify-center sm:justify-center xl:mb-0 lg:mb-0 md:mb-2 sm:mb-2 ">

  <button className="smIcon0" data-title="follow me on linkedin" href='https://www.linkedin.com/in/sarahibrahim0' target="_blank" rel="noopener noreferrer">
  <i className="fa-brands fa-linkedin-in lg:text-xl md:text-base sm:text-base"></i>
              </button>
              <a data-title="follow me on github" className="smIcon0" href='https://github.com/sarahibrahim0' target="_blank" rel="noopener noreferrer">
  <i className="fa-brands fa-github lg:text-xl md:text-base sm:text-base" ></i>
  </a>
  <button className="smIcon0" data-title="follow me on github" href="mailto:sarahibrahimabdelhaimd@gmail.com" >
  <i className="fa-brands fa-google lg:text-xl md:text-base sm:text-base"></i>
  </button>
  <button className="smIcon0" href='#' data-title="follow me on facebook" >
  <i className="fa-brands fa-facebook lg:text-xl md:text-base sm:text-base"></i>
  </button>
  <button className="smIcon0" href="#" data-title="follow me on whatsapp">
  <i className="fa-brands fa-whatsapp lg:text-xl md:text-base sm:text-base"></i></button>

  </div>

  <div className="flex flex-row justify-between items-center space-x-2 md:mt-4 sm:mt-4 ">
  <div className="self-center text-center  box-border flex flex-row items-center justify-between space-x-1 rounded-full bg-[#3234400a] w-auto px-5 py-2 xl:mt-0 lg:mt-0  ">
    <span className="text-xs block">  {profile?.posts?.length}
  </span>
  <span className="text-xs block">
  Articles
  </span>
  </div>

  {user._id === profile?._id &&
  (
    <a className={hoverEff? 'smIcon00' : ''} data-title="edit profile"
  onMouseEnter={()=>setHoverEff(true)}
  onMouseLeave={()=>{setHoverEff(false)}}
  onClick={()=>{setUpdateProfile(true);
    setHoverEff(false)
  }}>
  <i class="far fa-edit text-very-blue text-lg"></i>
        </a>
  )}



  </div>



            </div>

          </div>




          </section>

   <div className="box-border  grid   xl:gap-y-7 lg:gap-y-7 md:gap-y-2 sm:gap-y-2 ">

   <div className=" flex flex-row items-center text-blue-black h-[30px]">
          <h3 className="home-latest-post text-start" >
            <span className="!ml-2" >User Posts</span>
       </h3>
        </div>

              {

                userFilteredPosts.length > 0  ?


                userFilteredPosts?.map((post, index) => (
               <article key={index}  className="box-border w-full   bg-white h-auto p-5 grid grid-cols-12 rounded-2xl relative border-[1px] border-[#8589a038]  transition-all duration-[842.435ms] ease-in-out boxShadow">
                  <div className="box-border  w-full relative xl:col-span-4 lg:col-span-4 md:col-span-12  sm:col-span-12 h-auto md:mb-3 sm:mb-3">
                          <Link className="box-border w-full block image rounded-2xl  h-full overflow-hidden "
                          to={`/posts/details/${post?._id}`}>
                          <img src={post?.image?.url} alt={post?.title} className=" inline-block cursor-pointer rounded-2xl w-full  h-full object-cover transition-all duration-[.7s] ease-in-out hover:scale-[1.2]"/>
                          </Link>
                          <Link to={`/posts/categories/${post?.category}`}>
                          <span className=" inline-block w-auto  bottom-[30px] left-0  absolute bg-black text-white px-4 py-[7px] text-xs whitespace-normal">    {post?.category}
                      </span>
                          </Link>

                      </div>

                      <div className="box-border flex flex-col h-auto xl:justify-center lg:justify-center items-start md:space-y-5 sm:space-y-5  xl:col-span-8 lg:col-span-8 md:col-span-12 sm:col-span-12 m:mb-4 sm:mb-4 xl:p-5 lg:p-5 ">
                      <h3 className="title min-h-max  w-full ">
                      <a className=" titleLink  cursor-pointer w-full break-normal " href={`/posts/details/${post?._id}`}>
                          <span className="break-all text-blue-black font-bold text-lg hover:text-[#4776E6] ">
                              {post?.title}
                              </span>
                          </a>
                      </h3>
                      <div className="info flex flex-row items-center italic justify-between flex-nowrap min-h-[48px] ">
                          <div className="author flex flex-row items-center justify-between">
                              <div className="authorImage  min-w-max min-h-max">
                              <img src={profile?.profilePhoto?.url} alt="author" className="rounded-full w-12  h-12 object-cover"  />
                              </div>
                              <div>
                              <span className="mx-1 text-[13px] whitespace-nowrap ">By</span>
                          <Link className="font-bold text-[13px] whitespace-nowrap" >{profile?.username}</Link>
                              </div>

                          </div>
                          <div className="date whitespace-nowrap">
                              <span className="text-[13px] ">
                              {new Date(post?.createdAt).toDateString()}

                              </span>

                          </div>
                      </div>
                      <p className="text-sm leading-normal w-full overflow-hidden  h-[96px] ">
                          <span className="inline-block break-all h-full text-faint-gray">{post?.description}</span>
                      </p>

                      <Link className=  "hover:text-white min-h-[41.6px] box-border  hover:bg-[#4776E6] transition-all duration-500 ease-in-out  border-[1px] rounded-full py-2 px-7 mr-2"to={`/posts/details/${post?._id}`} >
                          <span className="text-inherit text-xs inline-block mr-1">
                              Read More
                          </span>
                          <i className=" fa-solid fa-chevron-up text-inherit rotate-90 text-xs" ></i>

                      </Link>

                      </div>



                      </article>


                                )):
                                (
                                  <div className='box-border w-full h-auto my-10 flex flex-col items-center justify-start '>


                                  <div className='box-border flex flex-row justify-center items-center  2xl:w-full xl:w-full lg:w-full md:w-[80%] sm:w-[80%] h-[40vh]' >
                                  <div  className='w-full h-full ' style={{'backgroundImage':`url(${myImage})` , 'backgroundRepeat' :'no-repeat' , 'backgroundPosition' :'center','backgroundSize' :'contain'}}>

                                  </div>
                                  </div>


                                      <p className='w-full  h-[10vh] text-blue-black font-semibold 2xl:3xl xl:text-3xl lg:text-2xl md:text-xl sm:text-base leading-tight text-center '>No Posts Were Found</p>

                                      </div>
                                )

              }

              {pages > 1 &&
              (
                <div className="self-center w-full flex flex-row justify-center items-center mt-11  ">

                <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                </div>

              ) }


  </div>





  {user?._id === profile?._id && updateProfile ? (



  <UpdatePRofileModal updateProfile={updateProfile} setUpdateProfile={setUpdateProfile} profile={profile} />


       ) : null}


      </div>
  ) : <Navigate to={'/'}/>}</>


  );
};

export default Profile;
