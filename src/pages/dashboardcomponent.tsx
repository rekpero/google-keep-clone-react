import * as React from "react";
import autosize from "autosize";
import photo from "../assets/images/photo.svg";
import bulletList from "../assets/images/bullet-list.svg";
import Note from "../components/notecomponent";
import { INote, IListItem } from "../models/note";

interface ILoginState {
  notes: INote[];
  title: string;
  payload: string[];
  list: IListItem[];
  imageUrl: string;
  type: string;
}

export default class DashboardComponent extends React.Component<
  {},
  ILoginState
> {
  private textarea!: HTMLTextAreaElement;
  private inputImage!: HTMLInputElement;
  constructor(props: any) {
    super(props);
    this.state = {
      notes: [],
      title: "",
      payload: [],
      list: [],
      imageUrl: "",
      type: "text"
    };
  }

  componentDidMount() {
    if (this.state.type === "text") {
      this.textarea.focus();
      autosize(this.textarea);
    }
  }
  componentDidUpdate() {
    if (this.state.type === "text") {
      autosize(this.textarea);
    }
  }

  loadTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value
    });
  };

  loadPayload = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      payload: event.target.value.split("\n")
    });
  };

  saveNote = () => {
    let note = this.state.notes;
    note.push({
      title: this.state.title,
      payload: this.state.payload,
      list: this.state.list,
      type: this.state.type,
      imageUrl: this.state.imageUrl
    });
    this.setState({ notes: note, title: "", payload: [], type: "text" }, () => {
      console.log(this.state.notes);
    });
  };

  handleImageUpload = () => {
    this.inputImage.click();
  };

  createList = () => {
    let list = [];
    list.push({ item: "", checked: false });
    this.setState({ list: list, type: "checklist", imageUrl: "", payload: [] }, () => {
      console.log(this.state.type);
    });
  };
  addListItem = () => {
    let list = this.state.list;
    list.push({ item: "", checked: false });
    this.setState({ list: list });
  };

  loadListItemText = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let list = this.state.list;
    list[index].item = event.target.value;
    this.setState({ list: list });
  };

  loadListItemCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let list = this.state.list;
    list[index].checked = event.target.checked;
    this.setState({ list: list });
  };

  loadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imageUrl: URL.createObjectURL(event.currentTarget.files![0]),
      type: "image",
      list: []
    });
    console.log(URL.createObjectURL(event.currentTarget.files![0]));
  };

  render() {
    return (
      <div className="bg-dark border-top ">
        <div className="container text-white">
          <div className="d-flex justify-content-center">
            <div className="my-3 rounded p-3 border col-md-6 shadow">
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Title"
                  className="border-0 bg-dark text-white w-100"
                  value={this.state.title}
                  onChange={this.loadTitle}
                />
              </div>
              {this.state.type === "image" ? (
                <div className="text-center">
                  <img
                    src={this.state.imageUrl}
                    alt="upload"
                    style={{ height: 200 }}
                    className="img-fluid"
                  />
                </div>
              ) : null}
              <div className="mb-2">
                {this.state.type === "text" || this.state.type === "image" ? (
                  <textarea
                    rows={1}
                    ref={c => (this.textarea = c!)}
                    placeholder="Take a note"
                    className="border-0 bg-dark text-white w-100"
                    value={
                      this.state.payload.length === 0
                        ? ""
                        : this.state.payload.reduce(
                            (prev, curr) => prev + "\n" + curr
                          )
                    }
                    onChange={this.loadPayload}
                  />
                ) : this.state.type === "checklist" ? (
                  <div>
                    {this.state.list.map((listItem, index) => (
                      <div className="d-flex" key={index}>
                        <div className="input-group-prepend">
                          <div className="input-group-text bg-dark border-0">
                            <input
                              type="checkbox"
                              aria-label="Checkbox for following text input"
                              checked={listItem.checked}
                              onChange={e =>
                                this.loadListItemCheckbox(e, index)
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
                          onChange={e => this.loadListItemText(e, index)}
                        />
                      </div>
                    ))}
                    <div
                      className="text-secondary px-2 mt-1"
                      style={{ fontSize: 16 }}
                      onClick={this.addListItem}
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
                  onChange={this.loadImage}
                />
                <img
                  src={bulletList}
                  alt="add list"
                  className="mr-4"
                  style={{ height: 16, width: 16 }}
                  onClick={this.createList}
                />
                <button
                  className="btn btn-info ml-auto"
                  type="button"
                  style={{ borderRadius: 100, margin: 0 }}
                  onClick={this.saveNote}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          <div className="my-3 row justify-content-around">
            {this.state.notes.map(note => (
              <Note
                note={note}
                key={note.title}
                changeListChecked={this.loadListItemCheckbox}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
