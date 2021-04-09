import { useEffect } from "react";
import * as ZapparThree from "@zappar/zappar-threejs";
import { Props } from "../../spec";

// eslint-disable-next-line no-unused-vars
const ZapparLoader = (props: Props.Loader) => {
  const { style, onLoad } = props;

  useEffect(() => {
    const loader = new ZapparThree.DefaultLoaderUI({
      style: style as any,
      onLoad,
    });
    return () => loader.dispose();
  }, [props]);

  return null;
};

export default ZapparLoader;
