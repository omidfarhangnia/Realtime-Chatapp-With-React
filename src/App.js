import { Route, Routes } from "react-router-dom";
import ShowMessages from "./Pages/ShowMessages";
import CreateAccount from "./Pages/CreateAccount";
import { createContext, useState } from "react";

export const DataContext = createContext([]);

function App() {
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  return (
    <>
      <DataContext.Provider value={{ data, setData }}>
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
      </DataContext.Provider>
    </>
  );
}

export default App;

/*
  {
    userName: string,
    userId: uuid,
    userMessages: [
      {
        text: string,
        time: Date
      }
    ],
    userImageUrl: string
  } 
*/
