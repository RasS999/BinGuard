// Website Logo Admin
import { useEffect } from "react";
import logo from "assets/img/layout/logo.png";

export default function Favicon() {
  useEffect(() => {
    // Standard favicon
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = logo;

    // Apple touch icon
    let appleLink = document.querySelector("link[rel~='apple-touch-icon']");
    if (!appleLink) {
      appleLink = document.createElement("link");
      appleLink.rel = "apple-touch-icon";
      document.head.appendChild(appleLink);
    }
    appleLink.href = logo;
  }, []);

  return null;
}
