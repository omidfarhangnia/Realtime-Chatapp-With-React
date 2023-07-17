import { useLocation } from "react-router-dom";
import Header from "../Components/Header";
import Messages from "../Components/Messages";
import SendForm from "../Components/SendForm";
import { useContext, useEffect } from "react";
import { DataContext } from "../App";

function ShowMessages({ currentUser, setCurrentUser }) {
  return (
    <div className="flex flex-col gap-3 p-10">
      <Header currentUser={currentUser} />
      <Messages currentUser={currentUser} />
      <SendForm currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </div>
  );
}

export default ShowMessages;
