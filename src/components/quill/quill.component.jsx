import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const __ISMSIE__ = navigator.userAgent.match(/Trident/i) ? true : false;

class QuillEditor extends React.Component {
  bandId;
  placeholder;
  onEditorChange;
  _isMounted;

  constructor(props) {
    super(props);

    this.state = {
      editorHtml: __ISMSIE__ ? "<p>&nbsp;</p>" : "",
      files: [],
    };

    this.reactQuillRef = null;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange = (html) => {
    this.setState(
      {
        editorHtml: html,
      },
      () => {
        this.props.onEditorChange(this.state.editorHtml);
      }
    );
  };

  render() {
    return (
      <div id="quill">
        <div id="toolbar">
          <select
            className="ql-header"
            defaultValue={""}
            onChange={(e) => e.persist()}
          >
            <option value="1" />
            <option value="2" />
            <option value="" />
          </select>
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
          <button className="ql-strike" />
          <button className="ql-list">
            <svg viewBox="0 0 18 18">
              {" "}
              <line className="ql-stroke" x1="6" x2="15" y1="4" y2="4"></line>{" "}
              <line className="ql-stroke" x1="6" x2="15" y1="9" y2="9"></line>{" "}
              <line className="ql-stroke" x1="6" x2="15" y1="14" y2="14"></line>{" "}
              <line className="ql-stroke" x1="3" x2="3" y1="4" y2="4"></line>{" "}
              <line className="ql-stroke" x1="3" x2="3" y1="9" y2="9"></line>{" "}
              <line className="ql-stroke" x1="3" x2="3" y1="14" y2="14"></line>{" "}
            </svg>
          </button>
        </div>
        <ReactQuill
          ref={(el) => {
            this.reactQuillRef = el;
          }}
          theme={"snow"}
          onChange={this.handleChange}
          modules={this.modules}
          formats={this.formats}
          value={this.state.editorHtml}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }

  modules = {
    // syntax: true,
    toolbar: {
      container: "#toolbar",
    },
  };

  formats = ["header", "bold", "italic", "underline", "strike", "list"];
}

export default QuillEditor;
