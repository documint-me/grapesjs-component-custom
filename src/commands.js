import { commandNameCustomCode, keyCustomCode } from "./consts";

export default (editor, opts = {}) => {
  const { modalTitle, codeViewOptions, commandCustomCode } = opts;

  const appendToContent = (target, content) => {
    if (content instanceof HTMLElement) {
      target.appendChild(content);
    } else if (content) {
      target.insertAdjacentHTML("beforeend", content);
    }
  };

  // Add the custom code command
  editor.Commands.add(commandNameCustomCode, {
    keyCustomCode,
    target: null,
    codeViewer: null,

    run(editor, s, opts = {}) {
      const target = opts.target || editor.getSelected();
      this.target = target;

      if (target && target.get("editable")) {
        this.showCustomCode(target, opts);
      }
    },

    stop(editor) {
      editor.Modal.close();
    },

    /**
     * Method which tells how to show the custom code
     * @param  {Component} target
     */
    showCustomCode(target, options) {
      const title = options.title || modalTitle;
      const code = target.get(keyCustomCode) || "";
      const content = this.getContent();
      editor.Modal.open({ title, content }).onceClose(() =>
        editor.stopCommand(commandNameCustomCode)
      );
      this.getCodeViewer().setContent(code);
    },

    /**
     * Custom pre-content. Can be a simple string or an HTMLElement
     */
    getPreContent() {},

    /**
     * Custom post-content. Can be a simple string or an HTMLElement
     */
    getPostContent() {},

    /**
     * Get all the content for the custom code
     * @return {HTMLElement}
     */
    getContent() {
      const codeViewer = this.getCodeViewer();
      const content = document.createElement("div");
      const pfx = editor.getConfig("stylePrefix");
      content.className = `${pfx}custom-code`;
      appendToContent(content, this.getPreContent());
      content.appendChild(codeViewer.getElement());
      appendToContent(content, this.getPostContent());
      appendToContent(content, this.getContentActions());
      codeViewer.refresh();
      setTimeout(() => codeViewer.focus(), 0);

      return content;
    },

    /**
     * Get the actions content. Can be a simple string or an HTMLElement
     * @return {HTMLElement|String}
     */
    getContentActions() {
      const btn = document.createElement("button");
      btn.setAttribute("type", "button");
      const pfx = editor.getConfig("stylePrefix");
      btn.innerHTML = opts.buttonLabel;
      btn.className = `${pfx}btn-prim ${pfx}btn-import__custom-code`;
      btn.onclick = () => this.handleSave();

      return btn;
    },

    /**
     * Handle the main save task
     */
    handleSave() {
      const { target } = this;
      const code = this.getCodeViewer().getContent();
      target && target.set(keyCustomCode, code);
      editor.Modal.close();
    },

    /**
     * Return the code viewer instance
     * @return {CodeViewer}
     */
    getCodeViewer() {
      if (!this.codeViewer) {
        this.codeViewer = editor.CodeManager.createViewer({
          codeName: "htmlmixed",
          theme: "hopscotch",
          readOnly: 0,
          ...codeViewOptions,
        });
      }
      return this.codeViewer;
    },

    ...commandCustomCode,
  });
};
