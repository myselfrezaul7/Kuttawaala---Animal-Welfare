import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleIcon, AppleIcon, FacebookIcon } from '../components/icons';

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
      className="flex items-center justify-center w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
    >
      {icon}
      <span className="ml-3 font-semibold text-slate-700 dark:text-slate-200">{label}</span>
    </button>
  );


  return (
    <div className="container mx-auto px-6 py-12 flex-grow flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 p-8 md:p-10 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-100 mb-6">Welcome Back!</h1>
        
        <div className="space-y-3 mb-6">
            <SocialButton icon={<GoogleIcon className="w-6 h-6" />} label="Continue with Google" />
            <SocialButton icon={<AppleIcon className="w-6 h-6" />} label="Continue with Apple" />
            <SocialButton icon={<FacebookIcon className="w-6 h-6 text-[#1877F2]" />} label="Continue with Facebook" />
        </div>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-slate-200 dark:border-slate-600"/>
          <span className="mx-4 text-slate-500 dark:text-slate-400 font-semibold text-sm">OR</span>
          <hr className="flex-grow border-slate-200 dark:border-slate-600"/>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-lg text-center">{error}</p>}
          <div>
            <label htmlFor="email" className="block text-base font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="w-full p-3 border border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-base font-semibold text-slate-700 dark:text-slate-300 mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="w-full p-3 border border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <button type="submit" disabled={isLoading} className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg text-lg hover:bg-orange-600 transition-colors disabled:bg-orange-300">
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <p className="text-center mt-6 text-slate-600 dark:text-slate-300">
          Don't have an account? <Link to="/signup" className="font-bold text-orange-600 dark:text-orange-400 hover:underline">Sign up now</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;