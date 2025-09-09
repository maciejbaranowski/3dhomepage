import React from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader, RepeatWrapping } from 'three'
import { Plane } from '@react-three/drei'

function Environment3D() {
  const grassTexture = useLoader(TextureLoader, '/textures/grass.jpg')
  
  // Configure texture wrapping
  grassTexture.wrapS = grassTexture.wrapT = RepeatWrapping
  grassTexture.repeat.set(30, 30)

  return (
    <>
      {/* Ground */}
      <Plane 
        args={[60, 60]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
        receiveShadow
      >
        <meshLambertMaterial map={grassTexture} />
      </Plane>

      {/* Invisible boundaries */}
      <mesh position={[0, 5, -30]} visible={false}>
        <boxGeometry args={[60, 10, 1]} />
      </mesh>
      <mesh position={[0, 5, 30]} visible={false}>
        <boxGeometry args={[60, 10, 1]} />
      </mesh>
      <mesh position={[-30, 5, 0]} visible={false}>
        <boxGeometry args={[1, 10, 60]} />
      </mesh>
      <mesh position={[30, 5, 0]} visible={false}>
        <boxGeometry args={[1, 10, 60]} />
      </mesh>
    </>
  )
}

export default Environment3D