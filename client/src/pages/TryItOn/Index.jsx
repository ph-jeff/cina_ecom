import React from 'react'

const Index = () => {
    return (
        <a-scene embedded>
            {/* VR shoe model */}
            <a-entity
                gltf-model="url(path/to/your/shoe-model.gltf)"
                scale="0.2 0.2 0.2"
                position="0 0 -5"
            ></a-entity>

            {/* Basic environment */}
            <a-sky color="#ECECEC"></a-sky>
            <a-light type="ambient" color="#888"></a-light>
            <a-light type="directional" position="-3 5 1" intensity="0.5"></a-light>
        </a-scene>
    )
}

export default Index
