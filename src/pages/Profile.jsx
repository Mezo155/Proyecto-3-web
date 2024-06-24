import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h1>Profile</h1>
      <p>{user?.email}</p>
    </div>
  );
};

export default Profile;
