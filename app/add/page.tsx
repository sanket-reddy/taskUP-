"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default  function Page() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const session =  useSession();
  const email = session.data?.user?.email;

  const handleAdd = async () => {
    try {
      let resp = await axios.post("/api/add", {
        title,
        description,
        time,
        email,
      });
      console.log(resp.data);
      if (resp.data.status === 200) {
        alert("added succesfully");
      } else {
        alert("error");
      }
    } catch (error) {
      console.log("an error has occured");
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="card  w-96 bg-gray-700 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Add a Task!!</h2>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder="Title"
            className="input input-bordered w-full max-w-xs"
          />
          <textarea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="textarea textarea-bordered"
            placeholder="Description"
          ></textarea>
          <input
            type="text"
            placeholder="Finish Time"
            onChange={(e) => {
              setTime(e.target.value);
            }}
            className="input input-bordered w-full max-w-xs"
          />
          <div className="card-actions justify-end">
            <button onClick={handleAdd} className="btn btn-primary">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
