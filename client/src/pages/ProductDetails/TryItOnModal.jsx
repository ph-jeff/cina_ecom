import React, { useEffect, useRef } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Webcam from 'react-webcam';

import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';

const modal_style = {
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    // width: 400,
    // bgcolor: 'background.paper',
    // border: '2px solid #000',
    // boxShadow: 24,
    // p: 4,
};

const style = {
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    top: '15%',
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: 9,
    width: 640,
    height: 480,
}

const TryItOnModal = ({ open, closeModal }) => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const runPoseNet = async () => {
            const net = await posenet.load();
            setInterval(() => {
                detect(net);
            }, 100);
        };

        runPoseNet();
    }, []);

    const detect = async (net) => {
        if (
            typeof webcamRef.current !== 'undefined' &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            const video = document.getElementById('ar-video');
        }
    };

    return (
        <Modal
            open={open}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modal_style}>
                <Webcam
                    ref={webcamRef}
                    mirrored={true}
                    style={style}
                />
                <canvas
                    ref={canvasRef}
                    style={style}
                />
            </Box>
        </Modal>
    )
}

export default TryItOnModal

// // src/components/ARShoeTryOn.js
// import React, { useEffect } from 'react';
// import * as tf from '@tensorflow/tfjs';
// import 'aframe';
// import 'aframe-ar';

// const TryItOnModal = () => {
//   useEffect(() => {
//     const runARShoeTryOn = async () => {
//       const net = await tf.loadGraphModel('/path/to/tfjs_model/model.json');

//       // Access webcam
//       const video = document.getElementById('ar-video');
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       video.srcObject = stream;

//       // Perform shoe detection and display AR content
//       video.addEventListener('loadeddata', async () => {
//         const canvas = document.getElementById('ar-canvas');
//         const context = canvas.getContext('2d');

//         while (true) {
//           context.drawImage(video, 0, 0, 640, 480);

//           const img = tf.browser.fromPixels(canvas);
//           const result = await net.executeAsync(tf.image.resizeBilinear(img, [224, 224]));

//           // Check for shoe detection and render AR content
//           // Implement your AR rendering logic here

//           img.dispose();
//           await tf.nextFrame();
//         }
//       });
//     };

//     runARShoeTryOn();
//   }, []);

//   return (
//     <div>
//       <a-scene embedded arjs='sourceType: webcam;'>
//         <a-video
//           src="#ar-video"
//           width="640"
//           height="480"
//           rotation="-90 0 0"
//         ></a-video>
//         {/* Add your AR content components here */}
//       </a-scene>
//       <video id="ar-video" />
//       <canvas id="ar-canvas" width="640" height="480" style={{ display: 'none' }} />
//     </div>
//   );
// };

// export default TryItOnModal;
