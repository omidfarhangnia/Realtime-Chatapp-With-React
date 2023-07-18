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
          {/* <Route
            path="/"
            element={<CreateAccount setCurrentUser={setCurrentUser} />}
          /> */}
          <Route
            // path="/messages"
            path="/"
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
    name: string,
    id: uuid,
    messages: [
      {
        text: string,
        time: Date
      }
    ],
    imagePath: string
  } 
*/
