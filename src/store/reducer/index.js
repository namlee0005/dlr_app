const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EXAM':
      let item;
      let updateExam = state.topicExam;
      if (updateExam.length !== 0) {
        item = {
          id: updateExam[updateExam.length - 1].id + 1,
          title: 'Đề số ' + updateExam[updateExam.length - 1].id + 1,
          content: 50,
          number: '25',
          time: 100000,
        };
      } else {
        item = {
          id: 1,
          title: 'Đề số ' + 1,
          content: 50,
          number: '25',
          time: 100000,
        };
      }
      updateExam.push(item);
      return { ...state, topicExam: updateExam };
    case 'DELETED_EXAM':
      return { ...state, topicExam: [] };
    case 'UPDATE_RESULT': {
      let { exam, flatIndex, indexAnswer } = action.payload;
      let array = state.topicExam;
      let itemArray = array.find((e) => e.id === exam?.id);
      var questions = itemArray?.questions[flatIndex];
      questions.selected = indexAnswer;
      return { ...state, topicExam: array };
    }
    case 'SET_REALM': {
      return { ...state, realm: action.payload?.realm };
    }
    default:
      throw new Error();
  }
};

export default reducer;
