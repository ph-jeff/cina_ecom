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
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            const pose = await net.estimateSinglePose(video);
            // Access body part positions from 'pose' object
            // console.log(pose.keypoints);

            pose.keypoints.forEach(keypoint => {
                if(keypoint.part === 'rightAnkle' || keypoint.part === 'leftAnkle'){
                    console.log(keypoint.score)
                }
            });

            // Draw detected body parts on canvas
            //   const ctx = canvasRef.current.getContext('2d');
            //   posenet.drawSinglePose(canvasRef.current, pose);
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