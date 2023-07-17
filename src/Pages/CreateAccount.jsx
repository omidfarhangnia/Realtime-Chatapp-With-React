import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App";

function CreateAccount({ setCurrentUser }) {
  const { setData } = useContext(DataContext);
  const userNameInputRef = useRef(null);
  const imagePathInputRef = useRef(null);
  const navigate = useNavigate();
  const id = uuid();

  useEffect(() => {
    async function listenerToServer() {
      const unsub = await onSnapshot(collection(db, "messages"), (doc) => {
        const datas = [];

        doc.forEach((docMember) => {
          datas.push(docMember.data());
        });

        setData(datas);
      });
    }
    return () => {
      listenerToServer();
    };
  }, []);

  async function handleClick() {
    if (userNameInputRef.current.value === "") {
      alert("please write your user name");
      return;
    }

    await setDoc(doc(db, "messages", `${userNameInputRef.current.value}`), {
      userName: userNameInputRef.current.value,
      userId: id,
      userMessages: [],
      imagPath: imagePathInputRef.current.value,
    })
      .then(() => {
        navigate("/messages");
        setCurrentUser({
          userName: userNameInputRef.current.value,
          userId: id,
          userMessages: [],
          imagPath: imagePathInputRef.current.value,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="w-[100vw] h-[100dvh] bg-blue-200 flex justify-center items-center gap-10">
      <input
        ref={userNameInputRef}
        className="bg-black text-white p-3"
        type="text"
        placeholder="enter your user name"
      />

      <input
        ref={imagePathInputRef}
        className="bg-black text-white p-3"
        type="text"
        placeholder="enter your image path"
      />
      <button className="bg-black text-white p-5" onClick={handleClick}>
        go to chat app
      </button>
    </div>
  );
}

export default CreateAccount;
