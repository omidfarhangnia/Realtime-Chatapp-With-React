import { useEffect, useRef, useState } from "react";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { BiSave } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

function SendForm({
  isEditing,
  handleSaveEdit,
  handleCancelEdit,
  handleSendMessage,
}) {
  const [textAreaValue, setTextAreaValue] = useState();
  const [showEmoji, setShowEmoji] = useState(false);
  const textAreaRef = useRef();
  const listOfEmoji = [
    128512, 128513, 128514, 128515, 128516, 128517, 128518, 128519, 128520,
    128521, 128522, 128523, 128524, 128525, 128526, 128527, 128528, 128529,
    128530, 128531, 128532, 128533, 128534, 128535, 128536, 128537, 128538,
    128539, 128540, 128541, 128542, 128543, 128544, 128545, 128546, 128547,
    128548, 128549, 128550, 128551, 128552, 128553, 128554, 128555, 128556,
    128557, 128558, 128559, 128560, 128561, 128562, 128563, 128564, 128565,
    128566, 128567, 128568, 128569, 128570, 128571, 128572, 128573, 128574,
    128575, 128576, 128577, 128578, 128579, 128580, 9994, 9995, 9996,
  ];

  useEffect(() => {
    if (isEditing.status === true) {
      setTextAreaValue(isEditing.target.text);
    } else {
      setTextAreaValue("");
    }
  }, [isEditing]);

  function handleWriteEmoji(emoji) {
    const StartSelectedPosition = textAreaRef.current.selectionStart;
    const EndSelectedPosition = textAreaRef.current.selectionEnd;

    if (StartSelectedPosition === 0) {
      setTextAreaValue(textAreaValue + String.fromCodePoint(emoji));
    } else if (EndSelectedPosition === StartSelectedPosition) {
      setTextAreaValue(
        textAreaValue.slice(0, StartSelectedPosition) +
          String.fromCodePoint(emoji) +
          textAreaValue.slice(StartSelectedPosition)
      );
    } else {
      textAreaValue.slice(
        StartSelectedPosition,
        EndSelectedPosition - StartSelectedPosition
      );

      setTextAreaValue(
        textAreaValue.slice(0, StartSelectedPosition) +
          String.fromCodePoint(emoji) +
          textAreaValue.slice(EndSelectedPosition)
      );
    }
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
            ref={textAreaRef}
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
                onClick={() =>
                  handleSendMessage(textAreaValue, setTextAreaValue)
                }
                className="text-white py-3 px-5 bg-customLightBlue/40 rounded-lg capitalize text-[25px]"
              >
                send
              </button>
            </>
          )}
          {showEmoji && (
            <div className="w-[350px] bg-white rounded-lg container grid grid-cols-8 gird-rows-[9] gap-2 place-content-between p-5 absolute bottom-[120%] right-0 z-20 select-none">
              {listOfEmoji.map((emoji) => (
                <span
                  className="hover:bg-gray-300 text-[20px] text-center"
                  onClick={() => {
                    handleWriteEmoji(emoji);
                  }}
                >
                  {String.fromCodePoint(emoji)}
                </span>
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
