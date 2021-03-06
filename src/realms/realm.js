import Realm from 'realm';

// Define your models and their properties
import { v4 as uuid } from 'uuid';

const ExamA1 = {
  name: 'ExamA1',
  primaryKey: 'id',
  properties: {
    id: 'int',
    question: 'string',
    explain: 'string?',
    correctAnswer: 'int',
    answer1: 'string?',
    answer2: 'string?',
    answer3: 'string?',
    answer4: 'string?',
    type: 'int',
    urlImage: 'string?',
    isSentenceParalysis: 'int?',
  },
};

const TopicExam = {
  name: 'TopicExam',
  primaryKey: 'id',
  properties: {
    id: 'int',
    title: 'string?',
    status: 'int?',
    content: 'string?',
    number: 'int?',
    time: 'int?',
    total: 'int?',
    questions: 'Questions[]',
  },
};

const Questions = {
  name: 'Questions',
  primaryKey: 'id',
  properties: {
    id: 'string',
    question: 'string',
    explain: 'string?',
    correctAnswer: 'int',
    answer1: 'string?',
    answer2: 'string?',
    answer3: 'string?',
    answer4: 'string?',
    type: 'int',
    urlImage: 'string?',
    isSentenceParalysis: 'int?',
    selected: 'int?',
    index: 'int?',
  },
};

const Theoretical = {
  name: 'Theoretical',
  primaryKey: 'id',
  properties: {
    id: 'string',
    question: 'string',
    explain: 'string?',
    correctAnswer: 'int',
    answer1: 'string?',
    answer2: 'string?',
    answer3: 'string?',
    answer4: 'string?',
    type: 'int?',
    urlImage: 'string?',
    isSentenceParalysis: 'int?',
    selected: 'int?',
  },
};

const QuestionsFail = {
  name: 'QuestionsFail',
  primaryKey: 'id',
  properties: {
    id: 'string',
    question: 'string',
    explain: 'string?',
    correctAnswer: 'int',
    answer1: 'string?',
    answer2: 'string?',
    answer3: 'string?',
    answer4: 'string?',
    type: 'int?',
    urlImage: 'string?',
    isSentenceParalysis: 'int?',
    selected: 'int?',
    count: 'int?',
  },
};

export const objectTheoretical = (realmObject, type) => {
  return {
    id: uuid(),
    question: realmObject?.question ? realmObject?.question : null,
    explain: realmObject?.explain ? realmObject?.explain : null,
    correctAnswer: realmObject?.correctAnswer
      ? realmObject?.correctAnswer
      : null,
    answer1: realmObject?.answer1 ? realmObject?.answer1 : null,
    answer2: realmObject?.answer2 ? realmObject?.answer2 : null,
    answer3: realmObject?.answer3 ? realmObject?.answer3 : null,
    answer4: realmObject?.answer4 ? realmObject?.answer4 : null,
    type: type || realmObject?.type,
    urlImage: realmObject?.urlImage ? realmObject?.urlImage : null,
    selected: -1,
    isSentenceParalysis: realmObject?.isSentenceParalysis,
  };
};

export const objectQuestions = (realmObject) => {
  return {
    id: uuid(),
    question: realmObject?.question ? realmObject?.question : null,
    explain: realmObject?.explain ? realmObject?.explain : null,
    correctAnswer: realmObject?.correctAnswer
      ? realmObject?.correctAnswer
      : null,
    answer1: realmObject?.answer1 ? realmObject?.answer1 : null,
    answer2: realmObject?.answer2 ? realmObject?.answer2 : null,
    answer3: realmObject?.answer3 ? realmObject?.answer3 : null,
    answer4: realmObject?.answer4 ? realmObject?.answer4 : null,
    type: realmObject?.type ? realmObject?.type : null,
    urlImage: realmObject?.urlImage ? realmObject?.urlImage : null,
    isSentenceParalysis: realmObject?.isSentenceParalysis,
    selected: realmObject?.selected ? realmObject?.selected : null,
    index: realmObject?.index ? realmObject?.index : null,
  };
};

export const objectQuestionsFail = (realmObject) => {
  return {
    id: uuid(),
    question: realmObject?.question ? realmObject?.question : null,
    explain: realmObject?.explain ? realmObject?.explain : null,
    correctAnswer: realmObject?.correctAnswer
      ? realmObject?.correctAnswer
      : null,
    answer1: realmObject?.answer1 ? realmObject?.answer1 : null,
    answer2: realmObject?.answer2 ? realmObject?.answer2 : null,
    answer3: realmObject?.answer3 ? realmObject?.answer3 : null,
    answer4: realmObject?.answer4 ? realmObject?.answer4 : null,
    type: realmObject?.type ? realmObject?.type : null,
    urlImage: realmObject?.urlImage ? realmObject?.urlImage : null,
    isSentenceParalysis: realmObject?.isSentenceParalysis,
    selected: realmObject?.selected ? realmObject?.selected : null,
    count: 1,
  };
};

export default new Realm({
  schema: [ExamA1, TopicExam, Questions, Theoretical, QuestionsFail],
});
