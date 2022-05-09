import { forwardRef } from 'react'
import ConfirmButton from '../button/ConfirmButton'
import CancelButton from '../button/CancelButton'
import styles from '../../styles/Modal.module.css'

const Modal = forwardRef(({
  title,
  text,
  onRequestClose,
  confirmButtonText,
  buttonClasses,
  formHandler,
  formHandlerArgument,
}, ref) => (
  <dialog
    ref={ref}
    className={styles.modal}

  >
    <h4>{title}</h4>
    <p>{text}</p>
    <form
      method="dialog"
      onSubmit={() => formHandler(formHandlerArgument)}
    >
      <ConfirmButton
        text={confirmButtonText}
        buttonClasses={buttonClasses}
      />
    </form>

    <CancelButton clickHandler={onRequestClose} />
  </dialog>
))

export default Modal
