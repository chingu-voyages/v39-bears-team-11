import styles from '../../styles/ContainerHeading.module.css'

function ContainerHeading({ text }) {
  return (
    <h5 className={styles['container-heading']}>{text}</h5>
  )
}

export default ContainerHeading
