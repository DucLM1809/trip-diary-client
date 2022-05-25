import React, {useState} from 'react';
import { useGoogleLogin } from 'react-google-login';
import { useForm } from 'react-hook-form';
import logo from '../../assests/images/logo.png';
import GoogleIcon from '../../assests/images/google.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { loginAccount, loginGoogle, logOut } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { getUserInfo } from '../../redux/actions';

const Signin = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/home';
  const clientId =
    '518727150893-4c80ip0io9lbbnmbrujki5l8cn4vrvvv.apps.googleusercontent.com';

  const onSuccess = (response) => {
    handleLoginGoogle(response);
    dispatch(loginGoogle(response));
    navigate(from, { replace: true });
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    clientId,
  });

  const handleLoginGoogle = async (response) => {
    let res = await api.post('/login/google', {
      tokenId: response.tokenId,
    });

    localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${res.data.accessToken}`,
      },
    };

    res = await api.get('/users/', config);
    dispatch(getUserInfo(res.data[0]))
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    handleLoginAccount(data);
    // dispatch(loginAccount(data));
  };

  const handleLoginAccount = async (data) => {
    let res = await api
      .post(
        // "/api/login/",
        '/login/',
        {
          username: data.account,
          password: data.password,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .catch((error) => {
        console.log(error);
        setError(error.response.data.detail);
        // alert(error.response.data.detail);
        // alert(error.response.data.detail);
      });

    if (res) {
      dispatch(loginAccount(data));
      localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
    }
    // else {
    //   navigate("/sign-in");
    // }
    console.log(res);
  };

  return (
    <div className='bg-sign-in bg-no-repeat bg-center bg-cover h-screen flex items-center justify-center'>
      <div className='bg-modal shadow-xl w-2/5 py-10 rounded-10 flex flex-col items-center justify-center'>
        <div className='flex flex-col justify-center items-center'>
          <img src={logo} alt='logo' className='w-9' />
          <span className='text-white font-extrabold text-3xl ml-2 font-logo'>
            TriPari's
          </span>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          {error ? (
            <>
              <div
                className="bg-light-pink border-1 border-red text-red py-2 px-2 mt-3 rounded-3 relative text-center"
              >
                <span class="block sm:inline">{error}</span>
              </div>
            </>
          ) : (
            <></>
          )}
          <input
            type='text'
            {...register('account', {
              required: 'You must specify an email',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email format',
              },
            })}
            placeholder="Email"
            className="border-solid border-gray border-1 mt-8 py-2 w-[19rem] p-3 rounded-3 font-normal text-sm outline-medium-blue"
          />
          {errors?.account && (
            <p className="text-xs mt-2 font-normal text-danger before:inline before:content-['⚠'] ">
              {errors.account.message}
            </p>
          )}
          <input
            type='password'
            {...register('password', {
              required: 'You must specify password',
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters',
              },
            })}
            placeholder="Password"
            className="border-solid border-gray border-1 mt-4 py-2 w-[19rem] p-3 rounded-3 font-normal text-sm outline-medium-blue"
          />
          {errors?.password && (
            <p className="text-xs my-2 font-normal text-danger before:inline before:content-['⚠'] ">
              {errors.password.message}
            </p>
          )}
          <button
            className='bg-light-blue py-[0.5rem] mt-4 mb-2 font-semibold text-white rounded-3 hover:opacity-90 hover:text-gray'
            // onClick={handleSubmit(onSubmit)}
          >
            Login
          </button>
          <div className='flex p-3 md:py-[12.9px] items-center'>
            <div className='flex-grow border-t-[0.7px] border-gray'></div>
            <span className='flex-shrink mx-2 md:mx-4 text-gray text-sm md:text-base'>
              OR
            </span>
            <div className='flex-grow border-t-[0.7px] border-gray'></div>
          </div>

          <button
            className='flex justify-center items-center bg-white text-[#6b7280] text-[14px] py-[10px] w-full rounded-3 hover:opacity-80'
            onClick={signIn}
          >
            <img src={GoogleIcon} className='w-[18px] h-[18px] mr-2' />
            Login with Google
          </button>

          <div className='flex justify-between text-[#f2f2f2] mt-2'>
            <Link
              to='/forget-password'
              className='font-semibold hover:text-[#cbd5e1]'
            >
              Forget password?
            </Link>
            <Link to='/sign-up' className='font-semibold hover:text-[#cbd5e1]'>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;