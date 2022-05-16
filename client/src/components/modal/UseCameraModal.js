import { forwardRef } from 'react'
import Button from '../button/Button'
// import ConfirmButton from '../button/ConfirmButton'

const UseCameraModal = forwardRef(({
  onRequestClose,
  getCanvas,
  getVideo,
  onTakePicture,
  stream,
}, ref) => (
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
    ref={ref}
  >
    <Button text="X" onClick={onRequestClose} />
    {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
    <video id="video" width="320" height="240" autoPlay />
    <Button
      text="Take Photo"
      onClick={() => {
        const canvas = getCanvas()
        const video = getVideo()
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
        video.srcObject = null
        stream.getTracks().forEach((track) => track.stop())
        const imageDataUrl = canvas.toDataURL('image/*')
        console.log(imageDataUrl)
        onTakePicture(imageDataUrl)
      }}
    />
    <canvas id="canvas" width="320" height="240" />
    {/* <ConfirmButton onClick={() => onTakePicture()} /> */}
  </dialog>
))

export default UseCameraModal
