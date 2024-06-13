import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/localStorage";

interface Question {
  text: string;
  options: string[];
  correct: string;
}

interface Quiz {
  text: ReactNode;
  title: string;
  options: any;
  questions: Question[];
}

const Admin = () => {
  const [quizes, setQuizes] = useState<Quiz[]>(getFromLocalStorage("quizzes") || []);

  const handleSubmit = (e: { target: any; preventDefault: () => void }) => {
    e.preventDefault();
    const quiz: Question = {
      text: e.target.question.value,
      options: [
        e.target.option1.value,
        e.target.option2.value,
        e.target.option3.value,
        e.target.option4.value,
      ],
      correct: e.target.correct.value,
    };
    e.target.reset();
    const quizzes = getFromLocalStorage('quizzes') || [];
    quizzes.push(quiz);
    saveToLocalStorage('quizzes', quizzes);
  };
  useEffect(() => {
    const storedQuizzes = getFromLocalStorage("quizzes");
    if (storedQuizzes) {
      setQuizes(storedQuizzes);
    }
  }, []);
  console.log(quizes);
  return (
    <div>
      <h1>Admin</h1>
      <form onSubmit={handleSubmit} action="">
        <input
          className=" border-1 border-gray-300 rounded-md px-4 py-2 bg-gray-100 mb-2 w-full"
          name="question"
          type="text"
          placeholder="Enter Question"
        />{" "}
        <br />
        <div className="flex gap-2">
          <input
            className=" border-1 border-gray-300 rounded-md px-4 py-2 bg-gray-100 mb-2 w-1/2"
            name="option1"
            type="text"
            placeholder="option1"
          />
          <input
            className=" border-1 border-gray-300 rounded-md px-4 py-2 bg-gray-100 mb-2 w-1/2"
            name="option2"
            type="text"
            placeholder="option2"
          />
        </div>
        <div className=" flex gap-2">
          <input
            className=" border-1 border-gray-300 rounded-md px-4 py-2 bg-gray-100 mb-2 w-1/2"
            name="option3"
            type="text "
            placeholder=" option3"
          />
          <input
            className=" border-1 border-gray-300 rounded-md px-4 py-2 bg-gray-100 mb-2 w-1/2"
            name="option4"
            type="text "
            placeholder="option4 "
          />
        </div>
        <input
          className=" border-1 border-gray-300 rounded-md px-4 py-2 bg-gray-100 mb-2 w-full"
          name="correct"
          type="text"
          placeholder="Correct Answer"
        />
        <button
          type="submit"
          className=" px-6 py-2 bg-blue-500 rounded-md text-lg font-bold text-white"
        >
          Submit
        </button>
      </form>

      <div>
        {
          quizes.map((quiz, index) => (
            <div key={index}>
              <p className=" text-lg font-bold">Q.{index + 1} {quiz.text}</p>
              <ul>
                {quiz.options.map((option: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined, i: Key | null | undefined) => (
                  <li key={i}>{option}</li>
                ))}
              </ul>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Admin;
