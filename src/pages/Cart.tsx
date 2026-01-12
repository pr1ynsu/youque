import "../styles/cart.css";
import { Settings, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const campuses = ["Campus 03", "Campus 06", "Campus 15", "Campus 17"];

export default function Cart() {
  const nav = useNavigate();
  const [fromOpen,setFromOpen] = useState(false);
  const [toOpen,setToOpen] = useState(false);
  const [from,setFrom] = useState("Campus 15");
  const [to,setTo] = useState("Campus 06");

  return (
    <div className="cart-root">

      <div className="cart-panel">

        <div className="cart-header">
          <div className="cart-avatar">U</div>
          <Settings size={18}/>
        </div>

        <button className="cart-action" onClick={()=>nav("/cart-around")}>
          Cart around you
        </button>

        <div className="cart-route-box">
          {[{label:"From",val:from,set:setFrom,open:fromOpen,setOpen:setFromOpen},
            {label:"To",val:to,set:setTo,open:toOpen,setOpen:setToOpen}].map((r,i)=>(
            <div className="route-card" key={i}>
              <p>{r.label}</p>
              <div className="route-select" onClick={()=>r.setOpen(!r.open)}>
                {r.val} <ChevronDown size={14}/>
              </div>
              {r.open && (
                <div className="route-menu">
                  {campuses.map(c=>(
                    <span key={c} onClick={()=>{r.set(c);r.setOpen(false);}}>{c}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <button className="cart-action" onClick={()=>nav("/detail")}>
          Break – 02:00
        </button>
      </div>

      <div className="cart-map-frame">
        <iframe src="https://www.google.com/maps?q=KIIT+Campus+6&output=embed"/>
      </div>
    </div>
  );
}
