import styles from '../../styles/ContainerHeading.module.css'

function ContainerHeading({ text }) {
  // Function retrieveHeader is checking what text was passed to the Component.
  // This text will be the headers name, for example "Latest Chats".
  // Then depending on the name the function will return appropiate
  // class assiosiated with that header
  const retrieveHeaderType = (headerName) => {
    switch (headerName) {
    case 'Latest Chats':
      return 'container-heading-latest-chats'
    default:
      return 'container-heading-default'
    }
  }

  // We assign the result of the function to the variable that
  // we will use later as a className
  const headerType = retrieveHeaderType(text)

  return (
    <h5 className={styles[headerType]}>{text}</h5>
  )
}

export default ContainerHeading
