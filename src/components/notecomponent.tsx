import * as React from "react";
import edit from "../assets/images/edit.svg";
import remove from "../assets/images/remove.svg";
import { INote } from "../models/note";

interface INoteProps {
  note: INote;
  changeListChecked: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
}
const Note: React.FC<INoteProps> = (props: INoteProps) => {
  return (
    <div className="m-1 rounded p-3 border col-md-3 shadow d-flex flex-column">
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
          <img src={edit} alt="edit" style={{ height: 16, width: 16 }} />
        </div>
        <div>
          <img src={remove} alt="remove" style={{ height: 16, width: 16 }} />
        </div>
      </div>
    </div>
  );
};
export default Note;
