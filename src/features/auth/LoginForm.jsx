import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get('returnTo');

  const handleAfterAuth = () => {
    const redirectTo = returnTo
      ? decodeURIComponent(returnTo)
      : "/";
    navigate(redirectTo, { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      await login(email, password);
      handleAfterAuth();
    } catch (err) {
      setError('Invalid login credentials or connection error.');
      console.error('Login error:', err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      handleAfterAuth();
    } catch (err) {
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-3xl bg-white p-8 min-h-96 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold text-center mb-1">Login</h2>
      <p className="text-center text-gray-600 mb-6">
        Don't have an account?{' '}
        <Link to={`/register${returnTo ? `?returnTo=${returnTo}` : ''}`} className="text-blue-600 hover:text-blue-700 font-medium">Register</Link>
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200 text-center max-w-sm mx-auto">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Email address*"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="max-w-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />
        </div>

        <div className="flex justify-center">
          <div className="relative max-w-sm w-full">
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password*"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 mt-4"
            />
            <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 mt-4">
              {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm mt-8">
          <div className="max-w-sm w-full mx-auto flex items-center justify-between">
            <label className="flex items-center text-gray-600 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2" />
              Remember me
            </label>
            <Link to="#" className="text-blue-600 hover:text-blue-700 font-medium">Forgot Password</Link>
          </div>
        </div>

        <button type="submit" className="w-44 flex items-center justify-center bg-blue-500 text-white font-medium text-sm py-2 rounded-full hover:bg-blue-600 transition duration-150 ease-in-out shadow-md mx-auto mt-10">
          Log in with email
        </button>
      </form>

      <div className="flex justify-center">
        <div className="flex items-center my-6 max-w-sm w-full justify-center">
          <span className="text-gray-500 text-md">or</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-56 flex items-center justify-center border border-gray-300 text-gray-700 font-medium text-sm py-2 rounded-full hover:bg-gray-50 transition duration-150 ease-in-out shadow-sm space-x-2 mx-auto"
      >
        <FcGoogle size={20} />
        <span>Continue with Google</span>
      </button>

      <div className="mt-8 text-center">
        <Link to="/admin-login" className="text-xs text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest font-bold">
          Admin Login
        </Link>
      </div>
    </div >
  );
};

export default LoginForm;
