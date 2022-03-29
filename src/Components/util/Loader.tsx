import { useEffect } from "react";
import * as ZapparThree from "@zappar/zappar-threejs";
import { Props } from "../../spec";

/**
 * Creates a THREE.DefaultLoadingManager which is applied to all assets that can be loaded.
 * @see https://docs.zap.works/universal-ar/web-libraries/threejs/loading-manager/
 */
function ZapparLoader(props: Props.Loader) {
  const { style, onLoad } = props;

  useEffect(() => {
    const loader = new ZapparThree.DefaultLoaderUI({
      style: style as any,
      onLoad,
    });
    return () => loader.dispose();
  }, [props]);

  return null;
}

export default ZapparLoader;
