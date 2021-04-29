import { objectQuestions } from '@src/realms/realm';

const randomItem = (items) => {
  return items[Math.floor(Math.random() * items?.length)];
};

export const createA1Exam = (id, realm) => {
  if (!realm) {
    return false;
  }
  try {
    const topicExam = {
      id: id,
      title: 'Đề số ' + id,
      status: 1,
      content: 'a',
      number: 25,
      time: 1140000,
      total: 0,
    };

    let roadTrafficLaw = realm
      ?.objects('ExamA1')
      .filtered('type = 1 || type = 3 || type = 4');
    //lay random 1 cau diem liet
    let arrSentenceParalysis = roadTrafficLaw
      ?.map((i) => i)
      .filter((e) => e.isSentenceParalysis);
    let arr1 = [];
    let arrRandom = randomItem(arrSentenceParalysis);
    arrRandom.selected = -1;
    let rdNumber = Math.floor(Math.random() * 15);
    //tao random 15 cau hoi duong bo
    while (arr1.length < 15) {
      if (arr1.length - 1 === rdNumber) {
        arr1.push(objectQuestions(arrRandom));
        continue;
      }
      let temp = randomItem(roadTrafficLaw);
      temp.selected = -1;
      if (!arr1.includes(temp)) {
        arr1.push(objectQuestions(temp));
      }
    }

    let trafficSigns = realm?.objects('ExamA1').filtered('type = 5');
    //tao random 5 cau bien bao giao thong
    while (arr1.length < 20) {
      let temp = randomItem(trafficSigns);
      temp.selected = -1;
      if (!arr1.includes(temp)) {
        arr1.push(objectQuestions(temp));
      }
    }

    let sentenceSaHinh = realm?.objects('ExamA1').filtered('type = 6');
    //tao random 5 cau sa hinh
    while (arr1.length < 25) {
      let temp = randomItem(sentenceSaHinh);
      temp.selected = -1;
      if (!arr1.includes(temp)) {
        arr1.push(objectQuestions(temp));
      }
    }
    topicExam.questions = arr1;
    return topicExam;
  } catch (error) {
    // console.log(error);
    return false;
  }
};
