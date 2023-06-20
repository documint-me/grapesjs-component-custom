import loadComponents from "./components";
import loadBlocks from "./blocks";
import loadCommands from "./commands";
import defaultOptions from "./options";

export default (editor, opts = {}) => {
  const options = {
    ...defaultOptions,
    ...opts,
  };

  // Add components
  loadComponents(editor, options);

  // Add blocks
  loadBlocks(editor, options);

  // Add commands
  loadCommands(editor, options);
};
