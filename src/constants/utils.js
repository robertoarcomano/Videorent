export const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);
export const now = () => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd = '0'+dd
  }

  if(mm<10) {
      mm = '0'+mm
  }

  today = dd + '/' + mm + '/' + yyyy;
  return today
}

const swapDate = date => {
  if (date === undefined)
    return null;
  var tmpDate = date;
  return tmpDate.substr(3,2) + "/" + tmpDate.substr(0,2) + "/" + tmpDate.substr(5);
}

export const calcDelay = (date1, date2) => {
  var days = (Date.parse(swapDate(date2))-Date.parse(swapDate(date1)))/86400000;
  return days === 0 ? 1 : days
}

export const createJsonFromArrays = (keys,values = keys.map( key => "")) => {
  const pages = {}
  keys.forEach( (key,index) => pages[key] = values[index])
  return pages;
}

// Alternative Solution to createJsonFromArrays in case of values undefined => Use string to manipulate JSON
const quote = (s="") => "\"" + s + "\"";
export const arrayToJson = (x,y,index,arr) =>
  (index === 1) ? ( "{ " + quote(x) + ": " + quote() + ", ").concat(quote(y)) :
  (index === arr.length-1) ? JSON.parse (( x + ': ' + quote() + ", ").concat(quote(y) + ": " + quote() + " }")) :
  ( x + ': ' + quote() + ", ").concat(quote(y));
