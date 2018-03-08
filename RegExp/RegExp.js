// 挑战一：数字
var pattern1 = /\d+/;  // 补全该正则表达式
console.log(pattern1.test('123')); // true
console.log(pattern1.test('abc')); // false
// 挑战二：3位的数字
console.log('---------------------------');
var pattern2 = /\b\d{3}\b/;  // 补全该正则表达式
console.log(pattern2.test('123'));  // true
console.log(pattern2.test('1234')); // false
// 挑战三：至少3位的数字
console.log('---------------------------');

var pattern3 = /\d{3}\d*/;  // 补全该正则表达式
console.log(pattern3.test('1234')); // true
console.log(pattern3.test('12'));   // false
// 挑战四：3-5位的数字
console.log('---------------------------');

var pattern4 = /\d{3,5}/;  // 补全该正则表达式
console.log(pattern4.test('1234')); // true
console.log(pattern4.test('1'));    // false
// 挑战五：由26个英文字母组成的字符串
console.log('---------------------------');

var pattern5 = /\b[a-zA-Z]+\b/;  // 补全该正则表达式
console.log(pattern5.test('abc'));  // true
console.log(pattern5.test('1abc')); // false
// 挑战六：由数字和26个英文字母组成的字符串
console.log('---------------------------');

var pattern6 = /\b[0-9a-zA-Z]+\b/;  // 补全该正则表达式
console.log(pattern6.test('1abc'));  // true
console.log(pattern6.test('_abc'));  // false
// 挑战七：日期格式：年-月-日
console.log('---------------------------');

var pattern7 = /\d{4}-([0][1-9]||[1][0-2])-([0][1-9]||[1-2][0-9]||[3][0-1])/;  // 补全该正则表达式
console.log(pattern7.test('2016-22-20'));  // false
console.log(pattern7.test('2016/08/20'));  // false
// 挑战八：时间格式：小时:分钟, 24小时制
console.log('---------------------------');

var pattern8 = /\d\d:\d\d/;  // 补全该正则表达式
console.log(pattern8.test('13:45'));  // true
console.log(pattern8.test('13点45')); // false
// 挑战九：中国大陆身份证号，15位或18位
console.log('---------------------------');

var pattern9 = /\d{15}(\d\d[\dxX])?/;  // 补全该正则表达式
console.log(pattern9.test('4223222199901090033'));  // true
console.log(pattern9.test('asdfasdfasfasdf1234'));  // false