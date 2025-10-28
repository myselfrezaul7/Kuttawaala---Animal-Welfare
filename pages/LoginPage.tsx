import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/community');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 flex-grow flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-8">Welcome Back!</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg text-center">{error}</p>}
          <div>
            <label htmlFor="email" className="block text-base font-semibold text-slate-700 mb-2">Email Address</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-base font-semibold text-slate-700 mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <button type="submit" disabled={isLoading} className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg text-lg hover:bg-orange-600 transition-colors disabled:bg-orange-300">
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <p className="text-center mt-6 text-slate-600">
          Don't have an account? <Link to="/signup" className="font-bold text-orange-600 hover:underline">Sign up now</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;