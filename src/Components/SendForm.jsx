import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRef } from "react";
import { db } from "../firebase";

function SendForm() {
  const textAreaRef = useRef(null);

  async function handleClick() {
    await addDoc(collection(db, "messages"), {
        messageContext: textAreaRef.current.value,
        timeStamp: serverTimestamp(),
    })
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
