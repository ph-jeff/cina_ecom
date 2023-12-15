// import React, { useEffect, useRef } from 'react'
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Webcam from 'react-webcam';

// import * as tf from '@tensorflow/tfjs';
// import * as posenet from '@tensorflow-models/posenet';

// const modal_style = {
//     // position: 'absolute',
//     // top: '50%',
//     // left: '50%',
//     // transform: 'translate(-50%, -50%)',
//     // width: 400,
//     // bgcolor: 'background.paper',
//     // border: '2px solid #000',
//     // boxShadow: 24,
//     // p: 4,
// };

// const style = {
//     position: 'absolute',
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     top: '15%',
//     left: 0,
//     right: 0,
//     textAlign: 'center',
//     zIndex: 9,
//     width: 640,
//     height: 480,
// }

// const TryItOnModal = ({ open, closeModal }) => {
//     const webcamRef = useRef(null);
//     const canvasRef = useRef(null);

//     useEffect(() => {
//         const runPoseNet = async () => {
//             const net = await posenet.load();
//             setInterval(() => {
//                 detect(net);
//             }, 100);
//         };

//         runPoseNet();
//     }, []);

//     const detect = async (net) => {
//         if (
//             typeof webcamRef.current !== 'undefined' &&
//             webcamRef.current !== null &&
//             webcamRef.current.video.readyState === 4
//         ) {
//             const video = document.getElementById('ar-video');
//         }
//     };

//     return (
//         <Modal
//             open={open}
//             onClose={closeModal}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//         >
//             <Box sx={modal_style}>
//                 <Webcam
//                     ref={webcamRef}
//                     mirrored={true}
//                     style={style}
//                 />
//                 <canvas
//                     ref={canvasRef}
//                     style={style}
//                 />
//             </Box>
//         </Modal>
//     )
// }

// export default TryItOnModal

// -----------------------------------------------

// import { Canvas } from '@react-three/fiber';
// import { PresentationControls, Stage, useGLTF } from '@react-three/drei';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import { useRef } from 'react';

// function Model(props){
//     const gltf = useGLTF('../../assets/bmw.gltf');
//     const modelRef = useRef();

//     return <primitive object={gltf.scene} ref={modelRef} {...props} />;
// }

// const TryItOnModal = ({ open, closeModal }) => {

//     return (
//         <Modal
//             open={open}
//             onClose={closeModal}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//         >
//             <Box className="fixed inset-0 flex items-center justify-center">
//                 <div className="container h-50">
//                     <Canvas dpr={[1,2]} shadows camera={{ fov: 45 }} style={{"position": "absolute"}} >
//                         <color attach="background" args={["#101010"]} />
//                         <PresentationControls speed={1.5} global zoom={.5} polar={[-0.1, Math.PI / 4]}>
//                             <Stage environment={null}>
//                                 <Model scale={0.01} />
//                             </Stage>
//                         </PresentationControls>
//                     </Canvas>
//                 </div>
//             </Box>
//         </Modal>
//     )
// }

// export default TryItOnModal

// -----------------------------------------------

// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';

// import { Canvas } from '@react-three/fiber';
// import { useGLTF, OrbitControls } from '@react-three/drei';

// import { useEffect, useRef } from 'react';
// import * as THREE from 'three';

// const modal_style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 300,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };

// function Model({ ...props }) {
//     const ref = useRef();
//     const { nodes, materials } = useGLTF('../../assets/bmw.gltf');
//     return (
//         <mesh ref={ref}>
//             <boxGeometry attach={'geometry'} args={[2, 2, 2]} />
//         </mesh>
//     )
// }

// 

import React, { useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; // Import GLTFLoader separately

const modal_style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ThreeModelViewer = () => {
    const containerRef = useRef();

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 10);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        const loader = new GLTFLoader(); // Use the imported GLTFLoader
        loader.load('/assets/bmw.gltf', (gltf) => {
            gltf.scene.scale.set(1, 1, 1); // Adjust the scaling factor
            scene.add(gltf.scene);
        }, undefined, (error) => {
            console.error('Error loading 3D model:', error);
        });

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            // Clean up resources when the component unmounts
            renderer.dispose();
        };
    }, []);

    return <div ref={containerRef} />;
};

const TryItOnModal = ({ open, closeModal }) => {
    return (
        <Modal
            open={open}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="fixed inset-0 flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg">
                    <ThreeModelViewer />
                </div>
            </Box>
        </Modal>
    );
};

export default TryItOnModal;
