import "../styles/cart.css";
import { Settings, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const campuses = ["campus 01","campus 03","campus 06","campus 15","campus 17"];

export default function Cart() {
  const nav = useNavigate();
  const [fromOpen,setFromOpen] = useState(false);
  const [toOpen,setToOpen] = useState(false);
  const [from,setFrom] = useState("campus 15");
  const [to,setTo] = useState("campus 06");

  return (
    <div className="cart-root">

      <div className="cart-panel">

        <div className="cart-header">
          <div className="cart-user">
            <div className="cart-avatar">U</div>
            <span>user</span>
          </div>
          <Settings size={20} />
        </div>

        <button className="cart-around" onClick={()=>nav("/cart-around")}>
          cart around you
        </button>

        <div className="cart-route-box">

          <div className="route-card">
            <p>from</p>
            <div className="route-select" onClick={()=>setFromOpen(!fromOpen)}>
              {from} <ChevronDown size={14}/>
            </div>
            {fromOpen && (
              <div className="route-menu">
                {campuses.map(c=>(
                  <span key={c} onClick={()=>{setFrom(c);setFromOpen(false);}}>{c}</span>
                ))}
              </div>
            )}
          </div>

          <div className="route-card">
            <p>to</p>
            <div className="route-select" onClick={()=>setToOpen(!toOpen)}>
              {to} <ChevronDown size={14}/>
            </div>
            {toOpen && (
              <div className="route-menu">
                {campuses.map(c=>(
                  <span key={c} onClick={()=>{setTo(c);setToOpen(false);}}>{c}</span>
                ))}
              </div>
            )}
          </div>

        </div>

        <button className="cart-break" onClick={()=>nav("/detail")}>
          break - 02:00
        </button>
      </div>

      <div className="cart-map-frame">
        <iframe src="https://www.google.com/maps?q=KIIT+Campus+6&output=embed" />
      </div>
    </div>
  );
}
