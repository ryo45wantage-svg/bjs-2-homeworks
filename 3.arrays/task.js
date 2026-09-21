/**
 * Задача 1. Сравнение массивов
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {boolean}
 */
function compareArrays(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((item, index) => item === arr2[index]);
}

/**
 * Задача 2. Средний возраст пользователей одного пола
 * @param {Array} users
 * @param {string} gender
 * @returns {number}
 */
function getUsersNamesInAgeRange(users, gender) {
  const filteredUsers = users.filter(user => user.gender === gender);

  if (filteredUsers.length === 0) {
    return 0;
  }

  return filteredUsers
    .map(user => user.age)
    .reduce((sum, age) => sum + age, 0) / filteredUsers.length;
}