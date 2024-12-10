import React from 'react';
import { Link } from 'react-router-dom';

const CaptainLogin = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [captainData, setCaptainData] = React.useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        setCaptainData({
            email: email,
            password: password,
        });

        setEmail('');
        setPassword('');
    };

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <form onSubmit={(e) => submitHandler(e)}>
                    <img 
                        className='w-16 mb-10' 
                        src="https://freelogopng.com/images/all_img/1659761425uber-driver-logo-png.png" 
                        alt="Uber Driver Logo" 
                    />
                    <h3 className='text-lg font-medium mb-2'>What is your Email</h3>
                    <input
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-[#eeeeee] rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base mb-7'
                        type="email"
                        placeholder="email@example.com"
                    />
                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='bg-[#eeeeee] rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base mb-7'
                        type="password"
                        placeholder="password"
                    />
                    <button className='bg-[#111] text-white font-semibold rounded-lg px-4 py-2 w-full text-lg'>
                        Login
                    </button>
                    <p className='text-center mt-3'>
                        Join a fleet?{' '}
                        <Link to='/captain-signup' className='text-blue-600'>
                            Register as a Captain
                        </Link>
                    </p>
                </form>
            </div>
            <div>
                <Link
                    to='/login'
                    className='bg-[#e8b247] flex items-center justify-center text-white font-semibold rounded-lg px-4 py-2 w-full text-lg'>
                    Sign in as User
                </Link>
            </div>
        </div>
    );
};

export default CaptainLogin;
