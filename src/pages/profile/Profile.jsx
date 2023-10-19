import PostList from "../../components/posts/PostList";
import "./Profile.css";
import { posts } from "../../dummyData";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import swal from 'sweetalert'
import UpdatePRofileModal from "./UpdatePRofileModal"
const Profile = () => {

    const[image, setImage] = useState(null);
    const[updateProfile, setUpdateProfile] = useState(false);


    useEffect(()=>{
        window.scrollTo(0,0);

    },[])

    const formHandler = (e) =>{

        e.preventDefault();
        if(!image) toast.warning('please upload image');
        console.log('image uploaded')


    };

    const deleteAccountHandler = () => {
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this comment!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            swal("Account has been deleted!", {
              icon: "success",
            });
          } else {
            swal("Something went wrong!");
          }
        });
      };

  return (
    <section className="profile">
      <div className="profile-header">
      <div className="profile-image-wrapper">
          <img src= {image? URL.createObjectURL(image): "/images/user-avatar.png"} alt="" className="profile-image" />
          <form onSubmit={formHandler}>
          <abbr title="choose profile photo">
            <label
              htmlFor="image"
              className="bi bi-camera-fill upload-profile-photo-icon"
            ></label>
          </abbr>
            <input
              type="file"
              name="image"
              id="image"
              style={{ display: "none" }}
              onChange={(e)=>setImage(e.target.files[0])}
            />
            <button type="submit" className="upload-profile-photo-btn">upload</button>
          </form>
        </div>
        <h1 className="profile-username">sarah ibrahim</h1>
        <p className="profile-bio">hello my name is sarah</p>
        <div className="user-date-joined">
          <strong>Date joined:</strong>
          <span>Fri nov 04 2022</span>
        </div>
        <button className="profile-update-btn" onClick={()=>setUpdateProfile(true)}>
          <i className="bi bi-file-person-fill"></i>
          update profile
        </button>
      </div>
      <div className="profile-posts-list">
        <h2>sarah posts</h2>
        <PostList posts={posts} />
      </div>
      <button onClick={deleteAccountHandler} className="delete-account-btn">delete your account</button>

    {updateProfile && (<UpdatePRofileModal setUpdateProfile={setUpdateProfile}/>)}
    </section>
  );
};

export default Profile;
