import { useLocation } from "react-router-dom";
import Header from "../Components/Header";
import Messages from "../Components/Messages";
import SendForm from "../Components/SendForm";
import { useContext, useEffect } from "react";
import { DataContext } from "../App";

function ShowMessages({ currentUser, setCurrentUser }) {
  return (
    <div className="flex flex-col justify-between gap-3 p-4 lg:p-10 bg-customDarkBlue w-[100vw] h-[100dvh] md:p-[50px] lg:px-[100px] lg:py-[80px]">
      <Header currentUser={currentUser} />
      <Messages currentUser={currentUser} />
      <SendForm currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </div>
  );
}

export default ShowMessages;
