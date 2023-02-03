import React, { useEffect, useState } from "react";
import firebaseApp from "../../firebase";
import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";

export default function Home({ correoUsuario }) {
  const auth = getAuth(firebaseApp);

  const initialvalue = {
    name: "",
    age: "",
    profession: "",
  };

  // variable de estado
  const [user, setUser] = useState(initialvalue);
  const [list, setList] = useState([]); // estado inicial vacio
  const db = getFirestore(firebaseApp);

  // ---------------------

  //function para capturar datos
  const captureInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  // ---------------------

  //function para guardar datos
  const saveData = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      await addDoc(collection(db, "users"), {
        ...user,
      });
    } catch (error) {
      console.log(error);
    }

    setUser({ ...initialvalue });
  };
  // ---------------------

  //function parar renderizar la list de user
  useEffect(() => {
    const getList = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id }); // union y almacenamiento juntos
        });
        setList(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, [list]);
  // ---------------------

  return (
    <>
      <div className="container">
        <p>
          Bienvenido, <strong>{correoUsuario}</strong> Has Iniciado Sesion
        </p>

        <button className="btn btn-primary" onClick={() => signOut(auth)}>
          Cerrar Session
        </button>
        <hr />
        <div className="row">
          <div className="col-md-4">
            <h3 className="text-center mb-3">Enter User</h3>
            <form onSubmit={saveData}>
              <div className="card card-body">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control mb-4"
                    placeholder="enter your name"
                    onChange={captureInput}
                    value={user.name}
                  />
                  <input
                    type="number"
                    name="age"
                    className="form-control mb-4"
                    placeholder="enter your age"
                    onChange={captureInput}
                    value={user.age}
                  />
                  <input
                    type="text"
                    name="profession"
                    className="form-control mb-4"
                    placeholder="enter your profession"
                    onChange={captureInput}
                    value={user.profession}
                  />
                </div>
                <button className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
          {/* esta seccion es la lista de nuestros usuarios */}
          <div className="col-md-8">
            <h2 className="text-center mb-5">User List</h2>
            <div className="container card">
              <div className="card-body">
                {list.map((list) => (
                  <div key={list.id}>
                    <p>Name: {list.name}</p>
                    <p>Age:{list.age}</p>
                    <p>Profession:{list.profession}</p>
                  </div>
                ))}
                <div className="d-flex flex-row">
                  <button className="btn btn-green w-50 m-2">Update</button>

                  <button className="btn btn-danger w-50 m-2">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
