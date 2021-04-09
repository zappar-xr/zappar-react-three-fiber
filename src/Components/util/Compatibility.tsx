import * as ZapparThree from "@zappar/zappar-threejs";

import { useEffect, useState } from "react";
import { Props } from "../../spec";

const compatibility = (props: Props.browserCompatibility) => {
  const { fallback } = props;

  const [browserCompatible, setBrowserCompatible] = useState<boolean>(true);

  useEffect(() => {
    setBrowserCompatible(!ZapparThree.browserIncompatible());
    // No custom fallback and browser incompatible.
    if (!browserCompatible && !fallback) {
      ZapparThree.browserIncompatibleUI();
    }
  }, []);

  if (fallback && !browserCompatible) return fallback;
  return null;
};

export default compatibility;
