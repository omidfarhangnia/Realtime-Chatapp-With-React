import { doc, onSnapshot, refEqual, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../firebase";

function ShowProfile({ currentUser }) {
  const location = useLocation();
  const [target, setTarget] = useState({});
  const [description, setDescription] = useState();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    async function makeSnapShot() {
      const unsub = onSnapshot(
        doc(db, "messages", location.state.target.name),
        (doc) => {
          setTarget(doc.data());
        }
      );
    }

    return () => {
      makeSnapShot();
    };
  }, [location, currentUser]);

  useEffect(() => {
    if (Object.keys(target).length === 0) return;

    setDescription(target.description);
  }, [target]);

  async function handleSaveDescription() {
    await updateDoc(doc(db, "messages", location.state.target.name), {
      description: description,
    })
      .then(() => {
        target.description = description;
        setDescription(target.description);
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
              <span>
                {target.name !== undefined &&
                  target.name
                    .split(" ")
                    .map((text) => text[0])
                    .join("")}
              </span>
            </div>
            <div className="text-[30px] font-poppins">{target.name}</div>
          </div>
          {/* <div>is he online</div> */}
          {target.description === "" && target.name === currentUser.name ? (
            <div className="flex justify-between items-center">
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
            <div className="text-center w-full p-3 bg-black/25 rounded-lg text-[25px] font-bold">
              {target.description === "" ? "" : description}
            </div>
          )}

          {target.description !== "" && target.name === currentUser.name && (
            <div className="flex justify-between items-center">
              {edit ? (
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-[50%] min-h-[100px] bg-transparent border-2 border-solid border-customLightBlue/30 rounded-lg resize-none px-3 py-2 focus-within:outline-none text-[18px] font-poppins messageScrollBar"
                />
              ) : (
                <span className="block w-[50%] min-h-[100px]"></span>
              )}
              {edit ? (
                <button
                  style={{ background: target.userColor }}
                  className="text-[20px] font-poppins capitalize py-2 px-4 rounded-lg"
                  onClick={() => {
                    setEdit(!edit);
                    handleSaveDescription();
                  }}
                >
                  save description
                </button>
              ) : (
                <button
                  style={{ background: target.userColor }}
                  className="text-[20px] font-poppins capitalize py-2 px-4 rounded-lg"
                  onClick={() => {
                    setEdit(!edit);
                  }}
                >
                  edit description
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ShowProfile;
