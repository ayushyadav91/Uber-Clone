import React from 'react'
import { Link } from 'react-router-dom';

const CaptainSignup = () => {
     const [email, setEmail] = React.useState('');
     const [password, setPassword] = React.useState('');
     const [firstName, setFirstName] = React.useState('');
     const [lastName, setLastName] = React.useState('');
     const [captain, setCaptainData] = React.useState({});
   
     const submitHandler = (e) => {
       e.preventDefault();
       setCaptainData({
         fullName: {
           firstName: firstName,
           lastName: lastName,
         },
         email: email,
         password: password,
       });
       setEmail('');
       setPassword('');
       setFirstName('');
       setLastName('');
     };
  return (
     <div>
     <div className='p-7 h-screen flex flex-col justify-between'>
       <div>
         <img
           className='w-16 mb-10'
           src="https://freelogopng.com/images/all_img/1659761425uber-driver-logo-png.png"
           alt="Captain SignUp"
         />

         <form
           onSubmit={(e) => {
             submitHandler(e);
           }}
         >
           <h3 className='text-lg w-1/2 font-medium mb-2'>What's your name</h3>
           <div className='flex gap-4 mb-7'>
             <input
               required
               className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
               type='text'
               placeholder='First name'
               value={firstName}
               onChange={(e) => {
                 setFirstName(e.target.value);
               }}
             />
             <input
               required
               className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
               type='text'
               placeholder='Last name'
               value={lastName}
               onChange={(e) => {
                 setLastName(e.target.value);
               }}
             />
           </div>
           <h3 className='text-lg font-medium mb-2'>What's your email</h3>
            <input
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              type='email'
              placeholder='email@example.com'
            />

            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

            <input
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              type='password'
              placeholder='password'
            />

            <button
              className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
            >
              Create account
            </button>
          </form>
          <p className='text-center'>
            Already have an account?{' '}
            <Link to='/captain-login' className='text-blue-600'>
              Login here
            </Link>
          </p>
        </div>
        <div>
        <p className='text-[10px] leading-tight'>
            This site is protected by reCAPTCHA and the{' '}
            <span className='underline'>Google Privacy Policy</span> and{' '}
            <span className='underline'>Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CaptainSignup
