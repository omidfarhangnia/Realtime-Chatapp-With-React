import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function listenerToServer() {
        const unsub = await onSnapshot(collection(db, "messages"), (doc) => {
            const messages = [];
            doc.forEach((docMember) => {
                messages.push(docMember.data()); 
            })
            setMessages(messages)
        })
    }
    return () => {
      listenerToServer();
    };
  }, []);

  console.log(messages)
  return (
    <>
      <div className="w-full min-h-[300px] border-2 border-solid border-black p-5 flex flex-col">
        <h1>messages : </h1>
        <div>
            {messages.map((message, index) => (
                <div key={index}>{message.messageContext}</div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Messages;
