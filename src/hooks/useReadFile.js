import { useState, useEffect } from "react";

export const useReadFileToText = ({ file }) => {
  const [text, setText] = useState("");
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = function() {
        if (reader.result) {
          setText(reader.result);
        }
      };
      reader.readAsText(file);
    }
  }, [file]);
  return { text };
};
