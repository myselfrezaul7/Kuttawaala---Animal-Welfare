import React, { useState, useRef, useEffect } from 'react';
import { MapPinIcon, ImageIcon, CloseIcon } from '../components/icons';
import FormError from '../components/FormError';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_FILE_TYPES = "image/jpeg, image/png, image/gif, video/mp4, video/quicktime";

interface FilePreview {
  file: File;
  url: string;
}

const ReportPage: React.FC = () => {
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [fileError, setFileError] = useState('');
  const [submissionError, setSubmissionError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Effect to clean up object URLs on unmount
  useEffect(() => {
    return () => {
      files.forEach(filePreview => URL.revokeObjectURL(filePreview.url));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    
    const newFilePreviews = newFiles.map(file => ({
        file: file,
        url: URL.createObjectURL(file)
    }));

    setFiles(prevFiles => [...prevFiles, ...newFilePreviews]);
     if (fileInputRef.current) fileInputRef.current.value = '';
  };
  
  const handleRemoveFile = (indexToRemove: number) => {
    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(files[indexToRemove].url);
    setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError('');
    setIsLoading(true);

    try {
        // In a real app, this is where you'd upload files and submit data
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // For demo, we'll randomly throw an error sometimes
        if (Math.random() > 0.8) {
            throw new Error("Failed to submit report. Please try again later.");
        }

        alert('Thank you! Your report has been submitted. Our team will look into it shortly.');
        // Reset form on success
        const form = e.target as HTMLFormElement;
        form.reset();
        setLocation('');
        setStatus('');
        files.forEach(filePreview => URL.revokeObjectURL(filePreview.url));
        setFiles([]);
        setFileError('');
        if (fileInputRef.current) fileInputRef.current.value = '';

    } catch (err) {
        setSubmissionError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
        setIsLoading(false);
    }
  };
  
  const inputStyle = "w-full p-3 bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 text-slate-900 dark:text-slate-50 placeholder:text-slate-600 dark:placeholder:text-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white/30 dark:focus:bg-black/30 transition-colors";

  return (
    <div className="container mx-auto px-4 py-12 flex-grow flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold text-center text-slate-900 dark:text-slate-50 mb-4">Report an Animal in Need</h1>
        <p className="text-lg text-center text-slate-800 dark:text-slate-200 mb-10">
          See an animal that needs help? Fill out the form below, and our rescue team will be alerted.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormError message={submissionError} />
          <div>
            <label htmlFor="animal-type" className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">Type of Animal</label>
            <select id="animal-type" required className={inputStyle}>
              <option>Dog</option>
              <option>Cat</option>
              <option>Bird</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="condition" className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">Description of Condition</label>
            <textarea id="condition" rows={4} required placeholder="e.g., Injured leg, looks lost and scared, etc." className={inputStyle}></textarea>
          </div>
          
          <div>
            <label className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">Photos or Videos (up to 10MB each)</label>
            <div className="mt-2 flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/40 dark:border-white/20 border-dashed rounded-lg cursor-pointer bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImageIcon className="w-10 h-10 text-slate-700 dark:text-slate-300 mb-3" />
                  <p className="mb-2 text-sm text-slate-800 dark:text-slate-200"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Image or Video (MAX. 10MB)</p>
                </div>
                <input ref={fileInputRef} type="file" multiple accept={ACCEPTED_FILE_TYPES} onChange={handleFileChange} className="hidden" />
              </label>
            </div>
            {fileError && <p className="text-sm text-red-600 mt-2">{fileError}</p>}
            {files.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {files.map((filePreview, index) => (
                  <div key={index} className="relative group">
                    {filePreview.file.type.startsWith('image/') ? (
                      <img src={filePreview.url} alt={filePreview.file.name} className="w-full h-24 object-cover rounded-lg" />
                    ) : (
                      <div className="w-full h-24 bg-slate-200 dark:bg-slate-600 rounded-lg flex items-center justify-center p-2">
                        <p className="text-xs text-slate-700 dark:text-slate-200 text-center break-all">{filePreview.file.name}</p>
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
            <label htmlFor="location" className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">Location (Address or Coordinates)</label>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <input 
                type="text" 
                id="location" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required 
                placeholder="e.g., Near City Park, 123 Main St"
                className={inputStyle}
              />
              <button 
                type="button"
                onClick={handleGetLocation}
                disabled={isLocating}
                className="flex items-center justify-center bg-slate-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-900 transition-colors disabled:bg-slate-400"
              >
                <MapPinIcon className="w-5 h-5 mr-2" />
                {isLocating ? 'Locating...' : 'Use My Location'}
              </button>
            </div>
            {status && <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{status}</p>}
          </div>

          <div>
            <button type="submit" disabled={isLoading} className="w-full bg-orange-500 text-white font-bold py-4 px-4 rounded-lg text-lg hover:bg-orange-600 transition-colors transform hover:scale-105 disabled:bg-orange-300 disabled:cursor-wait">
              {isLoading ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportPage;