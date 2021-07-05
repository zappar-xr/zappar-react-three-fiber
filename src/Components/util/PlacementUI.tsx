import React, { CSSProperties, useEffect, useLayoutEffect, useState } from "react";
import { Html } from "@react-three/drei";
import { Props } from "../../spec";

const style: CSSProperties = {
  position: "absolute",
  bottom: "5%",
  width: "200px",
  left: "calc(50% - 100px)",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  color: "white",
  textAlign: "center",
  fontFamily: "sans-serif",
  padding: "10px",
  userSelect: "none",
  borderRadius: "5px",
};

/**
 * Renders a button which toggles the current placementMode.
 */
const PlacementUI = ({ onInteract, placementType }: Props.PlacementUI) => {
  const [placementMode, setPlacementMode] = useState(true);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    onInteract(placementMode);
  }, [placementMode]);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;
  if (placementType === "placement-only" && !placementMode) return null;

  return (
    <Html fullscreen style={{ left: "0px", top: "0px" }}>
      <div style={{ width: "100%", height: "100%", position: "absolute", backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
        <div
          id="ZapparPlacementUIHelper"
          role="button"
          style={style}
          tabIndex={0}
          onKeyPress={() => {
            setPlacementMode((currentPlacementMode) => !currentPlacementMode);
          }}
          onClick={() => {
            setPlacementMode((currentPlacementMode) => !currentPlacementMode);
          }}
        >
          Tap here to
          {placementMode ? " place " : " pick up "}
          the object
        </div>
      </div>
    </Html>
  );
};

export default PlacementUI;
