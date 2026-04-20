import { useContext } from "react";
import { UserContext } from "../App";
import "./UserBar.css";

const UserBar = () => {
  const { currentUser, logout } = useContext(UserContext);
  return (
    <div className="UserBar">
      <span className="nickname">{currentUser?.nickname} 님</span>
      <button className="logout_btn" onClick={logout}>
        로그아웃
      </button>
    </div>
  );
};

export default UserBar;
