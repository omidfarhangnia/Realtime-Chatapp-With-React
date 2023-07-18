import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useRef } from "react";
import { db } from "../firebase";

function SendForm({ currentUser }) {
  const textAreaRef = useRef(null);

  async function handleClick() {
    const date = new Date();

    await updateDoc(doc(db, "messages", `${currentUser.userName}`), {
      userMessages: arrayUnion({
        text: textAreaRef.current.value,
        time: date.getTime(),
        messageSenderId: currentUser.userId,
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
      <div className="flex justify-center items-center gap-3">
        <textarea
          ref={textAreaRef}
          className="bg-blue-300 resize-none w-[500px] h-[200px]"
        />
        <button
          onClick={handleClick}
          className="p-5 bg-black text-white rounded-lg"
        >
          submit
        </button>
      </div>
    </>
  );
}

export default SendForm;
