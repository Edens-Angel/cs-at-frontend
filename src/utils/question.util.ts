import { shuffle } from "./arr.util";
import { ContinentItem, CountryItem } from "./../interfaces/Quiz";
import { QuestionDataType } from "../interfaces/Quiz";
import { ApiResponse } from "./../interfaces/ApiResponse";

const createContinentQuestion = (
  continent: ContinentItem,
  answers: any
): QuestionDataType => ({
  question: `How many countries has the continent ${continent.name}?`,
  questionType: "CONTINENT",
  answers: answers,
  rightAnswer: continent.countryAmount,
});

const createLanguageQuestion = (
  country: CountryItem,
  answers: any
): QuestionDataType => ({
  question: `What is the most common spoken language in ${country.name}?`,
  questionType: "LANGUAGE",
  answers: answers,
  rightAnswer: country.language,
});

/**
 *
 * @param answers Possible other answers
 * @param rightAnswer Right answer
 * Creates random answers
 */
const createAnswers = <T extends string | number>(
  answers: T[],
  rightAnswer: T
): T[] => {
  const MAX_ANSWERS = 4;

  // Will never happen in this example
  if (answers.length < MAX_ANSWERS) return [...Array(4)];

  const answerList = [rightAnswer];

  // Loop until answer array has 4 different values
  while (answerList.length !== MAX_ANSWERS) {
    let randomAnswer: T = answers[Math.floor(Math.random() * answers.length)];
    if (!answerList.includes(randomAnswer)) {
      answerList.push(randomAnswer);
    }
  }

  return shuffle(answerList);
};

/**
 *
 * @param data the data from the API
 * @returns Random questions shuffled in a list
 */
export const createQuestions = (
  data: ApiResponse | null
): QuestionDataType[] => {
  if (!data) return [];

  const continentList: ContinentItem[] = data.continents.map((item) => ({
    name: item.name,
    countryAmount: item.countries.length,
  }));

  // gets all the countries from the continents and flattens the array
  const countryList = data.continents
    .map((continent) => continent.countries)
    .reduce((prev, curr) => [...prev, ...curr])
    .filter((country) => country.languages.length > 1)
    .map((country) => ({
      name: country.name,
      language: country.languages[0].name,
    }));

  const continentAnswers = continentList.map((answer) => answer.countryAmount);

  const countryAnswers = countryList.map((country) => country.language);

  const ContinentQuestions = shuffle(
    continentList.map((continent) =>
      createContinentQuestion(
        continent,
        createAnswers(continentAnswers, continent.countryAmount)
      )
    )
  );

  const countryQuestions = shuffle(
    countryList.map((country) =>
      createLanguageQuestion(
        country,
        createAnswers(countryAnswers, country.language)
      )
    )
  ).filter((_, index) => index <= 15);

  const MAX_QUESTIONS = 15;

  // returned mix between 2 types of question, 15 questions in total
  const shuffledQuestions = shuffle([
    ...ContinentQuestions,
    ...countryQuestions,
  ]).filter((_, index) => index < MAX_QUESTIONS);

  return shuffledQuestions;
};
