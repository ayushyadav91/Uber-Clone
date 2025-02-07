import React from 'react';
import { Link } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const UserLogin = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userData, setUserData] = React.useState({});
  

  const navigate  = useNavigate();
  const {user, setUser } = React.useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, newUser);
  if(response.status === 200){
    const data = response.data
    navigate('/home')
  }
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
          <img
            className='w-16 mb-10'
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt=""
          />

          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <h3 className='text-lg font-medium mb-2'>What is your Email</h3>
            <input
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              type="email"
              placeholder="email@example.com"
            />

            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
            <input
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              type="password"
              placeholder="password"
            />

            <button
              className='bg-[#111] text-white font-semibold rounded-lg px-4 py-2 w-full text-lg'
            >
              Login
            </button>
          </form>

          <p className='text-center mt-3'>
            New here?{' '}
            <Link to='/signup' className='text-blue-600'>
              Create New Account
            </Link>
          </p>
        </div>

        <div>
          <Link
            to='/captain-login'
            className='bg-[#54bf77] flex items-center justify-center text-white font-semibold rounded-lg px-4 py-2 w-full text-lg'
          >
            Sign in as Captain
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
