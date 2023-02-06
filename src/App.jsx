import React, { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import "./App.css";

import firebaseApp from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [users, setUsers] = useState(null);
  const auth = getAuth(firebaseApp);

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      setUsers(userFirebase);
    } else {
      setUsers(null);
    }
  });

  return (
    <>
      <div className="">
        {users ? <Home correoUsuario={users.email} /> : <Login />}
      </div>
    </>
  );
}

export default App;
