// import React, {
//   useLayoutEffect,
//   useEffect,
//   useState,
//   useCallback,
// } from 'react';
// import { convertLongToTime } from '@src/utils/formatters/date';
// import ImageIcon from '@src/components/ImageIcon';
// import TouchableBox from '@src/components/TouchableBox';
// import Typography from '@src/components/Typography';
// import { StyleSheet } from 'react-native';
// import Box from '@src/components/Box';
// import Underlined from '@src/components/Underlined';
// import ItemExam from './ItemExam';
// import realm from '@src/realms/realm';

// const ExamScreen = ({ navigation, route }) => {
//   const [exam, setExam] = useState(
//     realm
//       .objects('TopicExam')
//       .filtered('id =  ' + route.params.idExam)
//       .map((i) => i)[0],
//   );
//   const [countDown, setCountDown] = useState(exam?.time);
//   const [itemExam, setItemExam] = useState(exam && exam?.questions[0]);
//   const [flatIndex, setFlatIndex] = useState(0);

//   const onNext = useCallback(() => {
//     if (exam?.questions.length === flatIndex) {
//       return;
//     }
//     setFlatIndex(flatIndex + 1);
//     setItemExam(exam.questions[flatIndex + 1]);
//   }, [exam.questions, flatIndex]);

//   const onBack = useCallback(() => {
//     if (flatIndex === 0) {
//       return;
//     }
//     setFlatIndex(flatIndex - 1);
//     setItemExam(exam.questions[flatIndex + 1]);
//   }, [exam.questions, flatIndex]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (countDown !== 0) {
//         let time = countDown - 1000;
//         setCountDown(time);
//       } else {
//         //TODO add func ket thuc
//         clearInterval(interval);
//       }
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [countDown]);

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       title: `${exam?.title} ( ${convertLongToTime(countDown)} )`,
//     });
//   }, [countDown, navigation, exam?.title]);

//   return (
//     <Box padding={[0, 10]} background="white">
//       <Box flexDirection="row" margin={[20, 0, 0, 0]} justify="space-between">
//         <TouchableBox onPress={onBack}>
//           <ImageIcon name="chevronLeft" circle={14} />
//         </TouchableBox>
//         <Typography>Câu {flatIndex + 1} / 25</Typography>
//         <TouchableBox onPress={onNext}>
//           <ImageIcon name="chevronRight" circle={14} />
//         </TouchableBox>
//       </Box>
//       <Underlined />
//       <ItemExam item={itemExam} flatIndex={flatIndex} />
//     </Box>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingLeft: 15,
//     paddingRight: 15,
//     backgroundColor: '#efeff5',
//   },
//   flatList: { flexGrow: 1, margin: 10 },
//   answerUnderlined: { opacity: 0.2, height: 0.5, marginTop: 10 },
//   touAnswer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
//   answer: {
//     borderRadius: 30 / 2,
//     width: 30,
//     height: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderColor: 'gray',
//     borderWidth: 0.5,
//     marginRight: 10,
//   },
//   textAnswer: { fontSize: 16, color: '#3f403e' },
//   image: { height: 100, width: 100, marginTop: 10 },
// });

// export default ExamScreen;
