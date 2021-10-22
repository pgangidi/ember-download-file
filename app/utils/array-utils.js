import CONSTANTS from './global-constants';
import { get } from '@ember/object';

/**
 * Sorts the file information array based on name.
 * @param   {Array}   payload API data with country and flag information.
 * @param   {String}  key     key name to sort by.
 * @param   {String}  order   'a' for ascending and 'd' for descendinbbg.
 * @returns {Array}           Returns the sorted array.
 */
export const sortPayload = (payload, key, order) => {
 const isOrderAscending = (order && order === CONSTANTS.ascending);

 payload.sort((item1, item2) => {
   const item1Val = item1[key];
   const item2Val = item2[key];

   if((isOrderAscending && item1Val < item2Val) || (!isOrderAscending && item1Val > item2Val)) {
     return -1;
   } else if ((isOrderAscending && item1Val > item2Val) || (!isOrderAscending && item1Val < item2Val)) {
     return 1;
   } else {
     return 0;
   }
 });
}

/**
 * Count the number times that key matches the passed in value.
 * @param {Array} refArray              Array to loop through
 * @param {String} key                  The key whose occurrence needs to be counted
 * @param {String|Number|Boolean} value The value of associated key
 * @returns {Number}                    count of specific key that matches the value passed in.
 */
export const countOccurrence = (refArray, key, value)=> {
  let count = 0;

  refArray.map(function (arrEl) {
    count = get(arrEl, key) === value ? count + 1 : count;
  });

  return count;
}
