import Header from './Header';
import {
  useEffect,
  useRef,
  useState,
} from 'react';
import { checkValidData } from '../utils/validate';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const Login = () => {
  const [isSignInForm, SetIsSignInForm] = useState(true);
  const [errorMessage, SetErrorMessage] = useState('');

  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);
  const navigate = useNavigate();

  const toggleForm = () => {
    SetIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = async () => {
    const isValid = checkValidData(
      email?.current?.value,
      password?.current?.value
    );



    if (isSignInForm && isValid == '') {

      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          email: email?.current?.value,
          password: password?.current?.value

        })
        console.log(response, 'dsdsd')
        if (response.data.status == 'success') {
          localStorage.setItem('token', response?.data.access_token)
          navigate('./browse');
        }
        if (response?.data?.statusCode == 400) {
          SetErrorMessage('Login Failed')
        }


      } catch (error) {
        SetErrorMessage('Login Failed')
        console.error('Login Failed', error)
      }

    } else if (!isSignInForm) {
      if (isValid == '') {
        try {
          const response = await axios.post('http://localhost:3000/auth/register', {
            email: email?.current?.value,
            password: password?.current?.value,
            username: fullName?.current?.value,
            name:fullName?.current?.value,

          })
          if(response?.data?.status == 'created'){
            SetIsSignInForm(true)
          }
        } catch (error) {
            SetErrorMessage('Sign up Failed')
        }
      }

    } else {
      console.log(isValid, isSignInForm);
      SetErrorMessage(isValid);
    }

  };

  return (
    <div>
      <Header />

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute p-12 bg-black w-1/2 mt-36 mx-auto right-0 left-0 text-white"
      >
        <h1 className="font-bold p-4">
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </h1>
        {!isSignInForm ? (
          <input
            ref={fullName}
            type="text"
            placeholder="Full Name"
            className="p-2 m-2 w-full text-black"
          />
        ) : (
          ''
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email address"
          className="p-2 m-2 w-full text-black"
        />

        <input
          ref={password}
          type="text"
          placeholder="Password"
          className="p-2 m-2 w-full text-black"
        />
        <p className="text-red-700 font-bold p-2">{errorMessage}</p>
        <button
          className="p-2 m-2 bg-red-700 w-full"
          onClick={handleButtonClick}
        >
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>
        <p className="p-2 font-bold" onClick={toggleForm}>
          {isSignInForm
            ? 'New to Netflix ? Sign up Now'
            : 'Already Register ... Sign In Here'}
        </p>
      </form>
    </div>
  );
};

export default Login;
