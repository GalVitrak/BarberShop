import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="login">
        <button onClick={()=>{
          navigate("/login");
        }}>התחברות</button>
      </div>
      <div className="menu">
        <button className="barber-button">קביעת תורים</button>
        <img
          className="logo"
          src={"./assets/logo.jpeg"}
          alt="logo"
          onClick={() => {
            navigate("/home");
          }}
        />
        <button className="barber-button"
          onClick={() => {
            navigate("/gallery");
          }}
        >
          גלריה
        </button>
      </div>
      <div></div>
    </div>
  );
}

export default Header;