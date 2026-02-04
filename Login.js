import { useState } from "react";

const Login = () => {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    console.log("changed", e.target.name);
    console.log("changed", e.target.value);

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <h2>Login Form</h2>

      <div>
        <label>Email Id</label>
        <input
          type="text"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
