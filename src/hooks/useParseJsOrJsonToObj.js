import { useState, useEffect } from "react";
import _endsWidth from "lodash/endsWith";
import { useReadFileToText } from "./useReadFile";

const useParseJsOrJsonToObj = file => {
  const [i18nConfig, setConfig] = useState(null);
  const isJs = _endsWidth(file && file.name, ".js");
  const { text } = useReadFileToText({ file });
  useEffect(() => {
    if (!text) {
      return;
    }
    if (!isJs) {
      const config = JSON.parse(text);
      setConfig(config);
    } else {
      const firstAnchor = text.indexOf("{");
      const lastAnchor = text.lastIndexOf("}") + 1;
      const newText = text.slice(firstAnchor, lastAnchor);
      const evalCode =
        "const i18nConfigObj = " +
        newText +
        "; \n window.i18nConfig = i18nConfigObj";
      eval(evalCode);
      setConfig(window.i18nConfig);
    }
  }, [text]);
  return { i18nConfig };
};

export default useParseJsOrJsonToObj;
