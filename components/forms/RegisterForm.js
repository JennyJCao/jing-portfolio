import React from "react";
import {useState} from "react";

const RegisterForm = ({onSubmit}) => {

  const [form, setForm] = useState({});

  const handleChange = (e) => {
    const {name, value} = e.target;
    // 在{}中的key如果是变量，取其值要加[]
    setForm({
      ...form,
      [name]: value
    })
  }

  return (
    <form onSubmit={() => onSubmit(form)}>
      <div className="form-group">
        <label htmlFor="avatar">Avatar</label>
        <input
          onChange={handleChange}
          type="text"
          className="form-control"
          name="avatar"
          id="avatar" />
      </div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          onChange={handleChange}
          type="text"
          className="form-control"
          name="username"
          id="username" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange}
          type="email"
          className="form-control"
          name="email"
          id="email" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          type="password"
          className="form-control"
          name="password"
          id="password" />
      </div>
      <div className="form-group">
        <label htmlFor="passwordConfirmation">Password Confirmation</label>
        <input
          onChange={handleChange}
          type="password"
          className="form-control"
          name="passwordConfirmation"
          id="passwordConfirmation" />
      </div>
      {/*提交方式一*/}
      {/*<button*/}
      {/*  onClick={handleSubmit}*/}
      {/*  type="button"*/}
      {/*  className="btn btn-main bg-blue py-2 ttu">Submit</button>*/}
      <button
        type="submit"
        className="btn btn-main bg-blue py-2 ttu">Submit</button>
    </form>
  )
}

export default RegisterForm;