import React, { useRef, useEffect } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import Webcam from 'react-webcam';

const Index = () => {
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
      console.log(pose);

      // Draw detected body parts on canvas
      const ctx = canvasRef.current.getContext('2d');
      posenet.drawSinglePose(canvasRef.current, pose);
    }
  };

  return (
    <div>
      <Webcam
        ref={webcamRef}
        mirrored={true}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
    </div>
  );
};

export default Index;
