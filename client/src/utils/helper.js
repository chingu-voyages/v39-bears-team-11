import imageType from 'image-type'

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

/* Convert image byte array into an image url */
/* Recieves an object and Handles three types of data: */
/* a url string, a byte array and an ArrayBuffer.      */
export const imgToDataUrl = (content) => {
  /* image and contentType are the variables which will */
  /* hold the data necessary to create our image url    */
  let image = ''
  let contentType = ''

  /* In case of a url string, no further processing is required */
  if (typeof content.data === 'string') {
    image = content.data
    contentType = content.contentType
  } else {
    const bufferFromData = (data) => new Uint8Array(data)

    /* The input for bufferFromArray differs depending on    */
    /* whether content.data is a byte array or an ArrayBuffer */
    const getBuffer = (isArrayBuffer) => (
      isArrayBuffer
        ? bufferFromData(content)
        : bufferFromData(content.data.data)
    )

    /* In case content.data is an ArrayBuffer, contentType is not available */
    /* and must be detected manually, here using the imageType package      */
    const getContentType = (isArrayBuffer, buffer) => (
      isArrayBuffer
        ? imageType(buffer).mime
        : content.contentType
    )

    /* Create a binary string, i.e., a string object in which each */
    /* character in the string is treated as a byte of binary data */
    const getBinaryStringFromByteArray = (buffer) => (
      buffer.reduce((data, byte) => (
        data + String.fromCharCode(byte)), ''))

    /* create a Base64-encoded ASCII string from a binary string */
    const getImgUrlFromBinaryString = (binaryString) => (
      window.btoa(binaryString)
    )

    const isArrayBuffer = content.byteLength !== undefined
    const buffer = getBuffer(isArrayBuffer)
    const binaryString = getBinaryStringFromByteArray(buffer)
    image = getImgUrlFromBinaryString(binaryString)
    contentType = getContentType(isArrayBuffer, buffer)
  }

  return `data:${contentType};base64,${image}`
}
