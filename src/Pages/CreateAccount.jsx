import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useContext, useEffect, useRef } from "react";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App";
import {
  BsFillEmojiDizzyFill,
  BsFillEmojiExpressionlessFill,
  BsFillEmojiFrownFill,
  BsFillEmojiHeartEyesFill,
  BsFillEmojiKissFill,
  BsFillEmojiLaughingFill,
  BsFillEmojiNeutralFill,
  BsFillEmojiSmileFill,
  BsFillEmojiSmileUpsideDownFill,
  BsFillEmojiSunglassesFill,
  BsFillEmojiWinkFill,
} from "react-icons/bs";
import { gsap } from "gsap";

function CreateAccount({ setCurrentUser }) {
  const { setData } = useContext(DataContext);
  const userNameInputRef = useRef(null);
  const navigate = useNavigate();
  const id = uuid();

  useEffect(() => {
    async function listenerToServer() {
      const unsub = await onSnapshot(collection(db, "messages"), (doc) => {
        const datas = [];

        doc.forEach((docMember) => {
          datas.push(docMember.data());
        });

        setData(datas);
      });
    }
    return () => {
      listenerToServer();
    };
  }, []);

  useEffect(() => {
    gsap.to("#iconsBoxContainer>div", {
      y: "-=1000",
      duration: 150,
      ease: "linear",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  async function handleClick() {
    if (userNameInputRef.current.value === "") {
      alert("please write your user name");
      return;
    }

    await setDoc(doc(db, "messages", `${userNameInputRef.current.value}`), {
      name: userNameInputRef.current.value,
      id: id,
      messages: [],
      imagePath: "",
    })
      .then(() => {
        navigate("/messages");
        setCurrentUser({
          name: userNameInputRef.current.value,
          id: id,
          messages: [],
          imagePath: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="w-[100vw] h-[100dvh] bg-customDarkBlue flex justify-center items-center gap-10 relative overflow-hidden">
      <div
        className="absolute w-[550%] md:w-[200%] lg:w-[150%] h-[150%] p-5 rotate-[30deg]"
        id="iconsBoxContainer"
      >
        {[...Array(10)].map((member, index) => {
          return (
            <div
              key={index}
              className="flex flex-wrap gap-3 [&>svg]:opacity-30 justify-around"
            >
              <BsFillEmojiKissFill size={150} />
              <BsFillEmojiSmileFill size={150} />
              <BsFillEmojiExpressionlessFill size={150} />
              <BsFillEmojiDizzyFill size={150} />
              <BsFillEmojiNeutralFill size={150} />
              <BsFillEmojiSmileUpsideDownFill size={150} />
              <BsFillEmojiWinkFill size={150} />
              <BsFillEmojiNeutralFill size={150} />
              <BsFillEmojiSmileUpsideDownFill size={150} />
              <BsFillEmojiSunglassesFill size={150} />
              <BsFillEmojiSunglassesFill size={150} />
              <BsFillEmojiKissFill size={150} />
              <BsFillEmojiSmileFill size={150} />
              <BsFillEmojiExpressionlessFill size={150} />
              <BsFillEmojiFrownFill size={150} />
              <BsFillEmojiSunglassesFill size={150} />
              <BsFillEmojiSunglassesFill size={150} />
              <BsFillEmojiKissFill size={150} />
              <BsFillEmojiSmileFill size={150} />
              <BsFillEmojiExpressionlessFill size={150} />
              <BsFillEmojiFrownFill size={150} />
              <BsFillEmojiHeartEyesFill size={150} />
              <BsFillEmojiLaughingFill size={150} />
              <BsFillEmojiFrownFill size={150} />
              <BsFillEmojiKissFill size={150} />
              <BsFillEmojiSmileFill size={150} />
              <BsFillEmojiExpressionlessFill size={150} />
              <BsFillEmojiDizzyFill size={150} />
              <BsFillEmojiWinkFill size={150} />
              <BsFillEmojiHeartEyesFill size={150} />
              <BsFillEmojiLaughingFill size={150} />
              <BsFillEmojiDizzyFill size={150} />
              <BsFillEmojiHeartEyesFill size={150} />
              <BsFillEmojiLaughingFill size={150} />
              <BsFillEmojiFrownFill size={150} />
              <BsFillEmojiNeutralFill size={150} />
              <BsFillEmojiSmileUpsideDownFill size={150} />
              <BsFillEmojiWinkFill size={150} />
              <BsFillEmojiSunglassesFill size={150} />
            </div>
          );
        })}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleClick();
        }}
        className="flex flex-col gap-[40px] justify-center items-center w-[90%] z-10"
      >
        <input
          ref={userNameInputRef}
          className="text-white min-w-[250px] bg-customBlack text-[20px] w-[80%] py-3 px-3 rounded-lg focus-within:outline-none border-2 border-solid border-customBlack focus-within:border-customWhite/80 placeholder:text-customWhite placeholder:capitalize"
          type="text"
          placeholder="enter your user name"
          required
        />
        <input
          type="submit"
          className="text-[20px] min-w-[150px] w-[30%] capitalize font-bold text-customWhite bg-customBlack px-5 py-2 rounded-lg border-2 border-solid border-customBlack focus-within:border-customWhite/80"
          value={"join chat"}
        />
      </form>
    </div>
  );
}

export default CreateAccount;
