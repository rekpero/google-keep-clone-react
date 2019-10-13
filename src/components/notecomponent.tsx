import * as React from "react";
import edit from "../assets/images/edit.svg";
import remove from "../assets/images/remove.svg";
import { INote } from "../models/note";
import EditNoteModal from "./editnotemodal";

interface INoteProps {
  index: number;
  note: INote;
  currentNote: INote;
  changeListChecked: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  changeCurrentNote: (note: INote) => void;
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
  editNote: (index: number, note: INote) => void;
  removeNote: (index: number) => void;
}
const Note: React.FC<INoteProps> = (props: INoteProps) => {
  let modal: HTMLButtonElement;

  return (
    <div className="m-1 rounded p-3 border col-md-3 shadow d-flex flex-column bg-dark">
      <div className="mb-2">
        <b>{props.note.title}</b>
      </div>
      {props.note.type === "image" && props.note.imageUrl !== "" ? (
        <div className="text-center">
          <img src={props.note.imageUrl} alt="upload" className="img-fluid" />
        </div>
      ) : null}
      {props.note.type === "text" || "image" ? (
        <div className="mb-2 text-truncate">
          {props.note.payload.map(load => (
            <div key={load}>{load}</div>
          ))}
        </div>
      ) : null}
      {props.note.type === "checklist" ? (
        <div className="mb-2">
          {props.note.list.map((listItem, index) => (
            <div className="d-flex" key={index}>
              <div className="input-group-prepend">
                <div className="input-group-text bg-dark border-0">
                  <input
                    type="checkbox"
                    aria-label="Checkbox for following text input"
                    checked={listItem.checked}
                    onChange={e => props.changeListChecked(e, index)}
                  />
                </div>
              </div>
              <div
                style={{
                  textDecorationLine: listItem.checked
                    ? "line-through"
                    : "none",
                  textDecorationStyle: "solid"
                }}
              >
                {listItem.item}
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <div className="d-flex justify-content-between mt-auto">
        <div>
          <img
            src={edit}
            alt="edit"
            style={{ height: 16, width: 16 }}
            onClick={e => {
              props.changeCurrentNote(props.note);
              modal.click();
            }}
          />
          <button
            style={{ display: "none" }}
            data-toggle="modal"
            data-target="#exampleModalCenter"
            ref={c => (modal = c!)}
          ></button>
        </div>
        <div>
          <img
            src={remove}
            alt="remove"
            style={{ height: 16, width: 16 }}
            onClick={e => {
              props.removeNote(props.index);
            }}
          />
        </div>
      </div>
      {/* 
      <!-- Modal --> */}
      <EditNoteModal
        index={props.index}
        note={props.currentNote}
        createList={props.createList}
        loadImage={props.loadImage}
        addListItem={props.addListItem}
        loadListItemText={props.loadListItemText}
        loadListItemCheckbox={props.loadListItemCheckbox}
        loadPayload={props.loadPayload}
        loadTitle={props.loadTitle}
        editNote={props.editNote}
      />
    </div>
  );
};
export default Note;
