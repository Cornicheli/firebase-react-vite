import React, { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import "./App.css";

import firebaseApp from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(firebaseApp);

function App() {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      setUser(userFirebase);
    } else {
      setUser(null);
    }
  });

  return (
    <>
      <div className="">
        {user ? <Home correoUsuario={user.email} /> : <Login />}
      </div>
    </>
  );
}

export default App;
