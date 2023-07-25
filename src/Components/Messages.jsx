import { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../App";
import { ImBin } from "react-icons/im";
import { BiSolidEditAlt } from "react-icons/bi";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

function Messages(props) {
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
        <h1 className="w-full text-center text-[30px] font-poppins capitalize pb-1 border-b-2 border-solid border-customWhite text-customWhite mb-3 select-none">
          messages
        </h1>
        <div className="flex flex-col justify-start text-white gap-3 mt-auto overflow-y-scroll min-h-[80%] messageScrollBar px-2 messageContainer">
          {messages.map((message, index) => (
            <ShowMesssages
              key={index}
              message={message}
              prevMessage={messages[index - 1]}
              {...props}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Messages;

function ShowMesssages({
  message,
  prevMessage,
  currentUser,
  handleSetEditing,
  handleDeleteMessage,
  goToBottemOfElement,
}) {
  const { data } = useContext(DataContext);
  const messageHandlerRef = useRef(null);
  // this value return the first letter of each words in username for message
  const messageSenderName = message.senderName
    .split(" ")
    .map((text) => text[0])
    .join("");
  const profileIconStatus =
    prevMessage !== undefined
      ? prevMessage.senderName === message.senderName
        ? "hide"
        : "show"
      : "show";

  let animationStatus = "open";

  function handleShowMessageHandler() {
    if (animationStatus === "open") {
      gsap.to(messageHandlerRef.current, {
        x: -100,
        onComplete: () => {
          animationStatus = "close";
        },
      });
    } else {
      gsap.to(messageHandlerRef.current, {
        x: 0,
        onComplete: () => {
          animationStatus = "open";
        },
      });
    }
  }

  useEffect(() => {
    goToBottemOfElement();
  }, []);

  return (
    <>
      <div
        className={`flex gap-3 ${
          currentUser.name === message.senderName ? "self-end" : "self-start"
        }`}
      >
        <div
          className={`w-[40px] h-[40px] ${
            currentUser.name === message.senderName && "order-2"
          } `}
        >
          {profileIconStatus === "show" && (
            <Link
              to={message.senderName}
              state={{
                target: data.filter(
                  (dataMember) => dataMember.name === message.senderName
                )[0],
              }}
            >
              <div
                style={{ background: message.userColor }}
                className={`w-full h-full select-none ${
                  message.imagePath === undefined &&
                  `bg-customBrown/60 flex justify-center items-center uppercase`
                } rounded-full`}
              >
                {message.imagePath !== undefined ? (
                  <img
                    src={message.imagePath}
                    alt={"this is the image of " + message.name + " user"}
                  />
                ) : (
                  <span>{messageSenderName}</span>
                )}
              </div>
            </Link>
          )}
        </div>
        <div
          className={`${
            currentUser.name === message.senderName && "ml-auto"
          } group bg-customLightBlue/40 min-w-[200px] max-w-[40%] py-2 px-3 rounded-lg cursor-pointer relative`}
        >
          <div
            className="z-10 absolute top-2 bg-[#31AEC1] h-[70%] w-[88%] break-words"
            onClick={handleShowMessageHandler}
          >
            {message.text}
          </div>
          {currentUser.name === message.senderName && (
            <>
              <div
                ref={messageHandlerRef}
                className="flex gap-3 absolute left-[30px] top-[10px] z-0"
              >
                <div>
                  <ImBin
                    size={23}
                    className="hover:text-gray-400 transition-all"
                    onClick={() => handleDeleteMessage(message)}
                  />
                </div>
                <div>
                  <BiSolidEditAlt
                    size={23}
                    className="hover:text-gray-400 transition-all"
                    onClick={() => handleSetEditing(message)}
                  />
                </div>
              </div>
            </>
          )}
          <div className="z-10 opacity-0 break-words">{message.text}</div>
        </div>
      </div>
    </>
  );
}
