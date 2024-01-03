// import React, { useEffect, useRef } from 'react'
// import { Canvas } from '@react-three/fiber';
// import { useGLTF, PerspectiveCamera, OrbitControls } from '@react-three/drei';
// import * as THREE from 'three';

// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// const ThreeD = () => {
//     const scene = new THREE.Scene();
//     useEffect(() => {
//         const loader = new GLTFLoader();

//         loader.load('../../../public/assets/camera.gltf', function ( gltf ) {

//             scene.add( gltf.scene );

//         }, undefined, function ( error ) {

//             console.error( error );

//         } );
//     }, []);
    
//     return (
//         <div className="min-h-screen h-fit px-2 md:px-24 py-10 md:flex block">
//             {/* <Canvas>
//                 <ambientLight intensity={0.1} />
//                 <pointLight position={[10, 10, 50]} />
//                 <ShoeModel />
//                 <perspectiveCamera position={[0, 0, 20]} />
//                 <OrbitControls />
//             </Canvas> */}
//         </div>
//     );
// }

// export default ThreeD;

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, OrbitControls } from '@react-three/drei';

const ShoeModel = () => {
  const { scene } = useGLTF('/assets/camera.gltf');
  return <primitive object={scene} />;
};

const ThreeD = () => {
  return (
    <div className="min-h-screen h-fit px-2 md:px-24 py-10 md:flex block">
      <Canvas>
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 50]} />
        <ShoeModel />
        <PerspectiveCamera position={[0, 0, 20]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ThreeD;
