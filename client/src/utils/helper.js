// *******************
// sortArrayOfObjects
// *******************
// Sorts an array of objects and depending on the choice returns:
// sorted array OR first item of the sorted array OR last item of the sorted array
//
// arguments:
//   arr - the array that will be sorted
//   property - the property of the object by which the array will be sorted
//   order =  'asc' - sort in ascending order (default)
//            'desc' - sort in desceceding order
//   receive = 'array' - funtion will return the sorted array (default)
//             'firstItem' - function will return the first item of the sorted array
//             'lastItem'  - function will return the last item of the sorted array
//
// version 0.1
// At the moment the function was only tested to work with timestamps (number) and it's
// doing that well. It still needs refactoring for other types and also it needs better
// error handling. For example it should check if the object contains selected property,
// or if the correct types of the arguments were provided etc.

// eslint-disable-next-line import/prefer-default-export
export const sortArrayOfObjects = (
  arr,
  property,
  order = 'asc',
  receive = 'array',
) => {
  const sortedArr = arr.sort((a, b) => {
    if (order === 'asc') return a[property] - b[property]
    if (order === 'desc') return b[property] - a[property]
    return 'error: wrong _order_ argument'
  })
  if (receive === 'array') return sortedArr
  if (receive === 'firstItem') return sortedArr[0]
  if (receive === 'lastItem') return sortedArr[sortedArr.length - 1]
  return 'error: wrong _receive_ argument'
}
