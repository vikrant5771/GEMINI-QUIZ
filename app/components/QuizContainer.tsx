

// "use client"
// import React, { useState, useEffect } from 'react';

// interface Question {
//   question: string;
//   choices: string[];
//   correctAnswer: string;
// }

// // Utility function to shuffle an array
// const shuffleArray = (array: string[]) => {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// };

// const QuizContainer = () => {
//   const [quizData, setQuizData] = useState<Question[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [timer, setTimer] = useState(30);
//   const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
//   const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
//   const [score, setScore] = useState(0);
//   const [wrongChoiceSelected, setWrongChoiceSelected] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchQuizData = async () => {
//       try {
//         const response = await fetch('/api/generatequiz', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ numberOfQuestions: 10, title: 'CSS' }),
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const result = await response.json();
//         const parsedData: Question[] = JSON.parse(result);

//         // Shuffle the choices for each question
//         const shuffledData = parsedData.map((question) => ({
//           ...question,
//           choices: shuffleArray([...question.choices]),
//         }));

//         setQuizData(shuffledData);
//       } catch (error) {
//         console.log('Error fetching quiz data:', error);
//       }
//     };

//     fetchQuizData();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer((prevTimer) => prevTimer - 1);
//     }, 1000);

//     if (timer === 0) {
//       clearInterval(interval);
//       handleNextQuestion();
//     }

//     return () => clearInterval(interval);
//   }, [timer]);

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex + 1 >= quizData.length) {
//       setScore(0); // Reset score when the number of questions exceeds
//       setCurrentQuestionIndex(0); // Reset question index to start from the beginning
//     } else {
//       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//     }
//     setTimer(30);
//     setSelectedChoice(null);
//     setIsCorrect(null);
//     setWrongChoiceSelected(false);
//   };

//   const handleChoiceClick = (choice: string) => {
//     if (selectedChoice === null) {
//       const currentQuestion = quizData[currentQuestionIndex];
//       setSelectedChoice(choice);

//       if (choice === currentQuestion.correctAnswer) {
//         setIsCorrect(true);
//         setScore((prevScore) => prevScore + 30);
//         setTimeout(() => {
//           handleNextQuestion();
//         }, 1500);
//       } else {
//         setIsCorrect(false);
//         setWrongChoiceSelected(true);
//         setTimeout(() => {
//           handleNextQuestion();
//         }, 1500);
//       }
//     }
//   };

//   if (quizData.length === 0) {
//     return <div>Loading...</div>;
//   }

//   const currentQuestion = quizData[currentQuestionIndex];

//   return (
//     <div className='w-[800px] h-[500px] bg-white rounded-2xl shadow-md flex flex-col p-7'>
//       <div className='flex items-center justify-center flex-col'>
//         <div className='flex flex-row justify-around gap-20'>
//           <p className='font-medium text-lg'>Timer : {timer} sec</p>
//           <h1 className='font-medium text-xl'>QUESTION {currentQuestionIndex + 1}</h1>
//           <p className='font-medium text-lg'>Points: {score} Edpoints</p>
//         </div>
//         <p className='font-semibold mt-10 text-xl text-center'>{currentQuestion.question}</p>
//         <div className='grid grid-cols-2 gap-9 gap-x-10 mt-12'>
//           {currentQuestion.choices.map((choice, index) => (
//             <div
//               key={index}
//               className={`p-4 rounded-full text-center text-white font-semibold text-md cursor-pointer hover:shadow-lg duration-300 ${
//                 selectedChoice === choice
//                   ? isCorrect
//                     ? 'bg-green-500'
//                     : 'bg-red-500'
//                   : wrongChoiceSelected && choice === currentQuestion.correctAnswer
//                     ? 'bg-green-500'
//                     : 'bg-yellow-400'
//               }`}
//               onClick={() => handleChoiceClick(choice)}
//             >
//               {choice}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuizContainer;


"use client"
import React, { useState, useEffect } from 'react';

interface Question {
  question: string;
  choices: string[];
  correctAnswer: string;
}

// Utility function to shuffle an array
const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const QuizContainer = () => {
  const [quizData, setQuizData] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [wrongChoiceSelected, setWrongChoiceSelected] = useState<boolean>(false);
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch('/api/generatequiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ numberOfQuestions: 3, title: 'CSS' }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        const parsedData: Question[] = JSON.parse(result);

        // Shuffle the choices for each question
        const shuffledData = parsedData.map((question) => ({
          ...question,
          choices: shuffleArray([...question.choices]),
        }));

        setQuizData(shuffledData);
      } catch (error) {
        console.log('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(interval);
      handleNextQuestion();
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 >= quizData.length) {
      setQuizComplete(true);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimer(30);
      setSelectedChoice(null);
      setIsCorrect(null);
      setWrongChoiceSelected(false);
    }
  };

  const handleChoiceClick = (choice: string) => {
    if (selectedChoice === null) {
      const currentQuestion = quizData[currentQuestionIndex];
      setSelectedChoice(choice);

      if (choice === currentQuestion.correctAnswer) {
        setIsCorrect(true);
        setScore((prevScore) => prevScore + 30);
        setTimeout(() => {
          handleNextQuestion();
        }, 500);
      } else {
        setIsCorrect(false);
        setWrongChoiceSelected(true);
        setTimeout(() => {
          handleNextQuestion();
        }, 500);
      }
    }
  };

  if (quizData.length === 0) {
    return <div>Loading...</div>;
  }

  if (quizComplete) {
    return (
      <div className='w-[800px] h-[500px] bg-white rounded-2xl shadow-md flex flex-col p-7 items-center justify-center relative'>
        <h1 className='font-bold text-4xl z-20'>Quiz Complete!</h1>
        <p className='font-light text-xl mt-4 z-20 flex gap-1'>You Earned : {score}<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 86 75" fill="none"><path fill="#FCC100" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M63.62 21.65c-13.39-9.66-28.16-12.06-32.99-5.36l-5.36 7.43c-.15.2-.28.42-.41.63-11.39 2.11-19.51 7.6-19.51 14.03v9.16c0 8.26 13.38 14.96 29.89 14.96 6.36 0 12.25-.99 17.1-2.69 9.46 3.82 17.97 3.67 21.42-1.11l5.36-7.43c4.82-6.7-2.11-19.96-15.5-29.62Z"></path><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M40.37 53.11c-1.67.14-3.39.22-5.14.22-16.51 0-29.89-6.7-29.89-14.96M12.46 48.05v9.07M26.15 52.63v9.11M44.73 55.99v5.68M10.85 38.73c0-4.3 5.22-8.02 12.83-9.83M79.11 51.27c-4.83 6.7-19.61 4.3-32.99-5.36-13.38-9.66-20.33-22.92-15.5-29.62"></path><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M73.75 58.69c-4.83 6.7-19.61 4.3-32.99-5.36-13.38-9.66-20.33-22.92-15.49-29.62l5.36-7.43c4.83-6.7 19.61-4.3 32.99 5.36C77 31.3 83.94 44.56 79.11 51.26l-5.36 7.43ZM30.73 28.3l-5.3 7.35M39.15 40.02l-5.33 7.39M54.25 50.86l-5.32 7.37M67.17 54.87l-5.31 7.37"></path><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M34.89 19.79c3.55-4.92 14.88-2.82 25.29 4.69"></path><path fill="#fff" d="M80.18 26.99a12.08 12.08 0 0 0-10 10c-.83-5.13-4.88-9.18-10-10 5.13-.83 9.17-4.87 10-10 .82 5.12 4.87 9.17 10 10Z"></path></svg>   edcoins</p>
        <img
          src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMG9mNzR3YWQxNWdiZGhhdDgybnhpM3hoOW91bjhwOGtxaHB6Z2JqciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LriNaxs61RKYMlrZuY/giphy.gif"
          alt="Confetti"
          className='mt-4 mix-blend-normal top-0.5 absolute h-[300px] z-0'
        />
      </div>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className='w-[800px] h-[500px] bg-white rounded-2xl shadow-md flex flex-col p-7 justify-center'>
      <div className='flex items-center justify-center flex-col'>
        <div className='flex flex-row justify-evenly items-center gap-16'>
          <p className='font-medium text-lg'>Timer : {timer} sec</p>
          <h1 className='font-light text-xl'>Question {currentQuestionIndex + 1}</h1>
          <p className='font-medium text-lg flex gap-1'>Total: {score} <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 86 75" fill="none"><path fill="#FCC100" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M63.62 21.65c-13.39-9.66-28.16-12.06-32.99-5.36l-5.36 7.43c-.15.2-.28.42-.41.63-11.39 2.11-19.51 7.6-19.51 14.03v9.16c0 8.26 13.38 14.96 29.89 14.96 6.36 0 12.25-.99 17.1-2.69 9.46 3.82 17.97 3.67 21.42-1.11l5.36-7.43c4.82-6.7-2.11-19.96-15.5-29.62Z"></path><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M40.37 53.11c-1.67.14-3.39.22-5.14.22-16.51 0-29.89-6.7-29.89-14.96M12.46 48.05v9.07M26.15 52.63v9.11M44.73 55.99v5.68M10.85 38.73c0-4.3 5.22-8.02 12.83-9.83M79.11 51.27c-4.83 6.7-19.61 4.3-32.99-5.36-13.38-9.66-20.33-22.92-15.5-29.62"></path><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M73.75 58.69c-4.83 6.7-19.61 4.3-32.99-5.36-13.38-9.66-20.33-22.92-15.49-29.62l5.36-7.43c4.83-6.7 19.61-4.3 32.99 5.36C77 31.3 83.94 44.56 79.11 51.26l-5.36 7.43ZM30.73 28.3l-5.3 7.35M39.15 40.02l-5.33 7.39M54.25 50.86l-5.32 7.37M67.17 54.87l-5.31 7.37"></path><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M34.89 19.79c3.55-4.92 14.88-2.82 25.29 4.69"></path><path fill="#fff" d="M80.18 26.99a12.08 12.08 0 0 0-10 10c-.83-5.13-4.88-9.18-10-10 5.13-.83 9.17-4.87 10-10 .82 5.12 4.87 9.17 10 10Z"></path></svg> edcoins</p>
        </div>
        <p className='font-semibold mt-10 text-xl text-center'>{currentQuestion.question}</p>
        <div className='grid grid-cols-2 gap-9 gap-x-10 mt-12'>
          {currentQuestion.choices.map((choice, index) => (
            <div
              key={index}
              className={`p-4 rounded-full text-center text-black font-light text-md cursor-pointer hover:shadow-2xl duration-300 outline-1 ${
                selectedChoice === choice 
                  ? isCorrect 
                    ? 'bg-green-500' 
                    : 'bg-red-500'
                  : wrongChoiceSelected && choice === currentQuestion.correctAnswer 
                    ? 'bg-green-500' 
                    : 'bg-yellow-400'
              }`}
              onClick={() => handleChoiceClick(choice)}
            >
              {choice}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizContainer;
