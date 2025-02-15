import React, {useState, useEffect} from 'react'
import './Register.css';
import { Link } from 'react-router-dom';
import { useApi } from '../../contexts/ApiContext';
import { toast } from 'react-toastify';


export default function Register() {

  const { register } = useApi();


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };


  const checkTheForm = (formData) => {
    let checked = true;
    let errors = {};

    for (let key in formData) {
      if (
        formData[key] === "" ||
        formData[key] === null ||
        formData[key] === false
      ) {
        errors[key] = `${capitalize(key)} is missing.`;
        checked = false;
      }
    }
    return { checked, errors };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { checked, errors } = checkTheForm(formData);

    if (checked) {
      register(formData);
    } else {
      console.log(errors);
      Object.values(errors).forEach((err) => toast.error(capitalize(err)));
    }
  };

  const capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1).split("_").join(" ");
  };







  return (
    <div className="login-page">
      <div className="register_container">
        <div className="header">
          <h1>Register</h1>
          <h5 className='mt-3'>A whole community awaits for your post!</h5>
        </div>
        <form onSubmit={handleSubmit}>
        <div className='text-start mt-4'>
          <label htmlFor="email" className='ms-1'><h5>Email</h5></label>
          <input type="text" id="email" className="email" onChange={handleInputChange} placeholder="Enter your email"/>
        </div>
        <div className='text-start mt-4'>
          <label htmlFor="username" className='ms-1'><h5>Username</h5></label>
          <input type="text" id="username" className="email" onChange={handleInputChange} placeholder="Enter your username"/>
        </div>
        <div className='text-start mt-4'>
          <label htmlFor="password" className='ms-1'><h5>Password</h5></label>
          <input type="password" id="password" onChange={handleInputChange} className="password" placeholder="Enter your password"/>
        </div>
        <button className='mt-5 register_button'>Register</button>
        </form>
        <p className='mt-4'>
            <Link to="/login" className="link">Already have an account?, Login</Link>
        </p>
      </div>
    </div>
  )
}
