import React, { useState, useRef } from 'react';
import { MapPinIcon, ImageIcon, CloseIcon } from '../components/icons';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_FILE_TYPES = "image/jpeg, image/png, image/gif, video/mp4, video/quicktime";


const ReportPage: React.FC = () => {
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser.');
      return;
    }
    
    setIsLocating(true);
    setStatus('Locating...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setStatus('Location found!');
        setLocation(`${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`);
        setIsLocating(false);
      },
      () => {
        setStatus('Unable to retrieve your location. Please enter it manually.');
        setIsLocating(false);
      }
    );
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const newFiles: File[] = Array.from(selectedFiles);

    for (const file of newFiles) {
        if (file.size > MAX_FILE_SIZE) {
            setFileError(`File "${file.name}" is too large. Max size is 10 MB.`);
            // Reset file input to allow re-selection of the same file after an error
            if (fileInputRef.current) fileInputRef.current.value = '';
            return;
        }
    }

    setFiles(prevFiles => [...prevFiles, ...newFiles]);
     if (fileInputRef.current) fileInputRef.current.value = '';
  };
  
  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Your report has been submitted. Our team will look into it shortly.');
    // Here you would typically send the form data and files to a server
    // For demo, we just reset the form
    const form = e.target as HTMLFormElement;
    form.reset();
    setLocation('');
    setStatus('');
    setFiles([]);
    setFileError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="container mx-auto px-4 py-12 flex-grow flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 p-8 md:p-12 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold text-center text-slate-800 dark:text-slate-100 mb-4">Report an Animal in Need</h1>
        <p className="text-lg text-center text-slate-600 dark:text-slate-300 mb-10">
          See an animal that needs help? Fill out the form below, and our rescue team will be alerted.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="animal-type" className="block text-base font-semibold text-slate-700 dark:text-slate-300 mb-2">Type of Animal</label>
            <select id="animal-type" required className="w-full p-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
              <option>Dog</option>
              <option>Cat</option>
              <option>Bird</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="condition" className="block text-base font-semibold text-slate-700 dark:text-slate-300 mb-2">Description of Condition</label>
            <textarea id="condition" rows={4} required placeholder="e.g., Injured leg, looks lost and scared, etc." className="w-full p-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"></textarea>
          </div>
          
          <div>
            <label className="block text-base font-semibold text-slate-700 dark:text-slate-300 mb-2">Photos or Videos (up to 10MB each)</label>
            <div className="mt-2 flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-lg cursor-pointer bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImageIcon className="w-10 h-10 text-slate-500 dark:text-slate-400 mb-3" />
                  <p className="mb-2 text-sm text-slate-600 dark:text-slate-300"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Image or Video (MAX. 10MB)</p>
                </div>
                <input ref={fileInputRef} type="file" multiple accept={ACCEPTED_FILE_TYPES} onChange={handleFileChange} className="hidden" />
              </label>
            </div>
            {fileError && <p className="text-sm text-red-600 mt-2">{fileError}</p>}
            {files.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {files.map((file, index) => (
                  <div key={index} className="relative group">
                    {file.type.startsWith('image/') ? (
                      <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-24 object-cover rounded-lg" />
                    ) : (
                      <div className="w-full h-24 bg-slate-200 dark:bg-slate-600 rounded-lg flex items-center justify-center p-2">
                        <p className="text-xs text-slate-700 dark:text-slate-200 text-center break-all">{file.name}</p>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove file"
                    >
                      <CloseIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="location" className="block text-base font-semibold text-slate-700 dark:text-slate-300 mb-2">Location (Address or Coordinates)</label>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <input 
                type="text" 
                id="location" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required 
                placeholder="e.g., Near City Park, 123 Main St"
                className="w-full p-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <button 
                type="button"
                onClick={handleGetLocation}
                disabled={isLocating}
                className="flex items-center justify-center bg-slate-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors disabled:bg-slate-400"
              >
                <MapPinIcon className="w-5 h-5 mr-2" />
                {isLocating ? 'Locating...' : 'Use My Location'}
              </button>
            </div>
            {status && <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{status}</p>}
          </div>

          <div>
            <button type="submit" className="w-full bg-orange-500 text-white font-bold py-4 px-4 rounded-lg text-lg hover:bg-orange-600 transition-colors transform hover:scale-105">
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportPage;