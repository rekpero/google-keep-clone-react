import * as React from "react";
import autosize from "autosize";
import { IListItem } from "../models/note";
import photo from "../assets/images/photo.svg";
import bulletList from "../assets/images/bullet-list.svg";

interface INoteProps {
  title: string;
  payload: string[];
  list: IListItem[];
  imageUrl: string;
  type: string;
  createList: () => void;
  loadImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addListItem: () => void;
  loadListItemText: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  loadListItemCheckbox: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  loadPayload: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  loadTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  saveNote: () => void;
}
export default class AddNoteComponent extends React.Component<INoteProps, {}> {
  private textarea!: HTMLTextAreaElement;
  private inputImage!: HTMLInputElement;

  componentDidMount() {
    if (this.props.type === "text") {
      this.textarea.focus();
      autosize(this.textarea);
    }
  }
  componentDidUpdate() {
    if (this.props.type === "text") {
      autosize(this.textarea);
    }
  }
  handleImageUpload = () => {
    this.inputImage.click();
  };
  render() {
    return (
      <div className="my-3 rounded p-3 border col-md-6 shadow bg-dark">
        <div className="mb-2">
          <input
            type="text"
            placeholder="Title"
            className="border-0 bg-dark text-white w-100"
            value={this.props.title}
            onChange={this.props.loadTitle}
          />
        </div>
        {this.props.type === "image" ? (
          <div className="text-center">
            <img
              src={this.props.imageUrl}
              alt="upload"
              style={{ height: 200 }}
              className="img-fluid"
            />
          </div>
        ) : null}
        <div className="mb-2">
          {this.props.type === "text" || this.props.type === "image" ? (
            <textarea
              rows={1}
              ref={c => (this.textarea = c!)}
              placeholder="Take a note"
              className="border-0 bg-dark text-white w-100"
              value={
                this.props.payload.length === 0
                  ? ""
                  : this.props.payload.reduce(
                      (prev, curr) => prev + "\n" + curr
                    )
              }
              onChange={this.props.loadPayload}
            />
          ) : this.props.type === "checklist" ? (
            <div>
              {this.props.list.map((listItem, index) => (
                <div className="d-flex" key={index}>
                  <div className="input-group-prepend">
                    <div className="input-group-text bg-dark border-0">
                      <input
                        type="checkbox"
                        aria-label="Checkbox for following text input"
                        checked={listItem.checked}
                        onChange={e =>
                          this.props.loadListItemCheckbox(e, index)
                        }
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="List item"
                    className="border-0 bg-dark text-white w-100"
                    style={{
                      textDecorationLine: listItem.checked
                        ? "line-through"
                        : "none",
                      textDecorationStyle: "solid"
                    }}
                    value={listItem.item}
                    onChange={e => this.props.loadListItemText(e, index)}
                  />
                </div>
              ))}
              <div
                className="text-secondary px-2 mt-1"
                style={{ fontSize: 16 }}
                onClick={this.props.addListItem}
              >
                + Add list
              </div>
            </div>
          ) : null}
        </div>
        <div className="d-flex align-items-center">
          <img
            src={photo}
            alt="add"
            className="ml-2 mr-4"
            style={{ height: 16, width: 16 }}
            onClick={this.handleImageUpload}
          />
          <input
            type="file"
            style={{ display: "none" }}
            ref={input => (this.inputImage = input!)}
            onChange={this.props.loadImage}
          />
          <img
            src={bulletList}
            alt="add list"
            className="mr-4"
            style={{ height: 16, width: 16 }}
            onClick={this.props.createList}
          />
          <button
            className="btn btn-info ml-auto"
            type="button"
            style={{ borderRadius: 100, margin: 0 }}
            onClick={this.props.saveNote}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}
