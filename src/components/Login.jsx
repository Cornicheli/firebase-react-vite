import React, { useState } from "react";

import img1 from "../image/img1.jpg";
import img2 from "../image/img2.jpg";
import img3 from "../image/img3.jpg";

import firebaseApp from "../../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
const auth = getAuth(firebaseApp);

export default function Login() {
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
      <div className="d-flex flex-row">
        <div
          id="carouselExampleSlidesOnly"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={img1} className="dimension-img" alt="img" />
            </div>
            <div className="carousel-item">
              <img src={img2} className="dimension-img" alt="img" />
            </div>
            <div className="carousel-item">
              <img src={img3} className="dimension-img" alt="img" />
            </div>
          </div>
        </div>

        {/* En esta section sera el form */}

        <div className="col-md-8  container">
          <div className="mt-5 ms-5">
            <h1>{register ? "registrate" : "inicia session"}</h1>
            <form onSubmit={handlerSubmit}>
              <div className="mb-3">
                <label className="form-label">Dirrecion de Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="ingrese su email"
                  id="email"
                  required
                />

                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="ingrese su clave"
                    id="password"
                    required
                  />
                </div>
              </div>
              <button className="btn btn-primary" type="submit">
                {register ? "registrate" : "inicia sesion"}
              </button>
            </form>
            <div className="form-group">
              <button
                className="btn btn-secondary mt-4 form-control"
                onClick={() => setRegister(!register)}
              >
                {register
                  ? "ya tiene una cuenta creada? Inicia sesion"
                  : "no tiene cuenta? Registrate"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
