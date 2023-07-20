import { Route, Routes } from "react-router-dom";
import ShowMessages from "./Pages/ShowMessages";
import CreateAccount from "./Pages/CreateAccount";
import { createContext, useEffect, useState } from "react";

export const DataContext = createContext([]);

function App() {
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (data.length > 0) {
      data.map((dataMember) => {
        if (dataMember.id === currentUser.id) {
          setCurrentUser(dataMember);
        }
        return "";
      });
    }
  }, [data]);

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
