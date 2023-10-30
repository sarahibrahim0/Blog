import PostList from "../../components/posts/PostList";
import "./Profile.css";
import { posts } from "../../dummyData";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import UpdatePRofileModal from "./UpdatePRofileModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProfile,
  getUserProfile,
  uploadProfilePhoto,
} from "../../redux/apiCalls/profileApiCalls";
import { useNavigate, useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import{ logoutUser} from "../../redux/apiCalls/authApiCall"
import PostItem from "../../components/posts/PostItem";
const Profile = () => {
  const [image, setImage] = useState(null);
  const [updateProfile, setUpdateProfile] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();
  const { profile, loading, isProfileDeleted } = useSelector(
    (state) => state.profile
  );
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUserProfile(id));
    window.scrollTo(0, 0);
  }, [user]);

  useEffect(() => {
    if(isProfileDeleted){
      navigate('/');
    }
  }, [isProfileDeleted, navigate]);

  const formHandler = (e) => {
    e.preventDefault();
    if (!image) toast.warning("please upload image");
    const formData = new FormData();
    formData.append("image", image);
    dispatch(uploadProfilePhoto(formData));
  };

  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
   dispatch(deleteProfile(user?._id));
dispatch(logoutUser());
      }
    });
  };
  if (loading) {
    return (
      <div className="profile-loader">
        <Oval
          height={120}
          width={120}
          color="#000"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="grey"
          strokeWidth={3}
          strokeWidthSecondary={3}
        />
      </div>
    );
  }

  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img
            src={image ? URL.createObjectURL(image) : profile?.profilePhoto.url}
            alt=""
            className="profile-image"
          />
          {user?._id === profile?._id ? (
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
                onChange={(e) => setImage(e.target.files[0])}
              />
              <button type="submit" className="upload-profile-photo-btn">
                upload
              </button>
            </form>
          ) : null}
        </div>

        <h1 className="profile-username">{profile?.username}</h1>
        <p className="profile-bio">{profile?.bio}</p>
        <div className="user-date-joined">
          <strong>Date joined:</strong>
          <span> {new Date(profile?.createdAt).toDateString()}</span>
        </div>
        {user?._id === profile?._id ? (
          <button
            className="profile-update-btn"
            onClick={() => setUpdateProfile(true)}
          >
            <i className="bi bi-file-person-fill"></i>
            update profile
          </button>
        ) : null}
      </div>
      {profile?.posts?.length > 0 && (
        <div className="profile-posts-list">
          <h2>{profile?.username} posts</h2>
          {profile?.posts?.map((post) => (
            <PostItem
              key={post?._id}
              post={post}
              username={profile?.username}
              userId={profile?._id}
            />
          ))}
        </div>
      )}
      {user?._id === profile?._id ? (
        <button onClick={deleteAccountHandler} className="delete-account-btn">
          delete your account
        </button>
      ) : null}

      {user?._id === profile?._id && updateProfile ? (
        <UpdatePRofileModal
          profile={profile}
          setUpdateProfile={setUpdateProfile}
        />
      ) : null}
    </section>
  );
};

export default Profile;
