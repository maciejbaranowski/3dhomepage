import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function RotatingCrystal({ position }) {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <icosahedronGeometry args={[0.5]} />
      <meshStandardMaterial 
        color="#4a9eff" 
        transparent 
        opacity={0.8}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  )
}

function FloatingPlane() {
  const meshRef = useRef()
  const radiusRef = useRef(50)
  const angleRef = useRef(0)

  useFrame((state, delta) => {
    if (meshRef.current) {
      angleRef.current += delta * 0.3
      meshRef.current.position.x = radiusRef.current * Math.cos(angleRef.current)
      meshRef.current.position.z = radiusRef.current * Math.sin(angleRef.current)
      meshRef.current.position.y = 15 + Math.sin(angleRef.current * 2) * 2
      meshRef.current.rotation.y = Math.PI - angleRef.current
    }
  })

  return (
    <mesh ref={meshRef} castShadow>
      <boxGeometry args={[2, 0.2, 4]} />
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  )
}

function BouncingRabbit() {
  const meshRef = useRef()
  const bounceRef = useRef(0)
  const directionRef = useRef(new THREE.Vector3(1, 0, 1).normalize())
  const positionRef = useRef(new THREE.Vector3(0, 0, 0))

  useFrame((state, delta) => {
    if (meshRef.current) {
      bounceRef.current += delta * 8
      
      // Bouncing motion
      const bounceHeight = Math.abs(Math.sin(bounceRef.current)) * 1.5
      
      // Random direction change occasionally
      if (Math.random() < 0.01) {
        directionRef.current.set(
          (Math.random() - 0.5) * 2,
          0,
          (Math.random() - 0.5) * 2
        ).normalize()
      }
      
      // Move forward
      positionRef.current.add(directionRef.current.clone().multiplyScalar(delta * 2))
      
      // Keep within bounds
      if (Math.abs(positionRef.current.x) > 25) {
        directionRef.current.x *= -1
        positionRef.current.x = Math.sign(positionRef.current.x) * 25
      }
      if (Math.abs(positionRef.current.z) > 25) {
        directionRef.current.z *= -1
        positionRef.current.z = Math.sign(positionRef.current.z) * 25
      }
      
      meshRef.current.position.set(
        positionRef.current.x,
        bounceHeight,
        positionRef.current.z
      )
      
      // Face movement direction
      meshRef.current.lookAt(
        positionRef.current.x + directionRef.current.x,
        bounceHeight,
        positionRef.current.z + directionRef.current.z
      )
    }
  })

  return (
    <mesh ref={meshRef} castShadow>
      <capsuleGeometry args={[0.3, 0.6]} />
      <meshStandardMaterial color="#ff69b4" />
    </mesh>
  )
}

function AnimatedObjects() {
  return (
    <>
      <RotatingCrystal position={[10, 2, 10]} />
      <RotatingCrystal position={[-10, 2, -10]} />
      <RotatingCrystal position={[15, 2, -15]} />
      <FloatingPlane />
      <BouncingRabbit />
    </>
  )
}

export default AnimatedObjects