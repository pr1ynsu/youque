import { useState } from "react";
import Admin from "../Admin";
import UserCart from "./UserCart";
import Tracking from "./Tracking";
import "../../styles/staff.css";

export default function StaffCart() {
  const [tab, setTab] = useState("control");

  return (
    <div className="staff-root">

      <h2 className="staff-title">Admin Dashboard</h2>

      <div className="staff-tabs">
        <button className={tab==="control"?"active":""} onClick={()=>setTab("control")}>Control</button>
        <button className={tab==="monitor"?"active":""} onClick={()=>setTab("monitor")}>Monitor</button>
        <button className={tab==="booking"?"active":""} onClick={()=>setTab("booking")}>Booking</button>
      </div>

      <div className="staff-content">
        {tab==="control" && <Admin />}
        {tab==="monitor" && <Tracking />}
        {tab==="booking" && <UserCart />}
      </div>

    </div>
  );
}