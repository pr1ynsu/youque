const safeRender = (val: any): string => {
  // null / undefined
  if (val === null || val === undefined) return "";

  // Firestore timestamp
  if (typeof val === "object") {
    if ("seconds" in val && typeof val.seconds === "number") {
      return new Date(val.seconds * 1000).toLocaleString();
    }

    // location object
    if ("lat" in val && "lng" in val) {
      return `${val.lat}, ${val.lng}`;
    }

    // fallback
    try {
      return JSON.stringify(val);
    } catch {
      return "";
    }
  }

  // normal values (string, number, boolean)
  return String(val);
};

export default safeRender;