import { useState } from "react";
import Header from "../Components/Header";
import Messages from "../Components/Messages";
import SendForm from "../Components/SendForm";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function ShowMessages({ currentUser }) {
  const [isEditing, setIsEditing] = useState({ status: false, target: null });

  async function handleDeleteMessage(message) {
    const newMessageArray = currentUser.messages.filter(
      (messageMember) => messageMember.id !== message.id
    );

    await updateDoc(doc(db, "messages", currentUser.name), {
      messages: newMessageArray,
    });
  }

  function handleSetEditing(selectedMessage) {
    setIsEditing({
      status: true,
      target: selectedMessage,
    });
  }

  function handleCancelEdit() {
    setIsEditing({
      status: false,
      target: null,
    });
  }

  async function handleSaveEdit(newObj) {
    const newMessageArray = currentUser.messages.map((messageMember) => {
      if (messageMember.id === newObj.id) {
        return newObj;
      } else {
        return messageMember;
      }
    });

    await updateDoc(doc(db, "messages", currentUser.name), {
      messages: newMessageArray,
    }).then(() => {
      handleCancelEdit();
    });
  }

  return (
    <div className="flex flex-col justify-between gap-3 p-4 lg:p-10 bg-customDarkBlue w-[100vw] h-[100dvh] md:p-[50px] lg:px-[100px] py-[5vh] md:py-[10vh]">
      <Header currentUser={currentUser} />
      <Messages
        currentUser={currentUser}
        handleDeleteMessage={handleDeleteMessage}
        handleSetEditing={handleSetEditing}
      />
      <SendForm
        currentUser={currentUser}
        isEditing={isEditing}
        handleSaveEdit={handleSaveEdit}
        handleCancelEdit={handleCancelEdit}
      />
    </div>
  );
}

export default ShowMessages;
