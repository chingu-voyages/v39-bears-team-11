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
  const [stream, setStream] = useState(null)
  const [video, setVideo] = useState(null)
  const [canvas, setCanvas] = useState(null)
  const [isClearCanvas, setClearCanvas] = useState(true)

  /* Get video and canvas elements */
  useEffect(() => {
    setVideo(ref.current.children[1])
    setCanvas(ref.current.children[2])
  }, [])

  /* When use camera modal is open, reate a stream  */
  /* and assign it to the src of our video element */
  useEffect(() => {
    (async () => {
      if (isOpen) {
        /* Requesting User Permission */
        const currentStream = await navigator.mediaDevices.getUserMedia({ video: true })
        setStream(currentStream)
        video.srcObject = currentStream
      }
    })()
  }, [isOpen])

  const pauseStream = () => {
    // eslint-disable-next-line no-param-reassign
    stream.getTracks().forEach((track) => { track.enabled = false })
  }

  const resumeStream = () => {
    // eslint-disable-next-line no-param-reassign
    stream.getTracks().forEach((track) => { track.enabled = true })
  }

  const showCanvas = () => {
    video.classList.add('hidden')
    canvas.classList.remove('hidden')
  }

  const hideCanvas = () => {
    canvas.classList.add('hidden')
    video.classList.remove('hidden')
  }

  const clearCanvas = () => {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    setClearCanvas(true)
    hideCanvas()
  }

  const killStreamAndCloseModal = () => {
    const killStream = () => {
      if (video) {
        video.srcObject = null
        /* Stop stream */
        stream.getTracks().forEach((track) => track.stop())
      }
    }

    setSelectedFile(null)
    clearCanvas()
    killStream()
    onRequestClose()
  }

  const handleTryAgain = () => {
    clearCanvas()
    resumeStream()
  }

  const handleTakePicture = async () => {
    /* Draw an image - of same width and height */
    /* as canvas - from the current stream      */
    const drawImageOnCanvas = () => {
      showCanvas()
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
      setClearCanvas(false)
    }

    const getCanvasImageUrl = () => canvas.toDataURL('image/jpeg')

    /* Returns a chained promise that resolves into an image file. */
    const convertImgDataUrlIntoFile = async (imageDataUrl) => (
      fetch(imageDataUrl)
        .then((it) => it.blob())
        .then((blob) => new File(
          [blob],
          'newPicture.jpeg',
          {
            type: 'image/jpeg',
            lastModified: new Date(),
          },
        ))
    )

    /* Start the process of taking a picture ===> */
    pauseStream()
    drawImageOnCanvas()
    const imageDataUrl = getCanvasImageUrl()
    const imageFile = await convertImgDataUrlIntoFile(imageDataUrl)

    /* Check file size before setting file */
    if (imageFile.size > 2048000) {
      alert('Image size must not exceed 2MB')
      handleTryAgain()
    } else {
      setSelectedFile(imageFile)
    }
  }

  const handleSubmit = () => {
    formHandler(selectedFile)
    killStreamAndCloseModal()
  }

  return (
    <dialog
      ref={ref}
      className={styles.imageModal}
    >
      <div className={styles.imageModal__heading}>
        <Button text="x" onClick={() => killStreamAndCloseModal()} />
      </div>

      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video id="video" autoPlay />
      <canvas id="canvas" className="hidden" />

      <div className={styles['imageModal__btn-container']}>
        {isClearCanvas
          && (
            <Button
              text="Take Photo"
              onClick={handleTakePicture}
            />
          )}

        {/* If a picture was taken and drawn,
            display try again and save buttons */}
        {!isClearCanvas
          && (
            <>
              <Button
                text="Try again"
                onClick={handleTryAgain}
              />
              <form
                method="dialog"
                onSubmit={handleSubmit}
              >
                <ConfirmButton
                  text={confirmButtonText}
                />
              </form>
            </>
          )}
      </div>
    </dialog>
  )
})

export default UseCameraModal
