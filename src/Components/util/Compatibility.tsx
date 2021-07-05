import * as ZapparThree from "@zappar/zappar-threejs";

import { useEffect, useState } from "react";
import { Props } from "../../spec";

/**
 * Shows a full-page dialog that informs the user they're using an unsupported browser,
 * and provides a button to 'copy' the current page URL so they can 'paste' it into the
 * address bar of a compatible alternative.
 */
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
