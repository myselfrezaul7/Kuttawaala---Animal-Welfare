import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleIcon } from '../components/icons';

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
    }
    setIsLoading(true);
    try {
      await signup(name, email, password);
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
      className="flex items-center justify-center w-full p-3 border border-white/30 dark:border-white/20 rounded-lg bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
    >
      {icon}
      <span className="ml-3 font-semibold text-slate-800 dark:text-slate-100">{label}</span>
    </button>
  );

  return (
    <div className="container mx-auto px-6 py-12 flex-grow flex items-center justify-center">
      <div className="w-full max-w-md bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 p-8 md:p-10 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-slate-900 dark:text-slate-50 mb-6">Join Our Community</h1>

        <div className="space-y-3 mb-6">
            <SocialButton icon={<GoogleIcon className="w-6 h-6" />} label="Sign up with Google" />
        </div>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-slate-300 dark:border-slate-600"/>
          <span className="mx-4 text-slate-700 dark:text-slate-300 font-semibold text-sm">OR</span>
          <hr className="flex-grow border-slate-300 dark:border-slate-600"/>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="bg-red-500/20 text-red-900 dark:text-red-200 p-3 rounded-lg text-center">{error}</p>}
          <div>
            <label htmlFor="name" className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">Full Name</label>
            <input 
              type="text" 
              id="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              className="w-full p-3 bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 text-slate-900 dark:text-slate-50 placeholder:text-slate-600 dark:placeholder:text-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white/30 dark:focus:bg-black/30 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">Email Address</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full p-3 bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 text-slate-900 dark:text-slate-50 placeholder:text-slate-600 dark:placeholder:text-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white/30 dark:focus:bg-black/30 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full p-3 bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 text-slate-900 dark:text-slate-50 placeholder:text-slate-600 dark:placeholder:text-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white/30 dark:focus:bg-black/30 transition-colors"
            />
          </div>
          <div>
            <button type="submit" disabled={isLoading} className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg text-lg hover:bg-orange-600 transition-colors disabled:bg-orange-300">
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
         <p className="text-center mt-6 text-slate-800 dark:text-slate-200">
          Already have an account? <Link to="/login" className="font-bold text-orange-600 dark:text-orange-400 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;