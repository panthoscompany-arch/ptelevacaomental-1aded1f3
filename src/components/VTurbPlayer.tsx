import React, { useEffect, useRef } from "react";

const VTURB_SCRIPT_ID = "vturb-player-script-69642f3d93850164e9ff97e3";
const VTURB_SCRIPT_SRC =
  "https://scripts.converteai.net/930d9485-c45e-4f04-a322-39acad49f75c/players/69642f3d93850164e9ff97e3/v4/player.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "vturb-smartplayer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export const VTurbPlayer = () => {
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    if (!document.querySelector(`#${VTURB_SCRIPT_ID}`)) {
      const script = document.createElement("script");
      script.id = VTURB_SCRIPT_ID;
      script.src = VTURB_SCRIPT_SRC;
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* VTurb smartplayer element rendered directly so the external script can hydrate it */}
      <vturb-smartplayer
        id="vid-69642f3d93850164e9ff97e3"
        style={{ display: "block", margin: "0 auto", width: "100%", maxWidth: 400 }}
      />
    </div>
  );
};

export default VTurbPlayer;
