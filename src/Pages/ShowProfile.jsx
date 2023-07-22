import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../firebase";

function ShowProfile({ currentUser }) {
  const location = useLocation();
  const target = location.state.target;
  const [description, setDescription] = useState(
    target.description !== "" ? target.description : ""
  );
  const messageSenderName = target.name
    .split(" ")
    .map((text) => text[0])
    .join("");
  const inputRef = useRef(null);

  async function handleSaveDescription() {
    await updateDoc(doc(db, "messages", target.name), {
      description: inputRef.current.value,
    })
      .then(() => {
        target.description = inputRef.current.value;
        setDescription(inputRef.current.value);
        inputRef.current.value = "";
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <div className="w-full h-[100dvh] flex flex-col justify-center items-center relative bg-customBlack text-white">
        <div className="w-[80%] h-[80%] max-w-[800px] bg-white/30 rounded-lg shadow-xl shadow-black absolute"></div>
        <div className="flex flex-col z-10 gap-[30px] p-[40px] w-[80%] h-[80%] max-w-[800px]">
          <div className="flex items-center justify-between">
            <div
              style={{ background: target.userColor }}
              className={`w-[150px] h-[150px] select-none
                bg-customBrown/60 flex justify-center items-center text-[80px] uppercase
              rounded-full`}
            >
              <span>{messageSenderName}</span>
            </div>
            <div className="text-[30px] font-poppins">{target.name}</div>
          </div>
          {/* <div>is he online</div> */}
          {description === "" && target.name === currentUser.name ? (
            <div className="flex justify-between items-center">
              <input
                ref={inputRef}
                className="bg-transparent text-[20px] py-2 px-4 placeholder:capitalize rounded-full border-2 border-solid border-customLightBlue bg-white text-black placeholder:text-gray-500 focus-within:outline-none font-poppins "
                placeholder="enter your description"
              />
              <button
                className="font-poppins capitalize text-[18px] bg-customLightBlue text-black py-2 px-4 rounded-full"
                onClick={handleSaveDescription}
              >
                submit
              </button>
            </div>
          ) : (
            <div className="text-center w-full p-3 bg-black/25 rounded-lg text-[18px]">{target.description === "" ? "there is no description" : target.description}</div>
          )}
        </div>
      </div>
    </>
  );
}

export default ShowProfile;
