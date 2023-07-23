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
  const [showEmoji, setShowEmoji] = useState(false);
  const listOfEmoji = [
    128512, 128513, 128514, 128515, 128516, 128517, 128518, 128519, 128520,
    128521, 128522, 128523, 128524, 128525, 128526, 128527, 128528, 128529,
    128530, 128531, 128532, 128533, 128534, 128535, 128536, 128537, 128538,
    128539, 128540, 128541, 128542, 128543, 128544, 128545, 128546, 128547,
    128548, 128549, 128550, 128551, 128552, 128553, 128554, 128555, 128556,
    128557, 128558, 128559, 128560, 128561, 128562, 128563, 128564, 128565,
    128566, 128567, 128568, 128569, 128570, 128571, 128572, 128573, 128574,
    128575, 128576, 128577, 128578, 128579, 128580, 9994, 9995, 9996, 9997,
  ];

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
        userColor: currentUser.userColor,
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
          className="w-full flex justify-between p-3 items-center relative"
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
                    userColor: isEditing.target.userColor,
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
            </>
          )}
          {showEmoji && (
            <div className="w-[250px] bg-white rounded-lg flex flex-wrap justify-between items-center place-content-between p-5 absolute bottom-[120%] right-0 z-20 select-none">
              {listOfEmoji.map((emoji) => (
                <span className="hover:bg-gray-300 p-1">{String.fromCodePoint(emoji)}</span>
              ))}
            </div>
          )}
          <button
            onClick={(e) => {
              setShowEmoji(!showEmoji);
            }}
            className="text-white py-3 px-5 bg-customLightBlue/40 rounded-lg"
          >
            <BsFillEmojiSmileFill size={30} />
          </button>
        </form>
      </div>
    </>
  );
}

export default SendForm;
