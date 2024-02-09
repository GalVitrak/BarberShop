import { Navigate, Route, Routes } from "react-router-dom";

import "./Routing.css";
// import Gallery from "../Home/Gallery/Gallery";
import Login from "../Home/SignIn/SignIn";

function Routing(this: unknown): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        {/* <Route path="/gallery" element={<Gallery/>}/> */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default Routing;
