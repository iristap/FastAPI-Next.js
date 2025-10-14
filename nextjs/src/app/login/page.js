"use client";

import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password)
    };

    const handleRegister = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8000/auth', {
          username: registerUsername,
          password: registerPassword,
        });
        login(registerUsername, registerPassword);
      } catch(error) {
        console.error('Failed to register user:', error);
    }
  }

    return (
        <div className="container">
          <div style={{maxWidth:900, margin:'0 auto'}}>
            <div className="panel">
              <h2 style={{marginBottom:12}}>Welcome</h2>
              <p className="muted" style={{marginBottom:18}}>Login or register to manage your workouts and routines.</p>
              <div style={{display:'grid', gridTemplateColumns: '1fr 1fr', gap:16}}>
                <div className="card">
                  <div className="card-body">
                    <h3 style={{marginBottom:8}}>Login</h3>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label className="form-label" htmlFor="username">Username</label>
                        <input id="username" className="form-control" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input id="password" className="form-control" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                      </div>
                      <button className="btn btn-primary" type="submit">Login</button>
                    </form>
                  </div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <h3 style={{marginBottom:8}}>Register</h3>
                    <form onSubmit={handleRegister}>
                      <div className="form-group">
                        <label className="form-label" htmlFor="registerUsername">Username</label>
                        <input id="registerUsername" className="form-control" type="text" value={registerUsername} onChange={(e)=>setRegisterUsername(e.target.value)} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="registerPassword">Password</label>
                        <input id="registerPassword" className="form-control" type="password" value={registerPassword} onChange={(e)=>setRegisterPassword(e.target.value)} required />
                      </div>
                      <button className="btn btn-primary" type="submit">Register</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

};

export default Login;