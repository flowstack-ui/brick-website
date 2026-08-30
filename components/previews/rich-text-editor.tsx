"use client";

// brick-preview-style-boundary: compiled-iframe

export default function RichTextEditorPreview() {
  return (
    <div className="source-component-preview">
      <iframe
        loading="eager"
        sandbox="allow-scripts"
        src="/component-previews/rich-text-editor/index.html"
        title="Rich Text Editor compiled live preview"
      />
    </div>
  );
}
