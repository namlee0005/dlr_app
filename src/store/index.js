import React, { createContext, useReducer } from 'react';
import reducer from './reducer';

const StoreContext = createContext();

const dataCardHome = [
  {
    id: 1,
    image: 'document',
    title: 'Thi Sát Hạch SPLX',
    content: '10 đề thi',
  },
  {
    id: 2,
    image: 'book',
    title: 'Ôn Tập Câu Hỏi',
    content: '200 câu hỏi theo chủ đề',
  },
  {
    id: 3,
    image: 'delete',
    title: 'Xem Câu Bị Sai',
    content: '1 câu hỏi sai',
  },
  {
    id: 4,
    image: 'scale',
    title: 'Xử Phạt Giao Thông',
    content: 'NĐ 100/2019',
  },
  {
    id: 5,
    image: 'trafficLights',
    title: 'Biển Báo Giao Thông',
    content: 'Tất cả biên báo giao thông',
  },
  {
    id: 6,
    image: 'brain',
    title: 'Mẹo Thi Kết Quả Cao',
    content: 'Lý thuyết và thực hành',
  },
];

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { cardHome: dataCardHome });

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
export { StoreContext, StoreProvider };
