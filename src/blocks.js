import { typeCustomCode } from "./consts";

export const customCodeBlock = {
  label: "Custom Code",
  media: `
      <svg viewBox="0 0 24 24">
        <path d="M14.6 16.6l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4m-5.2 0L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z"></path>
      </svg>
    `,
  category: "Content",
  activate: true,
  select: true,
  content: { type: typeCustomCode },
};

export default (editor, options) => {
  const bm = editor.BlockManager;

  const { blocks = [], blockCustomCode = {} } = options;

  if (!blocks || !Array.isArray(blocks)) return;
  if (blocks.includes(typeCustomCode))
    bm.add(typeCustomCode, { ...customCodeBlock, ...blockCustomCode });
};
