export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,24}$/;
// only a-zA-z and white space
export const textWithSpaceRegex = /^[a-zA-Z ]*$/;
// phone numb
// mobile.phone.viettel.ten=032,033,034,035,036,037,038,039,086,096,097,098
// mobile.phone.viettel.eleven=0162,0163,0164,0165,0166,0167,0168,0169
// mobile.phone.vinaphone.ten=081,082,083,084,085,088,091,094
// mobile.phone.vinaphone.eleven=0123,0124,0125,0127,0129
// mobile.phone.mobifone.ten=070,076,077,078,079,089,090,093
// mobile.phone.mobifone.eleven=0120,0121,0122,0126
// mobile.phone.vietnammobile.ten=056,058,092
// mobile.phone.vietnammobile.eleven=0188,0186
// mobile.phone.gmobile.ten=059,099
// mobile.phone.gmobile.eleven=0199
export const phoneNumberRegex = /(032|033|034|035|036|037|038|039|086|096|097|098|0162|0163|0164|0165|0166|0167|0168|0169|081|082|083|084|085|088|091|094|0123|0124|0125|0127|0129|070|076|077|078|079|089|090|093|0120|0121|0122|0126|056|058|092|0188|0186|059|099|0199)+([0-9]{7})\b/g;

// email
export const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// not match special characters and digits
// export const notMatchSpecialCharsAndDigits = /^([^0-9\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|]*)$/g;

// remove https http
export const httpHttpsRegex = /(^\w+:|^)\/\//;

export const onlyCharAndSpace = /^[^0-9~`!@#$%^&*()_+\-=.,<>?/:;"'{}[\]|\\]+$/;
