import React, { useEffect, useState } from "react";
import firebaseApp from "../../firebase";
import { getAuth, signOut } from "firebase/auth";
// import { async } from "@firebase/util";
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
  const db = getFirestore(firebaseApp);

  const auth = getAuth(firebaseApp);

  const initialvalue = {
    name: "",
    age: "",
    profession: "",
  };

  // variable de estado
  const [users, setUsers] = useState(initialvalue);
  const [list, setList] = useState([]); // estado inicial vacio
  const [subId, setSubId] = useState("");

  // ---------------------

  //function para capturar datos
  const captureInput = (e) => {
    const { name, value } = e.target;
    setUsers({ ...users, [name]: value });
  };

  // ---------------------

  //function para actualizar/guardar datos

  const saveDate = async (e) => {
    e.preventDefault();
    if (subId === "") {
      try {
        await addDoc(collection(db, "users"), {
          ...users,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      await setDoc(
        doc(db, "users", subId, {
          ...users,
        })
      );
    }
    setUsers({ ...initialvalue });
    setSubId("");
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

  //function parar eliminar de la list de user
  const deleteUsers = async (id) => {
    await deleteDoc(doc(db, "users", id));
  };

  // ---------------------

  const getOne = async (id) => {
    try {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      setUsers(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (subId !== "") {
      getOne(subId);
    }
  }, [subId]);

  return (
    <>
      <div className="container">
        <h2 className="text-center mt-5">
          Bienvenido, <strong>{correoUsuario}</strong> Has Iniciado Sesion
        </h2>
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" onClick={() => signOut(auth)}>
            Cerrar Session
          </button>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-4">
            <h3 className="text-center mb-3">Enter User</h3>
            <form onSubmit={saveDate}>
              <div className="card card-body">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control mb-4"
                    placeholder="enter your name"
                    onChange={captureInput}
                    value={users.name}
                    required
                  />
                  <input
                    type="text"
                    name="age"
                    className="form-control mb-4"
                    placeholder="enter your age"
                    onChange={captureInput}
                    value={users.age}
                    required
                  />
                  <input
                    type="text"
                    name="profession"
                    className="form-control mb-4"
                    placeholder="enter your profession"
                    onChange={captureInput}
                    value={users.profession}
                    required
                  />
                </div>
                <button className="btn btn-primary">
                  {subId === "" ? "Save" : "update"}
                </button>
              </div>
            </form>
          </div>
          {/* esta seccion es la lista de nuestros usuarios */}
          <div className="col-md-8">
            <h2 className="text-center mb-5">User List</h2>
            <div className="container card">
              <div className="card-body">
                {list.map((list) => (
                  <div className="border m-3" key={list.id}>
                    <p className="p-1 text-black-50">Name: {list.name}</p>
                    <p className="p-1 text-black-50">Age: {list.age}</p>
                    <p className="p-1 text-black-50">
                      Profession: {list.profession}
                    </p>
                    <div className="d-flex flex-row">
                      <button
                        className="btn btn-success w-40 m-2"
                        onClick={() => setSubId(list.id)}
                      >
                        Update
                      </button>

                      <button
                        className="btn btn-danger w-40 m-2"
                        onClick={() => deleteUsers(list.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
