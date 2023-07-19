import Header from "../Components/Header";
import Messages from "../Components/Messages";
import SendForm from "../Components/SendForm";

function ShowMessages({ currentUser, setCurrentUser }) {
  return (
    <div className="flex flex-col justify-between gap-3 p-4 lg:p-10 bg-customDarkBlue w-[100vw] h-[100dvh] md:p-[50px] lg:px-[100px] py-[5vh] md:py-[10vh]">
      <Header currentUser={currentUser} />
      <Messages currentUser={currentUser} />
      <SendForm currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </div>
  );
}

export default ShowMessages;
