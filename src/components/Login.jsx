import React, { useState } from "react";
import "../index.css";

import firebaseApp from "../../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function Login() {
  const auth = getAuth(firebaseApp);

  const [register, setRegister] = useState(false);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const contraseña = e.target.password.value;

    if (register) {
      await createUserWithEmailAndPassword(auth, correo, contraseña);
    } else {
      await signInWithEmailAndPassword(auth, correo, contraseña);
    }
  };

  return (
    <>
      <div className="mediaquarie d-flex flex-wrap">
        <div
          id="carouselExampleSlidesOnly"
          className="carousel slide col-md-6"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://images.pexels.com/photos/2435561/pexels-photo-2435561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="dimension-img"
                alt="img"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.pexels.com/photos/7527761/pexels-photo-7527761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="dimension-img"
                alt="img"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.pexels.com/photos/2681631/pexels-photo-2681631.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="dimension-img"
                alt="img"
              />
            </div>
          </div>
        </div>

        {/* En esta section sera el form */}

        <div className="col-md-6  container">
          <div className="mt-5 ms-5">
            <h1>{register ? "Sign Up" : "Log In"}</h1>
            <form onSubmit={handlerSubmit}>
              <div className="mb-3">
                <label className="form-label">Your Email</label>
                <input
                  type="email"
                  className="form-control w-75"
                  placeholder="Ingresa tu email"
                  id="email"
                  required
                />

                <div className="mb-3">
                  <label className="form-label">Your Password</label>
                  <input
                    type="password"
                    className="form-control w-75"
                    placeholder="ingresa tu clave"
                    id="password"
                    required
                  />
                </div>
              </div>
              <button className="btn btn-primary" type="submit">
                {register ? "Sign Up" : "Log In"}
              </button>
            </form>
            <div className=" flex align-content-center form-group w-50">
              <button
                className="btn btn-secondary mt-4 form-control"
                onClick={() => setRegister(!register)}
              >
                {register ? "Register" : "Start Session"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
