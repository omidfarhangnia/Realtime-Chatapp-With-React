import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useRef } from "react";
import { db } from "../firebase";
import { BsFillEmojiSmileFill } from "react-icons/bs";

function SendForm({ currentUser }) {
  const textAreaRef = useRef(null);

  async function handleSendMessage() {
    const date = new Date();

    await updateDoc(doc(db, "messages", `${currentUser.name}`), {
      messages: arrayUnion({
        text: textAreaRef.current.value,
        time: date.getTime(),
        messageSenderId: currentUser.id,
      }),
    })
      .then(() => {
        textAreaRef.current.value = "";
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
            handleSendMessage()
          }}
          className="w-full flex justify-between p-3 items-center"
        >
          <textarea
            ref={textAreaRef}
            className="bg-customLightBlue/40 text-white p-3 rounded-lg focus-within:outline-none min-w-[100px] w-[60%] resize-none h-[60px] textAreaSendMessages"
          />
          <input
            type="submit"
            className="text-white py-3 px-5 bg-customLightBlue/40 rounded-lg capitalize text-[25px]"
            value={"send"}
          />
          <button
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
