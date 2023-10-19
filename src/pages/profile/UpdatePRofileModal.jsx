import "./UpdateProfileModal.css";
import { toast} from "react-toastify";
import { useState } from "react";

const user = {
    username: "sarah",
    bio: "hello im sarah",
  };


const UpdatePRofileModal = ({ setUpdateProfile }) => {
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [password, setPassword] = useState("");


  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const updatedUser = {
      username,
      bio,
    };

    if (password.trim() !== "") {
      updatedUser.password = password;
    }
    console.log(updatedUser);
  };


  return (
    <div className="update-profile">
      <form onSubmit={formSubmitHandler} className="update-profile-form">
        <abbr title="close">
          <i
            onClick={() => setUpdateProfile(false)}
            className="bi bi-x-circle-fill update-profile-form-close"
          ></i>
        </abbr>
        <h1 className="update-profile-title">Update Profile</h1>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          className="update-profile-input"
          placeholder="username"
        />

        <input
          onChange={(e) => setBio(e.target.value)}
          value={bio}
          type="text"
          className="update-profile-input"
          placeholder="bio"
        />

<input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="update-profile-input"
          placeholder="password"
        />

        <button type="submit" className="update-profile-btn">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdatePRofileModal;
