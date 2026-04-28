import React from 'react';
import LoginForm from '../../features/auth/LoginForm';

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex items-center justify-center flex-grow p-4">
        <LoginForm />
      </div>
      <footer className="bg-gray-200 text-gray-600 text-sm px-8 py-4">
        <div className="flex items-center justify-between">
          <p className="flex-grow text-left">© 2025 Jadetimes Journals Media S.A. All rights reserved</p>
          <div className="text-left flex-grow">
            <a href="#" className="text-blue-600 font-semibold">Privacy Policy</a>
            <span className="mx-2">|</span>
            <a href="#" className="text-blue-600 font-semibold">Terms and Conditions</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;