import Header from './Header';
import {
  useEffect,
  useRef,
  useState,
} from 'react';
import { checkValidData } from '../utils/validate';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [isSignInForm, SetIsSignInForm] = useState(true);
  const [errorMessage, SetErrorMessage] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1').then((res) =>
      res.json().then((js) => console.log(js))
    );
  }, []);

  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  const toggleForm = () => {
    SetIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    const isValid = checkValidData(
      email?.current?.value,
      password?.current?.value
    );
    if (isSignInForm && isValid == null) {
      navigate('./browse');
    }
    console.log(isValid, isSignInForm);
    SetErrorMessage(isValid);
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
