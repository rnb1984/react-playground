import React, { CSSProperties, useState } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { API_ENDPOINT } from '../../store/form/constants';
import { postImageFile } from '../../services/apiService';
import { createBlobFromdataURI } from '../../services/dataTransformService';


export interface IProps {
  showCamera: boolean;
};

const onTakePhoto = async (dataUri: any) => {
  const config = {
    sizeFactor: 1,
    imgCompression: .5
  };
  // Convert image uri into a blob thats formatable to send as a image file
  const dataBlob = createBlobFromdataURI(dataUri)
  console.log("Blobbed ", dataBlob)
  postImageFile(API_ENDPOINT, dataBlob)
};

export default React.memo<IProps>((props: IProps) => {
  const {
    showCamera
  } = props;
  const height = 640; // 480
  const width = 480; // 640
  const css: CSSProperties = { width, height, overflow: "hidden" }
  const [showCam, setShowCam] = useState(1)
  return (
    <div className="camera-container">
      <h3>Camera Time</h3>
      <button onClick={() => setShowCam(showCam + 1)}> {isOpen(showCam)? "Close" : "Open"} Camera</button>
      {isOpen(showCam) &&
        <div style={css}>
          <Camera
            onTakePhoto={(dataUri: File) => { onTakePhoto(dataUri); }}
            onCameraError={(error: any) => { onCameraError(error); }}
            idealFacingMode={FACING_MODES.ENVIRONMENT}
            idealResolution={{ width, height }}
            imageType={IMAGE_TYPES.JPG}
            imageCompression={0.97}
            isMaxResolution={false}
            isImageMirror={false}
            isSilentMode={true}
            isDisplayStartCameraError={true}
            isFullscreen={false}
            sizeFactor={1}
            onCameraStart={(stream: any) => { onCameraStart(stream); }}
            onCameraStop={() => { onCameraStop(); }}
          />
        </div>}
    </div>
  );
});

const isOpen = (x:number):boolean => (x%2===0) ;

// Cammera handling
const onCameraError = (error: DOMException) => {
  console.error('onCameraError', error.message);

  if (error.message === "Permission denied") {
    window.alert("Please allow browser settings to access camera");
  }
}
const onCameraStart = (stream: any) => {
  console.log('onCameraStart');
}
const onCameraStop = () => {
  console.log('onCameraStop');
}