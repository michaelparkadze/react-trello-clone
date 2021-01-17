import { useState } from "react";
import { auth } from "../../firebase";
import { useHistory, Link } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import "./styles.scss";

export default function SignIn() {
  const history = useHistory();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    error: null,
  });

  const handleOnSubmit = (event) => {
    event.preventDefault();

    const { email, password } = userDetails;

    return auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => history.push("/boards"))
      .catch((error) =>
        setUserDetails((prevState) => ({ ...prevState, error: error.message }))
      );
  };

  const handleOnChange = (event) => {
    event.preventDefault();
    setUserDetails((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="sign-in-container">
      <Form>
        <h1>Sign in</h1>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            type="email"
            name="email"
            placeholder="Enter your email address"
            onChange={(e) => handleOnChange(e)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => handleOnChange(e)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" block onClick={(e) => handleOnSubmit(e)}>
            Sign in
          </Button>
        </Form.Item>
        {userDetails.error && <div>{userDetails.error}</div>}
        <Form.Item>
          <div style={{ marginBottom: "12px" }}>
            <Link to="/forgot-password">Forgot your password?</Link>
          </div>
          Don't have an account? <Link to="/sign-up">Sign up</Link>
        </Form.Item>
      </Form>
    </div>
  );
}
