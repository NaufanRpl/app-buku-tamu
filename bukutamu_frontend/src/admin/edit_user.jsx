import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditUser = () => {
  const { id } = useParams();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    getUser();
  }, []);
  const handleChange = (event) => {
    const name = event.target.name;
    name === "nama" ? setNama(event.target.value) : "";
    name === "email" ? setEmail(event.target.value) : "";
  };
  const getUser = async () => {
    const response = await fetch("http://localhost:3000/api/users/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setNama(data.nama);
    setEmail(data.email);
  };
  const handleUpdate = async (event) => {
    event.preventDefault();
    const fData = {};
    const frmel = event.target;
    for (let elm of frmel.elements) {
      fData[elm.name] = elm.value;
    }
    const response = await fetch("http://localhost:3000/api/users/" + id, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fData),
    });
    if (!response.ok) {
      console.log((error) => console.error);
    } else {
      event.target.reset();
      Swal.fire({
        icon: "success",
        text: "Update data berhasil",
        timer: 1000,
      }).then((res) => {
        window.location.href = "/admin/user";
      });
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div
              className="card"
              style={{ marginTop: "8rem", left: "18rem", alignItems: "center" }}
              id="edit_user"
            >
              <div className="card-header">
                <h2 className="text-center">
                  <span className="warna">Edit</span> <span>Data User</span>
                </h2>
              </div>
              <form onSubmit={handleUpdate}>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="nama" style={{ color: "white" }}>
                      Nama
                    </label>
                    <input
                      type="text"
                      value={nama}
                      onChange={handleChange}
                      name="nama"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" style={{ color: "white" }}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={handleChange}
                      name="email"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" style={{ color: "white" }}>
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                    />
                    <span
                      style={{
                        backgroundColor: "rgba( 0, 0, 0, 0.6)",
                        color: "rgba( 255, 255, 255, 1)",
                        marginTop: "1rem",
                        padding: "2.5px 10px",
                        borderRadius: "5px",
                        display: "inline-block",
                      }}
                    >
                      *Kosongkan jika tidak ingin mengubah Password
                    </span>
                  </div>
                </div>
                <div className="card-footer">
                  <button type="submit" className="btn btn-primary">
                    Simpan
                  </button>
                  <a href="/admin/user" className=" btn btn-primary float-end">
                    Lihat Data
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
