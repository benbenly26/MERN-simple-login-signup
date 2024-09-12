import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast } from "sonner";
import { API } from "./service/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.length < 3 || password.length < 3) {
      toast.error("please fill all the fields");
    }
    if (email.length >= 3 || password.length >= 3) {
      try {
        let data = {
          email: email,
          password: password,
        };
        const res = await API.post(`user/login`, data);
        console.log("res", res);
        if (res.status == 200) {
          toast.success(res.data.msg);
        }
      } catch (e) {
        console.log("e", e);
        if (e.status == 422) {
          toast.error(e.response.data.msg);
        }
      }
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
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
              Login
            </button>
          </form>
          <p>Don't have a Account</p>
          <Button
            className="btn-warning border w-100 rounded-0"
            onClick={handleRegister}
          >
            Register
          </Button>
        </div>
      </div>
    </>
  );
}
