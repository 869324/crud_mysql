import { useSelector } from "react-redux";

import styles from "./Header.module.css";

function Header(props) {
  const user = useSelector((state) => state.user);

  return (
    <nav>
      <div>
        <label>Project Manager</label>
        <label>Date</label>
      </div>
      <div>
        <label>{user.userName}</label>
      </div>
    </nav>
  );
}

export default Header;
