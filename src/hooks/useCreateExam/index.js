import { useContext, useCallback } from 'react';
import { StoreContext } from '@src/store';
const useCreateExam = () => {
  const { state } = useContext(StoreContext);

  const randomItem = useCallback((items) => {
    if (!items) {
      return null;
    }
    return items[Math.floor(Math.random() * items?.length)];
  }, []);

  const handleCreateExam = useCallback(() => {
    if (state?.realm === null) {
      return [];
    }
    //bo cau hoi ly thuyet
    let roadTrafficLaw = state?.realm?.objects('ExamA1').filtered('type = 1');

    let arr1 = [];
    while (arr1.length <= 15) {
      let temp = randomItem(roadTrafficLaw);
      if (!arr1.includes(temp)) {
        arr1.push(temp);
      }
    }
    return arr1;
  }, [state, randomItem]);

  return handleCreateExam();
};

export default useCreateExam;
