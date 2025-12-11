import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleIcon } from '../components/icons';
import FormError from '../components/FormError';

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

  const SocialButton: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
    <button
      type="button"
      className="flex items-center justify-center w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
    >
      {icon}
      <span className="ml-3 font-semibold text-slate-700 dark:text-slate-200">{label}</span>
    </button>
  );


  return (
    <div className="container mx-auto px-6 py-16 flex-grow flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-6">Welcome Back!</h1>
        
        <div className="space-y-3 mb-6">
            <SocialButton icon={<GoogleIcon className="w-5 h-5" />} label="Continue with Google" />
        </div>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-slate-200 dark:border-slate-700"/>
          <span className="mx-4 text-slate-500 dark:text-slate-400 font-medium text-sm">OR</span>
          <hr className="flex-grow border-slate-200 dark:border-slate-700"/>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormError message={error} />
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <button type="submit" disabled={isLoading} className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-orange-300">
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <p className="text-center mt-6 text-slate-600 dark:text-slate-400 text-sm">
          Don't have an account? <Link to="/signup" className="font-semibold text-orange-600 dark:text-orange-400 hover:underline">Sign up now</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;