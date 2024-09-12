import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast } from "sonner";
import { API } from "./service/api";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 3 || email.length < 3 || password.length < 3) {
      toast.error("please fill all the fields");
    }
    if (name.length >= 3 && email.length >= 3 && password.length >= 3) {
      try {
        let data = {
          name: name,
          email: email,
          password: password,
        };
        const res = await API.post(`user/register`, data);
        console.log("res", res);
        if (res.status == 200) {
          toast.success(res.data.msg);
          handleLogin();
        }
      } catch (e) {
        console.log("e", e);
        toast.error(e.response.data.msg);
      }
    }
  };

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control rounded-0"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control rounded-0"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter password"
                autoComplete="off"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control rounded-0"
              />
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Register
            </button>
          </form>
          <p>Already have a Account</p>
          <Button
            className="btn-warning border w-100 rounded-0"
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
}
