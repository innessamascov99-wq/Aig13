import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [staySignedIn, setStaySignedIn] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await register(name, email, password);
      } else {
        await login(email, password);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  const handleGoogleSignIn = () => {
    // Mock Google sign-in
    login('user@gmail.com', 'password');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isSignUp ? 'Create account' : 'Sign in'}
          </h2>
          <p className="text-gray-600">
            {isSignUp ? 'Join Collab AIG 13' : 'using your Collab AIG 13 account'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {isSignUp && (
              <input
                type="text"
                required
                className="input-field"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <input
              type="email"
              required
              className="input-field"
              placeholder="Username, email, or mobile"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full text-lg"
          >
            {isSignUp ? 'Create Account' : 'Next'}
          </button>

          {!isSignUp && (
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={staySignedIn}
                  onChange={(e) => setStaySignedIn(e.target.checked)}
                />
                <span className="ml-2 text-sm text-primary-600">Stay signed in</span>
              </label>
              <a href="#" className="text-sm text-primary-600 hover:text-primary-500">
                Forgot username?
              </a>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="btn-secondary w-full"
          >
            {isSignUp ? 'Sign in instead' : 'Create an account'}
          </button>

          <div className="text-center">
            <span className="text-gray-500">or</span>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;