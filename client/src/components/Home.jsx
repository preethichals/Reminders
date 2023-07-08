import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";
import { env } from "../config";
function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);
  let getNotes = async () => {
    let res = await axios.get(`${env.api}/api/notes`, {
      headers: { Authorization: window.localStorage.getItem("app-token") },
    });
    console.log(res);
    setNotes(res.data);
  };

  const deleteNote = async (id) => {
    try {
      if (window.localStorage.getItem("app-token")) {
        await axios.delete(`${env.api}/api/notes/${id}`, {
          headers: { Authorization: window.localStorage.getItem("app-token") },
        });
        getNotes();
      }
    } catch (error) {
      window.location.href = "/";
    }
  };

  return (
    <div className="container p-4 bg-dashboard">
      <div className="row">
        {notes.map((note) => {
          return (
            <div
              className="col-lg-4 col-md-6 col-sm-8 pt-3 px-3 rounded-3"
              key={note._id}
            >
              <div
                className="card cards h-100 shadow-lg border-2 rounded-3"
                style={{ background: "#FFF" }}
              >
                
                <div className="card-body bg-title rounded-2 ">
                  <h5 className="card-title text-center p-1 mb-3 border-bottom fw-bolder text-uppercase letter-spacing1">
                    {note.title}
                  </h5>
                  <p
                  className="text-start px-3 fw-bold bg-secondary p-1"
                  style={{ color: "#ffcd71" }}
                >
                  {format(note.date)}
                </p>

                  <p className="card-text">{note.content}</p>
                </div>

                <div className="card-footer d-flex justify-content-around border-start text-uppercase">
                  {note.name}

                  <Link to={`/portal/edit/${note._id}`} className="text-black ">
                    Edit
                  </Link>
                </div>
                <button
                  className=" btn btn-outline-none fw-bolder fs-5 position-absolute top-0 end-0 fontx" style={{color:"#bd0000"}}
                  onClick={() => deleteNote(note._id)}
                >
                  X
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
