import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { v4 as uuid } from "uuid";
import { BiSave } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

function SendForm({
  currentUser,
  isEditing,
  handleSaveEdit,
  handleCancelEdit,
}) {
  const [textAreaValue, setTextAreaValue] = useState();

  useEffect(() => {
    if (isEditing.status === true) {
      setTextAreaValue(isEditing.target.text);
    } else {
      setTextAreaValue("");
    }
  }, [isEditing]);

  async function handleSendMessage() {
    const date = new Date();

    await updateDoc(doc(db, "messages", `${currentUser.name}`), {
      messages: arrayUnion({
        text: textAreaValue,
        time: date.getTime(),
        id: uuid(),
        senderName: currentUser.name,
      }),
    })
      .then(() => {
        setTextAreaValue("");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="flex bg-customWhite/25 rounded-lg gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="w-full flex justify-between p-3 items-center"
        >
          <textarea
            value={textAreaValue}
            onChange={(e) => {
              setTextAreaValue(e.target.value);
            }}
            className="bg-customLightBlue/40 text-white p-3 rounded-lg focus-within:outline-none min-w-[100px] w-[60%] resize-none h-[60px] textAreaSendMessages"
          />
          {isEditing.status === true ? (
            <>
              <button
                className="text-white py-3 px-5 bg-customLightBlue/40 rounded-lg"
                onClick={() => {
                  handleSaveEdit({
                    id: isEditing.target.id,
                    senderName: isEditing.target.senderName,
                    time: isEditing.target.time,
                    text: textAreaValue,
                  });
                }}
              >
                <BiSave size={30} />
              </button>
              <button
                className="text-white py-3 px-5 bg-customLightBlue/40 rounded-lg"
                onClick={handleCancelEdit}
              >
                <RxCross2 size={30} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSendMessage}
                className="text-white py-3 px-5 bg-customLightBlue/40 rounded-lg capitalize text-[25px]"
              >
                send
              </button>
              <button className="text-white py-3 px-5 bg-customLightBlue/40 rounded-lg">
                <BsFillEmojiSmileFill size={30} />
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
}

export default SendForm;
