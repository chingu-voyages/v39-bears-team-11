import { useRef, useState } from 'react'
import styles from '../../styles/MessageForms.module.css'
import NewMessageForm from '../new_message_form/NewMessageForm'
import NewPictureButton from '../button/NewPictureButton'
import Button from '../button/Button'
import ConfirmButton from '../button/ConfirmButton'
import imgFilePlaceholder from '../../icons/img-file-placeholder.png'
import UseCameraModal from '../modal/UseCameraModal'

function MessageForms() {
  const [previewPicture, setPreviewPicture] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  console.log(selectedFile)
  const [stream, setStream] = useState(null)

  const modalRef = useRef()
  const useCameraModalRef = useRef()
  const imgFileInputRef = useRef()

  const handleImgFileSelect = (event) => {
    console.log(event.target.files[0])
    if (event.target.files.length) {
      if (event.target.files[0].size > 2048000) alert('Selected file is too large')

      else {
        setPreviewPicture(URL.createObjectURL(event.target.files[0]))
        setSelectedFile(event.target.files[0])
      }
    }
  }

  return (
    <div className={styles['message-forms']}>
      <NewMessageForm />
      <NewPictureButton clickHandler={() => modalRef.current.showModal()} />

      <dialog
        style={{
          border: '0',
          width: '550px',
          height: '450px',
          top: '30%',
          left: '30%',
          borderRadius: '15px',
          boxShadow: '2px 2px 2px black',
          padding: '20px',
          textAlign: 'center',
        }}
        ref={modalRef}
      >
        <div>
          <Button text="X" onClick={() => modalRef.current.close()} />
        </div>
        <img
          src={previewPicture || imgFilePlaceholder}
          alt="placeholder"
          style={{
            width: '150px',
            height: '150px',
            objectFit: 'cover',
          }}
        />
        <form method="dialog" onSubmit={() => console.log('form submitted', selectedFile)}>
          <label htmlFor="image">
            <input
              required
              style={{ display: 'none' }}
              ref={imgFileInputRef}
              type="file"
              accept="image/*"
              alt="upload photo"
              id="image"
              name="image"
              onChange={handleImgFileSelect}
            />
          </label>
          <Button
            text="upload picture"
            onClick={() => imgFileInputRef.current.click()}
          />
          <Button
            text="useCamera"
            onClick={async () => {
              if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
                console.log("Let's get this party started")
                modalRef.current.close()
                useCameraModalRef.current.showModal()
                const currentStream = await navigator.mediaDevices.getUserMedia({ video: true })
                setStream(currentStream)
                useCameraModalRef.current.children[1].srcObject = currentStream
              }
            }}
          />
          <ConfirmButton text="send" />
        </form>
      </dialog>

      <UseCameraModal
        ref={useCameraModalRef}
        getCanvas={() => useCameraModalRef.current.children[3]}
        getVideo={() => useCameraModalRef.current.children[1]}
        onRequestClose={() => useCameraModalRef.current.close()}
        stream={stream}
        onTakePicture={async (imageDataUrl) => {
          setPreviewPicture(imageDataUrl)
          setSelectedFile(await fetch(imageDataUrl)
            .then((it) => it.blob())
            .then((blob) => new File(
              [blob],
              'newPicture.jpg',
              {
                type: 'image/jpeg',
                lastModified: new Date(),
              },
            )))
        }}
      />
    </div>
  )
}

export default MessageForms
