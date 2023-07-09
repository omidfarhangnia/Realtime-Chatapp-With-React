import Header from "./Components/Header";
import Messages from "./Components/Messages";
import SendForm from "./Components/SendForm";

function App() {
  return (
    <>
      <div className="flex flex-col gap-3 p-10">
        <Header />
        <Messages />
        <SendForm />
      </div>
    </>
  );
}

export default App;
