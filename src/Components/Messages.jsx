import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

function Messages({ currentUser }) {
  const [data, setData] = useState([]);

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
  }, [currentUser]);

  return (
    <>
      <div className="w-full min-h-[300px] border-2 border-solid border-black p-5 flex flex-col">
        <h1>messages : </h1>
        <div>
          <ShowMesssages data={data} /> 
        </div>
      </div>
    </>
  );
}

export default Messages;

function ShowMesssages({ data }) {
  const messages = [];

  useEffect(() => {
    console.log(data)
  }, [data]);
  return <div>{data.userName}</div>;
}
