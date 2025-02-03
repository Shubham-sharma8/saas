import { useEffect } from "react";

const BuyMeAPizza = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js";
    script.setAttribute("data-name", "bmc-button");
    script.setAttribute("data-slug", "cogify"); // Your BuyMeACoffee username
    script.setAttribute("data-color", "#FFDD00");
    script.setAttribute("data-emoji", "🍕");
    script.setAttribute("data-font", "Cookie");
    script.setAttribute("data-text", "Buy me a pizza");
    script.setAttribute("data-outline-color", "#000000");
    script.setAttribute("data-font-color", "#000000");
    script.setAttribute("data-coffee-color", "#ffffff");
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex justify-center">
      <a href="https://www.buymeacoffee.com/cogify" target="_blank" rel="noopener noreferrer">
        <img
          src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
          alt="Buy Me a Pizza"
          className="h-10"
        />
      </a>
    </div>
  );
};

export default BuyMeAPizza;
