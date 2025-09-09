import React, { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  Sky, 
  Environment,
  Text3D,
  Center,
  Float
} from '@react-three/drei'
import * as THREE from 'three'
import FirstPersonControls from '../controls/FirstPersonControls'
import Environment3D from './Environment3D'
import LinkPortals from './LinkPortals'
import AnimatedObjects from './AnimatedObjects'

function Scene3D({ sceneData }) {
  const { camera, gl } = useThree()
  const controlsRef = useRef()

  useEffect(() => {
    const controls = new FirstPersonControls(camera, gl.domElement)
    controlsRef.current = controls

    return () => {
      controls.dispose()
    }
  }, [camera, gl])

  useFrame((state, delta) => {
    if (controlsRef.current) {
      controlsRef.current.update(delta)
    }
  })

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[-20, 30, 20]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={200}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />

      {/* Environment */}
      <Sky sunPosition={[100, 20, 100]} />
      <fog attach="fog" args={['#ffffff', 10, 1000]} />
      
      <Environment3D />
      <LinkPortals urls={sceneData.urls} />
      <AnimatedObjects />
    </>
  )
}

export default Scene3D