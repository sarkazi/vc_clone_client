import React from "react";

import delimiter from "@editorjs/delimiter";
import embed from "@editorjs/embed";
import list from "@editorjs/list";
import header from "@editorjs/header";
import quote from "@editorjs/quote";
import image from "@editorjs/image";
import link from "@editorjs/link";
import code from "@editorjs/code";
import table from "@editorjs/table";
import simpleImage from "@editorjs/simple-image";
import checklist from "@editorjs/checklist";
import marker from "@editorjs/marker";

import EditorJs, { OutputData } from "@editorjs/editorjs";

interface EditorProps {
  onChange: (blocks: OutputData["blocks"]) => void;
  value: OutputData["blocks"];
}

const CustomEditor: React.FC<EditorProps> = ({ onChange, value }) => {
  const tools = {
    embed: embed,
    list: list,
    header: {
      class: header,
      config: {
        placeholder: "Заголовок",
      },
    },
    delimiter: delimiter,
    quote: {
      class: quote,
      config: {
        placeholder: "Цитата",
      },
    },
    image: image,
    link: link,
    code: code,
    table: table,
    simpleImage: simpleImage,
    checklist: checklist,
    marker: marker,
  };

  let editor: boolean | {} = false;
  React.useEffect(() => {
    if (!editor) {
      editor = new EditorJs({
        holder: "editor",
        tools,
        placeholder: "Нажмите tab для выбора инструмента",
        inlineToolbar: true,
        async onChange() {
          const { blocks } = await editor.save();
          onChange(blocks);
        },
        data: {
          blocks: value,
        },
      });
    }
  }, []);

  return <div id="editor"></div>;
};

export default CustomEditor;
