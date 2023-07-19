import { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";

function Messages({ currentUser }) {
  const { data } = useContext(DataContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      let allMessages = [];

      data.map((data) => {
        allMessages.push(data.messages);
      });

      allMessages = allMessages.flat();
      allMessages = allMessages.sort((a, b) => a.time - b.time);

      setMessages(allMessages);
    }
  }, [data]);

  return (
    <>
      <div className="w-full min-h-[500px] bg-customWhite/25 rounded-lg p-5 flex flex-col">
        <h1 className="w-full text-center text-[30px] font-poppins capitalize pb-1 border-b-2 border-solid border-customWhite text-customWhite mb-3">messages</h1>
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
      {messages.map((message, index) => (
        <div
          key={index}
          className={`${
            currentUser.id === message.messageSenderId ? "text-right" : ""
          }`}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
}
