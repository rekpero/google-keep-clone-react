import * as React from "react";
import Note from "../components/notecomponent";
import { INote, IListItem } from "../models/note";
import AddNoteComponent from "../components/addnotecomponent";
import search from "../assets/images/search.svg";

interface ILoginState {
  notes: INote[];
  filteredNotes: INote[];
  title: string;
  payload: string[];
  list: IListItem[];
  imageUrl: string;
  type: string;
  currentNote: INote;
  search: string;
}

export default class DashboardComponent extends React.Component<
  {},
  ILoginState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      notes: [],
      filteredNotes: [],
      title: "",
      payload: [],
      list: [],
      imageUrl: "",
      type: "text",
      currentNote: {
        title: "",
        payload: [],
        list: [],
        imageUrl: "",
        type: "text"
      },
      search: ""
    };
  }

  loadTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value
    });
  };
  loadSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    let search = event.target.value;
    console.log(
      search,
      search === ""
        ? this.state.notes
        : this.state.notes.length === 0
        ? []
        : this.state.notes.filter(note =>
            (note.title.indexOf(search) !== -1) ||
            ((note.type === "text" ||
            note.type === "image")
              ? note.payload
                  .reduce((prev, curr) => prev + " " + curr)
                  .indexOf(search) !== -1
              : null) || ((note.type === "checklist")
              ? note.list
                  .map(item => item.item)
                  .reduce((prev, curr) => prev + " " + curr)
                  .indexOf(search) !== -1
              : null)
          )
    );
    this.setState({
      search: search,
      filteredNotes: search === "" ? this.state.notes : this.state.notes.length === 0 ? [] : this.state.notes.filter(note =>
          (note.title.indexOf(search) !== -1) ||
          ((note.type === "text" ||
          note.type === "image")
            ? note.payload
                .reduce((prev, curr) => prev + " " + curr)
                .indexOf(search) !== -1
            : null) || ((note.type === "checklist")
            ? note.list
                .map(item => item.item)
                .reduce((prev, curr) => prev + " " + curr)
                .indexOf(search) !== -1
            : null)
        )
    });
  };

  loadCurrentNoteTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      currentNote: {
        title: event.target.value,
        payload: this.state.currentNote.payload,
        list: this.state.currentNote.list,
        imageUrl: this.state.currentNote.imageUrl,
        type: this.state.currentNote.type
      }
    });
  };

  loadPayload = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      payload: event.target.value.split("\n")
    });
  };

  loadCurrentNotePayload = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      currentNote: {
        title: this.state.currentNote.title,
        payload: event.target.value.split("\n"),
        list: this.state.currentNote.list,
        imageUrl: this.state.currentNote.imageUrl,
        type: this.state.currentNote.type
      }
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
    this.setState(
      {
        notes: note,
        filteredNotes: note,
        title: "",
        payload: [],
        type: "text"
      },
      () => {
        console.log(this.state.notes);
      }
    );
  };

  editNote = (index: number, note: INote) => {
    let notes = this.state.notes;
    notes[index] = note;
    this.setState({ notes: notes, filteredNotes: notes });
  };

  createList = () => {
    let list = [];
    list.push({ item: "", checked: false });
    this.setState({ list: list, type: "checklist", imageUrl: "", payload: [] });
  };
  createListCurrentNote = () => {
    let list = [];
    list.push({ item: "", checked: false });
    this.setState({
      currentNote: {
        list: list,
        type: "checklist",
        imageUrl: "",
        payload: [],
        title: this.state.currentNote.title
      }
    });
  };
  addListItem = () => {
    let list = this.state.list;
    list.push({ item: "", checked: false });
    this.setState({ list: list });
  };
  addListItemCurrentNote = () => {
    let list = this.state.list;
    list.push({ item: "", checked: false });
    this.setState({
      currentNote: {
        list: list,
        title: this.state.currentNote.title,
        payload: this.state.currentNote.payload,
        type: this.state.currentNote.type,
        imageUrl: this.state.currentNote.imageUrl
      }
    });
  };

  loadListItemText = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let list = this.state.list;
    list[index].item = event.target.value;
    this.setState({ list: list });
  };

  loadListItemTextCurrentNote = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let list = this.state.currentNote.list;
    list[index].item = event.target.value;
    this.setState({
      currentNote: {
        list: list,
        title: this.state.currentNote.title,
        payload: this.state.currentNote.payload,
        type: this.state.currentNote.type,
        imageUrl: this.state.currentNote.imageUrl
      }
    });
  };

  loadListItemCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let list = this.state.list;
    list[index].checked = event.target.checked;
    this.setState({ list: list });
  };

  loadListItemCheckboxCurrentNote = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let list = this.state.currentNote.list;
    list[index].checked = event.target.checked;
    this.setState({
      currentNote: {
        list: list,
        title: this.state.currentNote.title,
        payload: this.state.currentNote.payload,
        type: this.state.currentNote.type,
        imageUrl: this.state.currentNote.imageUrl
      }
    });
  };

  loadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imageUrl: URL.createObjectURL(event.currentTarget.files![0]),
      type: "image",
      list: []
    });
    console.log(URL.createObjectURL(event.currentTarget.files![0]));
  };

  loadImageCurrentNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      currentNote: {
        imageUrl: URL.createObjectURL(event.currentTarget.files![0]),
        type: "image",
        list: [],
        title: this.state.currentNote.title,
        payload: this.state.currentNote.payload
      }
    });
    console.log(URL.createObjectURL(event.currentTarget.files![0]));
  };
  removeNote = (index: number) => {
    let notes = this.state.notes;
    notes.splice(index, 1);
    this.setState({ notes: notes, filteredNotes: notes });
  };

  changeCurrentNote = (note: INote) => {
    this.setState({ currentNote: note });
  };

  render() {
    return (
      <div>
        <div className="container-fluid bg-dark text-center">
          <div className="container">
            <div className="input-group col-md-4 p-2 px-auto">
              <div className="input-group-prepend">
                <span
                  className="input-group-text bg-white border-right-0"
                  id="search"
                >
                  <img
                    src={search}
                    alt="search"
                    style={{ height: 16, width: 16 }}
                  />
                </span>
              </div>
              <input
                type="text"
                className="form-control border-left-0"
                placeholder="Search"
                aria-label="search"
                aria-describedby="search"
                value={this.state.search}
                onChange={this.loadSearch}
              />
            </div>
          </div>
        </div>
        <div className="container text-white">
          <div className="d-flex justify-content-center">
            <AddNoteComponent
              title={this.state.title}
              payload={this.state.payload}
              list={this.state.list}
              imageUrl={this.state.imageUrl}
              type={this.state.type}
              createList={this.createList}
              loadImage={this.loadImage}
              addListItem={this.addListItem}
              loadListItemText={this.loadListItemText}
              loadListItemCheckbox={this.loadListItemCheckbox}
              loadPayload={this.loadPayload}
              loadTitle={this.loadTitle}
              saveNote={this.saveNote}
            />
          </div>
          <div className="my-3 row justify-content-around">
            {this.state.filteredNotes.map((note, index) => (
              <Note
                index={index}
                note={note}
                key={index}
                changeListChecked={this.loadListItemCheckbox}
                changeCurrentNote={this.changeCurrentNote}
                currentNote={this.state.currentNote}
                createList={this.createListCurrentNote}
                loadImage={this.loadImageCurrentNote}
                addListItem={this.addListItemCurrentNote}
                loadListItemText={this.loadListItemTextCurrentNote}
                loadListItemCheckbox={this.loadListItemCheckboxCurrentNote}
                loadPayload={this.loadCurrentNotePayload}
                loadTitle={this.loadCurrentNoteTitle}
                editNote={this.editNote}
                removeNote={this.removeNote}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
