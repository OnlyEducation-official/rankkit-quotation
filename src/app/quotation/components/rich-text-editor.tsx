// "use client";

// import { EditorContent, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";

// interface RichTextEditorProps {
//   value: string;
//   onChange: (value: string) => void;
// }

// export default function RichTextEditor({
//   value,
//   onChange,
// }: RichTextEditorProps) {
//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: value,
//     immediatelyRender: false,
//     onUpdate: ({ editor }) => {
//       onChange(editor.getHTML());
//     },
//   });

//   if (!editor) return null;

//   return (
//     <div className="border rounded-md p-3 bg-white">
//       <div className="flex gap-2 mb-3 flex-wrap">
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleBold().run()}
//           className="px-2 py-1 border rounded"
//         >
//           Bold
//         </button>

//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleItalic().run()}
//           className="px-2 py-1 border rounded"
//         >
//           Italic
//         </button>

//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleBulletList().run()}
//           className="px-2 py-1 border rounded"
//         >
//           Bullet List
//         </button>

//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleOrderedList().run()}
//           className="px-2 py-1 border rounded"
//         >
//           Numbered List
//         </button>
//       </div>

//       <EditorContent editor={editor} className="min-h-[150px]" />
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { mergeRegister } from "@lexical/utils";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
  type ElementFormatType,
} from "lexical";

import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  HeadingNode,
  QuoteNode,
} from "@lexical/rich-text";

import {
  $createLinkNode,
  $isLinkNode,
  LinkNode,
} from "@lexical/link";

import {
  $createListNode,
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListItemNode,
  ListNode,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

type BlockType =
  | "paragraph"
  | "h1"
  | "h2"
  | "quote"
  | "bullet"
  | "number";

function ToolbarButton({
  label,
  onClick,
  active = false,
  disabled = false,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "px-3 py-1.5 text-sm border rounded-md transition",
        active ? "bg-black text-white border-black" : "bg-white text-black",
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-8 bg-gray-200 mx-1" />;
}

function getSelectedBlockType(): BlockType {
  const selection = $getSelection();

  if (!$isRangeSelection(selection)) {
    return "paragraph";
  }

  const anchorNode = selection.anchor.getNode();
  const topLevel =
    anchorNode.getKey() === "root"
      ? anchorNode
      : anchorNode.getTopLevelElementOrThrow();

  if ($isHeadingNode(topLevel)) {
    const tag = topLevel.getTag();
    if (tag === "h1") return "h1";
    if (tag === "h2") return "h2";
  }

  if (topLevel.getType() === "quote") {
    return "quote";
  }

  if ($isListNode(topLevel)) {
    return topLevel.getListType() === "bullet" ? "bullet" : "number";
  }

  const parent = topLevel.getParent();
  if ($isListNode(parent)) {
    return parent.getListType() === "bullet" ? "bullet" : "number";
  }

  return "paragraph";
}

function setBlockType(editor: ReturnType<typeof useLexicalComposerContext>[0], type: BlockType) {
  editor.update(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return;

    const anchorNode = selection.anchor.getNode();
    const topLevel = anchorNode.getTopLevelElementOrThrow();

    if (type === "paragraph") {
      topLevel.replace($createParagraphNode());
      return;
    }

    if (type === "h1") {
      topLevel.replace($createHeadingNode("h1"));
      return;
    }

    if (type === "h2") {
      topLevel.replace($createHeadingNode("h2"));
      return;
    }

    if (type === "quote") {
      topLevel.replace($createQuoteNode());
      return;
    }

    if (type === "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
      return;
    }

    if (type === "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    }
  });
}

function Toolbar() {
  const [editor] = useLexicalComposerContext();

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [blockType, setBlockTypeState] = useState<BlockType>("paragraph");
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            setIsBold(selection.hasFormat("bold"));
            setIsItalic(selection.hasFormat("italic"));
            setIsUnderline(selection.hasFormat("underline"));
            setIsStrikethrough(selection.hasFormat("strikethrough"));
            setBlockTypeState(getSelectedBlockType());
          }
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            setIsBold(selection.hasFormat("bold"));
            setIsItalic(selection.hasFormat("italic"));
            setIsUnderline(selection.hasFormat("underline"));
            setIsStrikethrough(selection.hasFormat("strikethrough"));
            setBlockTypeState(getSelectedBlockType());
          }
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor]);

  const applyAlignment = (alignment: ElementFormatType) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment);
  };

  const handleLink = () => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      const node = selection.anchor.getNode();
      const parent = node.getParent();

      if ($isLinkNode(parent)) {
        parent.replace(parent.getChildren()[0] ?? node);
        return;
      }

      const url = window.prompt("Enter URL");
      if (!url) return;

      const linkNode = $createLinkNode(url);
      selection.insertNodes([linkNode]);
    });
  };

  return (
    <div className="flex flex-wrap gap-2 border-b pb-3 mb-3">
      <ToolbarButton
        label="Undo"
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        disabled={!canUndo}
      />
      <ToolbarButton
        label="Redo"
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        disabled={!canRedo}
      />

      <Divider />

      <select
        value={blockType}
        onChange={(e) => setBlockType(editor, e.target.value as BlockType)}
        className="px-3 py-1.5 text-sm border rounded-md bg-white"
      >
        <option value="paragraph">Paragraph</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="quote">Quote</option>
        <option value="bullet">Bullet List</option>
        <option value="number">Numbered List</option>
      </select>

      <Divider />

      <ToolbarButton
        label="B"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        active={isBold}
      />
      <ToolbarButton
        label="I"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        active={isItalic}
      />
      <ToolbarButton
        label="U"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        active={isUnderline}
      />
      <ToolbarButton
        label="S"
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
        }
        active={isStrikethrough}
      />

      <Divider />

      <ToolbarButton
        label="• List"
        onClick={() =>
          blockType === "bullet"
            ? editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
            : editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
        }
        active={blockType === "bullet"}
      />
      <ToolbarButton
        label="1. List"
        onClick={() =>
          blockType === "number"
            ? editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
            : editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
        }
        active={blockType === "number"}
      />

      <Divider />

      <ToolbarButton label="Left" onClick={() => applyAlignment("left")} />
      <ToolbarButton label="Center" onClick={() => applyAlignment("center")} />
      <ToolbarButton label="Right" onClick={() => applyAlignment("right")} />

      <Divider />

      <ToolbarButton label="Link" onClick={handleLink} />
    </div>
  );
}

function HtmlSyncPlugin({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [editor] = useLexicalComposerContext();
  const lastHtmlRef = useRef("");

  useEffect(() => {
    const incoming = value || "";

    if (incoming === lastHtmlRef.current) return;

    editor.update(() => {
      const root = $getRoot();
      root.clear();

      if (!incoming.trim()) {
        root.append($createParagraphNode());
        lastHtmlRef.current = "";
        return;
      }

      const parser = new DOMParser();
      const dom = parser.parseFromString(incoming, "text/html");
      const nodes = $generateNodesFromDOM(editor, dom);

      if (nodes.length === 0) {
        root.append($createParagraphNode());
      } else {
        root.append(...nodes);
      }

      lastHtmlRef.current = incoming;
    });
  }, [editor, value]);

  return (
    <OnChangePlugin
      onChange={(editorState, editorInstance) => {
        editorState.read(() => {
          const html = $generateHtmlFromNodes(editorInstance, null);
          lastHtmlRef.current = html;
          onChange(html);
        });
      }}
    />
  );
}

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const initialConfig = {
    namespace: "RichTextEditor",
    theme: {
      paragraph: "mb-2",
      quote: "border-l-4 border-gray-300 pl-4 italic text-gray-700 my-2",
      heading: {
        h1: "text-3xl font-bold my-3",
        h2: "text-2xl font-semibold my-2",
      },
      text: {
        bold: "font-bold",
        italic: "italic",
        underline: "underline",
        strikethrough: "line-through",
      },
      list: {
        ul: "list-disc pl-6 my-2",
        ol: "list-decimal pl-6 my-2",
        listitem: "my-1",
      },
      link: "text-blue-600 underline",
    },
    onError(error: Error) {
      throw error;
    },
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="border rounded-md p-3 bg-white">
        <Toolbar />

        <RichTextPlugin
          contentEditable={
            <ContentEditable className="min-h-[180px] outline-none" />
          }
          placeholder={
            <div className="text-gray-400 pointer-events-none">
              Start typing...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
        <HtmlSyncPlugin value={value} onChange={onChange} />
      </div>
    </LexicalComposer>
  );
}