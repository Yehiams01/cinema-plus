import React, { useState, useContext, useEffect} from 'react';
import Modal from 'react-modal'; // Assume this is your modal component
import TMDBContext from "../context/TMDBContext/TMDBContext"
import DiscoverResults from './DiscoverResults';
import InitSwiper from './SwipersScroll';
import happyIcon from '../assets/feelings/happy.png'
import sadIcon from '../assets/feelings/sad.png'
import energeticIcon from '../assets/feelings/surprised.png'
import romanticIcon from '../assets/feelings/lovey.png'
import tiredIcon from '../assets/feelings/blur.png'
import actionBg from '../assets/genres/Action.png'
import mysteryBg from '../assets/genres/Mystery.jpg'
import thrillerBg from '../assets/genres/Thriller.jpg'
import fantasyBg from '../assets/genres/Fantasy.jpg'
import scifiBg from '../assets/genres/ScienceFiction.jpg'
import horrorBg from '../assets/genres/Horror.jpg'
import comedyBg from '../assets/genres/Comedy.jpg'
import adventureBg from '../assets/genres/Adventure.jpg'
import musicBg from '../assets/genres/Music.jpg'
import warBg from '../assets/genres/War.jpg'

const questions = [
{
    text: 'Looking for a Movie or a TV Show?',
    options: [
        { name: 'Movie', id: 'movie' },
        { name: 'TV Show', id: 'tv' }
    ],
    stateKey: 'type',
    isMultiSelect: false
},
{
    text: 'How are you feeling today?',
    options: [
        { name: 'Tired', id: 'tired', image: tiredIcon },
        { name: 'Happy', id: 'happy', image: happyIcon },
        { name: 'Energetic', id: 'energetic', image: energeticIcon },
        { name: 'Sad', id: 'sad', image: sadIcon },
        { name: 'Romantic', id: 'romantic', image: romanticIcon },
    ],
    stateKey: 'mood',
    isMultiSelect: false
},
  {
    text: 'What are the ingredients?',
    options: [
      { name: 'Action', id: '28', type: 'movie', mood:'energetic', background: actionBg },
      { name: 'Thriller', id: '53', type: 'movie', mood:'energetic', background: thrillerBg },
      { name: 'Mystery', id: '9648', type: 'movietv', mood:'energetic', background: mysteryBg },
      { name: 'Fantasy', id: '14', type: 'movie', mood:'energetic', background: fantasyBg },
      { name: 'Science Fiction', id: '878', type: 'movie', mood:'energetic', background: scifiBg },
      { name: 'Horror', id: '27', type: 'movie', mood:'energetic', background: horrorBg},
      { name: 'Comedy', id: '35', type: 'movietv', mood:'happy', background: comedyBg},
      { name: 'Adventure', id: '12', type: 'movie', mood:'happy', background: adventureBg },
      { name: 'Music', id: '10402', type: 'movie', mood:'happy', background: musicBg  },
      { name: 'Drama', id: '18', type: 'movietv', mood:'romantic'  },
      { name: 'War', id: '10752', type: 'movie', mood:'sad'  },
      { name: 'Romance', id: '10749', type: 'movietv', mood:'romantic' },
      { name: 'Documentary', id: '99', type: 'movietv', mood: 'tired' },
      { name: 'Family', id: '10751', type: 'movietv', mood: 'tired' },
      { name: 'Action & Adventure', id: '10759', type: 'tv', mood: 'energetic', background: actionBg },
      { name: 'Crime', id: '80', type: 'tv', mood: 'energetic', background: thrillerBg },
      { name: 'Sci-Fi & Fantasy', id: '10765', type: 'tv', mood: 'energetic', background: fantasyBg },
      { name: 'War & Politics', id: '10768', type: 'tv', mood: 'energetic', background: warBg },


      // ... other genres
    ],
    stateKey: 'genres',
    isMultiSelect: true
  },
  {
    text: 'Feeling Nostalgic?',
    options: [
        { name: `Last 3 years`, id: '2020' },
        { name: `2000's and forward`, id: '2000' },
        { name: `I don't mind what year`, id: '1920' },
    ],
    stateKey: 'year',
    isMultiSelect: false,
  }

];

const DiscoverModal = ({ isOpen, onClose }) => {

  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState({ type: '', mood: '', genres: [], year: '' });
  const {discoverResults, fetchDiscoverResults} = useContext(TMDBContext)

  useEffect(() => {
    if (isOpen) {
      // Additional logic if needed when modal opens
    } else {
      // Reset states or perform cleanup if the modal is closed
      handleCloseModal();
    }
  }, [isOpen]);

// useEffect to handle showResults changes
useEffect(() => {
    if(showResults) {
        fetchDiscoverResults(answers);
    }
}, [showResults]);

// Additional useEffect to handle discoverResults changes
useEffect(() => {
    console.log(discoverResults); // This will log the updated discoverResults
}, [discoverResults]);


  const handleOptionClick = (option) => {
    if (questions[currentStep].isMultiSelect) {
      let updatedGenres = answers.genres.includes(option.id)
        ? answers.genres.filter(id => id !== option.id)
        : [...answers.genres, option.id];
      setAnswers({ ...answers, genres: updatedGenres });
    } else {
      setAnswers({ ...answers, [questions[currentStep].stateKey]: option.id });
      moveToNextQuestion();
    }
  };


  const moveToNextQuestion = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
        setCurrentStep(currentStep + 1);
      setShowResults(true);
        // fetchDiscoverResults(answers); // Call fetch here
    }
  };

  const handleCloseModal = () => {
    setShowResults(false);
    setCurrentStep(0);
    setAnswers({ type: '', mood: '', genres: [], year: '' }); // Reset answers
    if (onClose) onClose(); 
  };


  return (
    
      <Modal isOpen={isOpen} onRequestClose={onClose} /* onRequestClose={handleCloseModal} */ className='discoverModal' overlayClassName="myOverlay">
        
      <button class="discover-btn-refresh" onClick={handleCloseModal}><i class="fas fa-xmark"></i></button>
        {!showResults ? (
            <>
            <h2>{questions[currentStep].text}</h2>
            {currentStep === 1 ? (
              <div className="image-options-container">
                {questions[currentStep].options.map((option, index) => {
                  const isSelected = answers[questions[currentStep].stateKey] === option.id;
                  return (
                    <button
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      className={`imageButton ${isSelected ? 'selected' : ''}`}
                    >
                      <img src={option.image} className='feelings-icon' alt={option.name} />
                      <h3>{option.name}</h3>
                    </button>
                  );
                })}
              </div>
            ) : 
            
            (
              <div className="regular-options-container">
                {questions[currentStep].options.map((option, index) => {
                  const isSelected = questions[currentStep].isMultiSelect
                    ? answers[questions[currentStep].stateKey].includes(option.id)
                    : answers[questions[currentStep].stateKey] === option.id;

                  return (
                    (currentStep == 2) ?
                    (

                      (option.mood === answers.mood) && (option.type === answers.type || option.type === 'movietv') ? 
                      <div key={index}
                      onClick={() => handleOptionClick(option)} className={`genreButton ${isSelected ? 'selectedGenre' : ''}`}  style={{   backgroundImage: `linear-gradient(rgba(0,0,0,0.1), #000), url(${option.background})`}}>

                        <h3 className='genreName'>{option.name}</h3>
                      </div>
                      :
                      ''
                    )
                    :
                    <button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        className={`regularButton ${isSelected ? 'selected' : ''}`}
                      >
                        {option.name}
                      </button>

                  );
                })}
                
              </div>
            )}


            {questions[currentStep].isMultiSelect && (
                <button onClick={moveToNextQuestion} className='regularButton'>Submit</button>
            )}
            </>
        ) : 
             <DiscoverResults discoverResults={discoverResults} answers={answers} /> 
        }
        
        </Modal>
    
  );
};

export default DiscoverModal;