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
        return "";
      });

      allMessages = allMessages.flat();
      allMessages = allMessages.sort((a, b) => a.time - b.time);

      setMessages(allMessages);
    }
  }, [data]);

  return (
    <>
      <div className="w-full min-h-[500px] bg-customWhite/25 rounded-lg p-5 flex flex-col">
        <h1 className="w-full text-center text-[30px] font-poppins capitalize pb-1 border-b-2 border-solid border-customWhite text-customWhite mb-3 select-none">messages</h1>
        <div className="flex flex-col justify-start text-white gap-3 mt-auto">
          <ShowMesssages currentUser={currentUser} messages={messages} />
        </div>
      </div>
    </>
  );
}

export default Messages;

function ShowMesssages({ currentUser, messages }) {
  return (
    <>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`${
            currentUser.id === message.messageSenderId ? "self-end" : "self-start"
          } bg-customLightBlue/40 min-w-[200px] max-w-[50%] py-2 px-3 rounded-lg`}
        >
          {message.text}
        </div>
      ))}
    </>
  );
}
