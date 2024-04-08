import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  useEffect(() => {
    const validationErrors = {}
    if(password.length < 8 || password.length > 30) validationErrors.password = "Password must be between 8 and 30 characters";
    if(!email.match(validRegex)) validationErrors.email = "Please enter a valid email";
    if (username.length < 6 || username.length > 20) validationErrors.username = "Username must be between 6 and 20 characters";
    setErrors(validationErrors)
  }, [email, username, password])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <div className="signup-modal">
        <h1>Sign Up</h1>
        <div className="errors-container">
          {errors.server && <p className="errors">{errors.server}</p>}
        </div>
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="row">
            <label className="row-style">
              <p>Email</p>
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
              <p>Username</p>
              <input
                className="input-field"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="errors-container">
            {errors.username && <p className="errors">{errors.username}</p>}
          </div>
          <div className="row">
            <label className="row-style">
              <p>Password</p>
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
          <div className="row">
            <label className="row-style">
              <p>Confirm Password</p>
              <input
                className="input-field"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="errors-container">
            {errors.confirmPassword && <p className="errors">{errors.confirmPassword}</p>}
          </div>
          <button className="submit-button" type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
