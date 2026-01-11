import "../styles/downloadSheet.css";
import app from "../assets/app.png";
import play from "../assets/play.png";

export default function DownloadSheet({
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
        <h3>Download YouQue</h3>

        <div className="store-row">
          <img src={app} onClick={() => window.open("https://apple.com/app-store")} />
          <img src={play} onClick={() => window.open("https://play.google.com/store")} />
        </div>
      </div>
    </div>
  );
}
