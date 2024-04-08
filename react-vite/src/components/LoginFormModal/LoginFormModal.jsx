import { useEffect, useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const demoUser = () => {
    setEmail("demo@aa.io");
    setPassword("password");
  };

  return (
    <>
    <div className="login-modal">
      <h1>Log In</h1>
      <form className="modal-content" onSubmit={handleSubmit}>
      <div className="row">
          <label className="row-style">
            Email
            <input
              className="input-field"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="errors-container">
          {errors.email && <p className="errors">{errors.email}</p>}
        </div>
        <div className="row">
          <label className="row-style">
            Password
            <input
              className="input-field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="errors-container">
          {errors.password && <p className="errors">{errors.password}</p>}
        </div>
        <button className= "login-button" type="submit">Log In</button>
        <button className="demo-user" onClick={demoUser}>
              Demo User
        </button>
      </form>
      </div>
    </>
  );
}

export default LoginFormModal;
