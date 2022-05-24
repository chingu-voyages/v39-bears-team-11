import styles from '../../styles/ChatRoom-styles/Messages.module.css'

function MessageBody({ classes, content }) {
  /* Create a binary string, i.e., a string object in which each */
  /* character in the string is treated as a byte of binary data */
  const getBinaryStringFromByteArray = (byteArray) => (
    new Uint8Array(byteArray)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  )

  /* Convert image byte array into an image url */
  const imgToDataUrl = () => {
    const binaryString = getBinaryStringFromByteArray(content.data.data)
    /* create a Base64-encoded ASCII string from a binary string */
    const image = btoa(binaryString)
    return `data:${content.contentType};base64,${image}`
  }

  const showContent = () => {
    /* A message can be of type string or byte array */
    if (typeof content === 'string') {
      return (
        <p>{content}</p>
      )
    }
    return (
      <img src={imgToDataUrl()} alt="message" />
    )
  }

  return (
    <div className={`${styles.message__body} ${styles[classes]}`}>
      {showContent()}
    </div>
  )
}

export default MessageBody
