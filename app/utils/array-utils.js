import CONSTANTS from './global-constants';

/**
 * Sorts the file information array based on name.
 * @param   {Array}   payload API data with country and flag information.
 * @param   {String}  key     key name to sort by.
 * @param   {String}  order   'a' for ascending and 'd' for descendinbbg.
 * @returns {Array}           Returns the sorted array.
 */
export const sortPayload = (payload, key, order) => {
 const isOrderAscending = (order && order === CONSTANTS.apiConfig.ascending);
 payload.sort((item1, item2) => {
   const item1Val = item1[key].toLowerCase();
   const item2Val = item2[key].toLowerCase();

   if((isOrderAscending && item1Val < item2Val) || (!isOrderAscending && item1Val > item2Val)) {
     return -1;
   } else if ((isOrderAscending && item1Val > item2Val) || (!isOrderAscending && item1Val < item2Val)) {
     return 1;
   } else {
     return 0;
   }
 });
}
