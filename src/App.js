import { Route, Routes } from "react-router-dom";
import ShowMessages from "./Pages/ShowMessages";
import CreateAccount from "./Pages/CreateAccount";
import { useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<CreateAccount setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/messages"
          element={
            <ShowMessages
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
