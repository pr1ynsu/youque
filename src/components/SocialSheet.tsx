import "../styles/sheet.css";


import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import twitter from "../assets/twitter.png";
import linkedin from "../assets/linkedin.png";
import youtube from "../assets/youtube.png";

export default function SocialSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />
        <h3 className="sheet-title">Follow YouQue</h3>

        <div className="sheet-grid">

          <div className="social-icon" onClick={() => window.open("https://facebook.com", "_blank")}>
            <img src={facebook} />
          </div>

          <div className="social-icon" onClick={() => window.open("https://instagram.com", "_blank")}>
            <img src={instagram} />
          </div>

          <div className="social-icon" onClick={() => window.open("https://twitter.com", "_blank")}>
            <img src={twitter} />
          </div>

          <div className="social-icon" onClick={() => window.open("https://linkedin.com", "_blank")}>
            <img src={linkedin} />
          </div>

          <div className="social-icon" onClick={() => window.open("https://youtube.com", "_blank")}>
            <img src={youtube} />
          </div>
        </div>
      </div>
    </div>
  );
}
