/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {

      if (strs.length === 0) return "";

  let result = "";

  for (let i = 0; i < strs[0].length; i++) {
    let ch = strs[0][i];

    for (let j = 1; j < strs.length; j++) {
      if (strs[j][i] !== ch) {
        return result;
      }
    }

    result += ch;
  }

  return result;
};