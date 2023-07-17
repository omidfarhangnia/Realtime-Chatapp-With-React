import { collection, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { DataContext } from "../App";

function Messages({ currentUser }) {
  const { data } = useContext(DataContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      let allMessages = [];

      data.map((data) => {
        allMessages.push(data.userMessages);
      });

      allMessages = allMessages.flat();
      allMessages = allMessages.sort((a, b) => a.time - b.time);

      setMessages(allMessages);
    }
  }, [data]);

  return (
    <>
      <div className="w-full min-h-[300px] border-2 border-solid border-black p-5 flex flex-col">
        <h1>messages : </h1>
        <div>
          <ShowMesssages currentUser={currentUser} messages={messages} />
        </div>
      </div>
    </>
  );
}

export default Messages;

function ShowMesssages({ currentUser, messages }) {
  return (
    <div>
      {messages.map((message) => (
        <div
          className={`${
            currentUser.userId === message.messageSenderId ? "text-right" : ""
          }`}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
}
