import React, {useState, useEffect} from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { useApi } from '../../contexts/ApiContext';
import { toast } from 'react-toastify';

export default function Login() {

    const { login } = useApi();

    const [formData, setFormData] = useState({
      email: '',
      password: ''
    })

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
          login(formData);
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
      <div className="login_container">
        <div className="header_login">
          <h1>Login</h1>
          <h5 className='mt-3'>Welcome back to YelpCamp!</h5>
        </div>
        <form onSubmit={handleSubmit}>
        <div className='text-start mt-4'>
          <label htmlFor="email" className='ms-1'><h5>Email</h5></label>
          <input type="text" id="email" onChange={handleInputChange} className="email" placeholder="Enter your email"/>
        </div>
        <div className='text-start mt-4'>
          <label htmlFor="password" className='ms-1'><h5>Password</h5></label>
          <input type="password" id="password" onChange={handleInputChange} className="password" placeholder="Enter your password"/>
        </div>
        <button className='mt-5 login_button'>Login</button>
        </form>
        <p className='mt-4'>
            <Link to="/register" className="link">Don't have an account?,  Register</Link>
        </p>
      </div>
    </div>
  );
}
