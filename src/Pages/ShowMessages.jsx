import Header from "../Components/Header";
import Messages from "../Components/Messages";
import SendForm from "../Components/SendForm";

function ShowMessages({ currentUser, setCurrentUser }) {
  return (
    <div className="flex flex-col gap-3 p-10">
      <Header currentUser={currentUser} />
      <Messages currentUser={currentUser} />
      <SendForm setCurrentUser={setCurrentUser} />
    </div>
  );
}

export default ShowMessages;
