import "../styles/sheet.css";

import instagram from "../assets/instagram.png";
import twitter from "../assets/twitter.png";
import linkedin from "../assets/linkedin.png";

export default function SocialSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  const socials = [
    {
      name: "Instagram",
      icon: instagram,
      link: "https://instagram.com",
    },
    {
      name: "Twitter",
      icon: twitter,
      link: "https://twitter.com",
    },
    {
      name: "LinkedIn",
      icon: linkedin,
      link: "https://linkedin.com",
    },
  ];

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>

        <div className="sheet-handle" />

        <h3 className="sheet-title">Connect with YouQue</h3>
        <p className="sheet-subtitle">
          Stay updated. Follow the journey.
        </p>

        <div className="social-list">
          {socials.map((item) => (
            <div
              key={item.name}
              className="social-row"
              onClick={() => window.open(item.link, "_blank")}
            >
              <img src={item.icon} alt={item.name} />
              <span>{item.name}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}