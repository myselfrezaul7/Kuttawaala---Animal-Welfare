import React, { useState } from 'react';

const VolunteerPage: React.FC = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true);
    };

    const inputStyle = "w-full p-3 bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 text-slate-900 dark:text-slate-50 placeholder:text-slate-600 dark:placeholder:text-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white/30 dark:focus:bg-black/30 transition-colors";

    return (
        <div className="container mx-auto px-6 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50">Join Our Volunteer Team</h1>
                <p className="text-lg text-slate-800 dark:text-slate-200 max-w-3xl mx-auto mt-4">
                    Volunteers are the heart of KUTTAWAALA. Your time, skills, and passion can make a world of difference in the lives of animals.
                </p>
            </div>

            <div className="flex justify-center">
                {/* Volunteer Form */}
                <div className="bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-2xl">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-6">Become a Volunteer</h2>
                    {formSubmitted ? (
                        <div className="text-center p-8 bg-green-500/10 border border-green-500/30 rounded-lg">
                            <h3 className="text-2xl font-bold text-green-900 dark:text-green-200">Thank You!</h3>
                            <p className="text-slate-800 dark:text-slate-200 mt-2">Your application has been received. We'll get in touch with you soon!</p>
                             <button onClick={() => setFormSubmitted(false)} className="mt-6 bg-orange-500 text-white font-bold py-2 px-6 rounded-full hover:bg-orange-600 transition-colors">Submit Another</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">Full Name <span className="text-red-500">*</span></label>
                                <input type="text" id="name" required className={inputStyle} autoComplete="name" />
                            </div>
                             <div>
                                <label htmlFor="email" className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">Email <span className="text-red-500">*</span></label>
                                <input type="email" id="email" required className={inputStyle} autoComplete="email" />
                            </div>
                             <div>
                                <label htmlFor="phone" className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">Phone <span className="text-red-500">*</span></label>
                                <input type="tel" id="phone" required className={inputStyle} autoComplete="tel" />
                            </div>
                             <div>
                                <label htmlFor="address" className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">Address <span className="text-red-500">*</span></label>
                                <textarea id="address" rows={2} required className={inputStyle} autoComplete="street-address"></textarea>
                            </div>
                            <div>
                                <label className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">Skills/Interests</label>
                                <div className="space-y-2 mt-2 text-slate-800 dark:text-slate-200">
                                    <label className="flex items-center"><input type="checkbox" className="h-5 w-5 mr-3 rounded text-orange-500 focus:ring-orange-500" /> Animal Handling</label>
                                    <label className="flex items-center"><input type="checkbox" className="h-5 w-5 mr-3 rounded text-orange-500 focus:ring-orange-500" /> Event Support</label>
                                    <label className="flex items-center"><input type="checkbox" className="h-5 w-5 mr-3 rounded text-orange-500 focus:ring-orange-500" /> Transport/Driving</label>
                                    <label className="flex items-center"><input type="checkbox" className="h-5 w-5 mr-3 rounded text-orange-500 focus:ring-orange-500" /> Photography/Videography</label>
                                    <label className="flex items-center"><input type="checkbox" className="h-5 w-5 mr-3 rounded text-orange-500 focus:ring-orange-500" /> Administrative Tasks</label>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="availability" className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">Availability <span className="text-red-500">*</span></label>
                                <textarea id="availability" rows={3} placeholder="e.g., Weekends, weekday evenings..." required className={inputStyle}></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg text-lg hover:bg-orange-600 transition-colors">Submit Application</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VolunteerPage;