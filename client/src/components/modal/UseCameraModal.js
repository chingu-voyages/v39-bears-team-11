import { forwardRef, useEffect, useState } from 'react'
import Button from '../button/Button'
import ConfirmButton from '../button/ConfirmButton'
import styles from '../../styles/ImageModal.module.css'

const UseCameraModal = forwardRef(({
  isOpen,
  onRequestClose,
  formHandler,
  confirmButtonText,
}, ref) => {
  const [selectedFile, setSelectedFile] = useState(null)
  console.log(selectedFile)
  const [stream, setStream] = useState(null)
  const [video, setVideo] = useState(null)
  const [canvas, setCanvas] = useState(null)
  const [isClearCanvas, setClearCanvas] = useState(true)

  /* Get video and canvas elements */
  useEffect(() => {
    setVideo(ref.current.children[1])
    setCanvas(ref.current.children[2])
  }, [])

  const pauseStream = () => {
    // eslint-disable-next-line no-param-reassign
    stream.getTracks().forEach((track) => { track.enabled = false })
  }

  const resumeStream = () => {
    // eslint-disable-next-line no-param-reassign
    stream.getTracks().forEach((track) => { track.enabled = true })
  }

  const clearCanvas = () => {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    setClearCanvas(true)
    canvas.classList.add('hidden')
    video.classList.remove('hidden')
  }

  const killStreamAndCloseModal = () => {
    const killStream = () => {
      if (video) {
        video.srcObject = null
        stream.getTracks().forEach((track) => track.stop())
      }
    }
    setSelectedFile(null)
    clearCanvas()
    killStream()
    onRequestClose()
  }

  useEffect(() => {
    (async () => {
      if (isOpen) {
        /* Create a stream and assign it to the src of our video element */
        /* Requesting User Permission */
        const currentStream = await navigator.mediaDevices.getUserMedia({ video: true })
        setStream(currentStream)
        video.srcObject = currentStream
      }
    })()
  }, [isOpen])

  const handleTakePicture = async () => {
    const convertImgDataUrlIntoFile = async (imageDataUrl) => (
      fetch(imageDataUrl)
        .then((it) => it.blob())
        .then((blob) => new File(
          [blob],
          'newPicture.jpg',
          {
            type: 'image/jpeg',
            lastModified: new Date(),
          },
        ))
    )
    const drawAndGetCanvasImageUrl = () => {
      video.classList.add('hidden')
      canvas.classList.remove('hidden')
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
      setClearCanvas(false)
      return canvas.toDataURL('image/*')
    }
    const imageDataUrl = drawAndGetCanvasImageUrl()
    // Check file size before setting
    setSelectedFile(
      await convertImgDataUrlIntoFile(imageDataUrl),
    )
    pauseStream()
  }

  const handleTryAgain = () => {
    clearCanvas()
    resumeStream()
  }

  return (
    <dialog
      ref={ref}
      className={`${styles.imageModal} ${styles['use-camera-modal']}`}
    >
      <Button text="X" onClick={() => killStreamAndCloseModal()} />
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video id="video" width="320" height="240" autoPlay />
      <canvas id="canvas" className="hidden" width="320" height="240" />

      {isClearCanvas
        && (
          <Button
            text="Take Photo"
            onClick={handleTakePicture}
          />
        )}

      {!isClearCanvas
        && (
          <>
            <Button
              text="Try again"
              onClick={handleTryAgain}
            />
            <form
              method="dialog"
              onSubmit={() => {
                formHandler(selectedFile)
                killStreamAndCloseModal()
              }}
            >
              <ConfirmButton
                text={confirmButtonText}
                disabled={selectedFile === null}
              />
            </form>
          </>
        )}
    </dialog>
  )
})

export default UseCameraModal
