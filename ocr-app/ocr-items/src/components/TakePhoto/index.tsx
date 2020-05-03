import React, { CSSProperties, useState } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { API_ENDPOINT } from '../../store/form/constants';
import { postImageFile } from '../../services/apiService';
import { createBlobFromdataURI } from '../../services/dataTransformService';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Grid, Card, CardContent } from '@material-ui/core';


export interface IProps {
  position?: string;
  showCamera: boolean;
};
const classCamera = "camera"
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
    position,
    showCamera
  } = props;
  const height = 640; // 480
  const width = 480; // 640
  const css: CSSProperties = { width, height, overflow: "hidden" }
  const [showCam, setShowCam] = useState(showCamera ? 0 : 1);
  return (
    <>
    {/* <IconButton color={isOpen(showCam) ? "secondary" : "primary"} component="span" onClick={() => setShowCam(showCam + 1)} >
          <PhotoCamera />
        </IconButton> */}
    <Grid container={true} className={`${classCamera}_container`}>
      <Grid item={true} xs={12}>
        
      </Grid>
      {showCamera &&
        <Card className={`${classCamera}_on`}>
          <CardContent>
            <Grid item={true} xs={12}>
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

              </div>
            </Grid>
          </CardContent>
        </Card>}
    </Grid>
    </>
  );
});

const isOpen = (x: number): boolean => (x % 2 === 0);

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