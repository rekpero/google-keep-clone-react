import * as React from "react";
import edit from "../assets/images/edit.svg";
import remove from "../assets/images/remove.svg";
import { INote } from "../models/note";

interface INoteProps {
  note: INote;
}
const Note: React.FC<INoteProps> = (props: INoteProps) => {
  return (
    <div className="m-1 rounded p-3 border col-md-3 shadow d-flex flex-column">
      <div className="mb-2">
        <b>{props.note.title}</b>
      </div>
      {props.note.type === "image" && props.note.imageUrl !== "" ? (
        <div className="text-center">
          <img
            src={props.note.imageUrl}
            alt="upload"
            style={{ height: 200 }}
            className="img-fluid"
          />
        </div>
      ) : null}
      <div className="mb-2" style={{ overflow: "hidden" }}>
        {props.note.payload.map(load => (
          <div key={load}>{load}</div>
        ))}
      </div>
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
