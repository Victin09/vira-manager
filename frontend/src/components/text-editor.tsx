import React, { useLayoutEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

type TextEditorProps = {
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange: (text: string) => void;
};

const quillConfig = {
  theme: "snow",
  modules: {
    toolbar: "#toolbar-container",
  },
};

export const TextEditor = ({
  placeholder,
  defaultValue,
  // we're not really feeding new value to quill instance on each render because it's too
  // expensive, but we're still accepting 'value' prop as alias for defaultValue because
  // other components like <Form.Field> feed their children with data via the 'value' prop
  value: alsoDefaultValue,
  onChange,
}: TextEditorProps) => {
  useLayoutEffect(() => {
    let quill = new Quill("#editor-container", { placeholder, ...quillConfig });

    const handleContentsChange = () => {
      onChange(getHTMLValue());
    };
    const getHTMLValue = () => quill.root.innerHTML;

    quill.on("text-change", handleContentsChange);
    return () => {
      quill.off("text-change", handleContentsChange);
    };
  }, []);

  return (
    <div id="standalone-container">
      <div id="toolbar-container" className="rounded-top">
        <span className="ql-formats">
          <select className="ql-font">
            <option selected>Sans Serif</option>
            <option value="inconsolata">Inconsolata</option>
            <option value="roboto">Roboto</option>
            <option value="mirza">Mirza</option>
            <option value="arial">Arial</option>
          </select>
          {/* <select className="ql-font"></select> */}
          <select className="ql-size"></select>
        </span>
        <span className="ql-formats">
          <button className="ql-bold"></button>
          <button className="ql-italic"></button>
          <button className="ql-underline"></button>
          <button className="ql-strike"></button>
        </span>
        <span className="ql-formats">
          <select className="ql-color"></select>
          <select className="ql-background"></select>
        </span>
        {/* <span className="ql-formats">
          <button className="ql-script" value="sub"></button>
          <button className="ql-script" value="super"></button>
        </span> */}
        <span className="ql-formats">
          <button className="ql-header" value="1"></button>
          <button className="ql-header" value="2"></button>
          <button className="ql-blockquote"></button>
          <button className="ql-code-block"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-list" value="ordered"></button>
          <button className="ql-list" value="bullet"></button>
          <button className="ql-indent" value="-1"></button>
          <button className="ql-indent" value="+1"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-direction" value="rtl"></button>
          <select className="ql-align"></select>
        </span>
        <span className="ql-formats">
          <button className="ql-link"></button>
          <button className="ql-image"></button>
          <button className="ql-video"></button>
          {/* <button className="ql-formula"></button> */}
        </span>
        <span className="ql-formats">
          <button className="ql-clean"></button>
        </span>
      </div>
      <div id="editor-container" className="rounded-bottom"></div>
    </div>
  );
};
