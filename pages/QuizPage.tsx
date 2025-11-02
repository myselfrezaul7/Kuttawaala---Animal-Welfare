import React, { useState, useMemo, useCallback } from 'react';
import { QUIZ_QUESTIONS, MOCK_ANIMALS } from '../constants';
import AnimalCard from '../components/AnimalCard';
import { Link } from 'react-router-dom';

const QuizPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = useCallback((tags: string[]) => {
    setSelectedTags(prevTags => [...new Set([...prevTags, ...tags])]);
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  }, [currentQuestionIndex]);
  
  const restartQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setSelectedTags([]);
    setQuizCompleted(false);
  }, []);

  const results = useMemo(() => {
    if (!quizCompleted || selectedTags.length === 0) return [];

    return MOCK_ANIMALS.filter(animal => {
        if (!animal.temperamentTags) return false;
        return selectedTags.some(tag => animal.temperamentTags?.includes(tag));
    }).sort((a, b) => {
        const aMatches = a.temperamentTags?.filter(t => selectedTags.includes(t)).length || 0;
        const bMatches = b.temperamentTags?.filter(t => selectedTags.includes(t)).length || 0;
        return bMatches - aMatches;
    });
  }, [quizCompleted, selectedTags]);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  return (
    <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50">Find Your Perfect Paw-tner</h1>
            <p className="text-lg text-slate-800 dark:text-slate-200 max-w-2xl mx-auto mt-4">
            Answer a few quick questions to discover which of our wonderful animals might be the best fit for you.
            </p>
        </div>
        
        <div className="max-w-2xl mx-auto bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 rounded-2xl shadow-xl p-8 md:p-12">
            {!quizCompleted ? (
                <div>
                    <div className="mb-8">
                        <p className="text-slate-700 dark:text-slate-300 font-semibold">Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}</p>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50 mt-2">{currentQuestion.questionText}</h2>
                    </div>
                    <div className="space-y-4">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option.tags)}
                                className="w-full text-left bg-white/30 dark:bg-black/30 p-5 rounded-lg border-2 border-transparent hover:border-orange-500 hover:bg-white/50 dark:hover:bg-black/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                <span className="text-lg font-medium text-slate-900 dark:text-slate-100">{option.text}</span>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-slate-50 mb-4">Here are your matches!</h2>
                    <p className="text-center text-slate-800 dark:text-slate-200 mb-8">Based on your answers, these animals might be a great fit for your home.</p>
                     <div className="text-center">
                        <button onClick={restartQuiz} className="bg-orange-500 text-white font-bold py-2 px-6 rounded-full hover:bg-orange-600 transition-colors mb-12">
                            Take Quiz Again
                        </button>
                    </div>
                </div>
            )}
        </div>

        {quizCompleted && (
            <div className="mt-16">
                {results.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                        {results.map(animal => (
                            <AnimalCard key={animal.id} animal={animal} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center bg-white/20 dark:bg-black/20 p-8 rounded-2xl max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">No exact matches right now</h3>
                        <p className="text-slate-800 dark:text-slate-200 mt-4">We don't have a perfect match right now, but please check out all our available animals. The perfect friend for you might just be a click away!</p>
                        <Link to="/adopt" className="mt-6 inline-block bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-colors">
                            View All Animals
                        </Link>
                    </div>
                )}
            </div>
        )}
    </div>
  );
};

export default QuizPage;