// import { useLayoutEffect } from "react";
// import suneditor from "suneditor";
// import plugins from "suneditor/src/plugins";
// import { es } from "suneditor/src/lang";

// import "suneditor/dist/css/suneditor.min.css";

// export const TextEditor = () => {
//   useLayoutEffect(() => {
//     const editor = suneditor.create("editor", {
//       plugins: plugins,
//       buttonList: [
//         [
//           ":p-More Paragraph-default.more_paragraph",
//           // "font",
//           "fontSize",
//           "formatBlock",
//         ],
//         // ["paragraphStyle", "blockquote"],
//         ["bold", "underline", "italic", "strike"],
//         ["fontColor", "hiliteColor"],
//         // "/", // Line break
//         ["outdent", "indent"],
//         ["align", "horizontalRule", "list"],
//         ["table", "link", "image", "video" /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
//         /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
//         /** ['dir', 'dir_ltr', 'dir_rtl'] */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
//       ],
//       lang: es,
//       font: ["Roboto"],
//     });

//     editor.setDefaultStyle("font-family: Roboto, sans-serif;");

//     editor.onChange = function (contents, core) {
//       console.log("onChange", contents);
//     };
//   }, []);

//   return (
//     <textarea id="editor" className="border border-primary">
//       Hi
//     </textarea>
//   );
// };


