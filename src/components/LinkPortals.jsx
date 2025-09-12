import React from 'react'
import { Text, Center, Float } from '@react-three/drei'
import * as THREE from 'three'

function LinkPortal({ url, title, position, onClick }) {
  const handleClick = () => {
    // Fade out and redirect
    const canvas = document.querySelector('canvas')
    if (canvas) {
      canvas.style.transition = 'opacity 1s ease-in'
      canvas.style.opacity = '0.01'
    }
    setTimeout(() => {
      window.location.href = url
    }, 500)
  }

  return (
    <group position={position}>
      {/* Rotating indicator */}
      <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
        <mesh 
          position={[0, 3, 0]} 
          onClick={handleClick}
          onPointerOver={(e) => (document.body.style.cursor = 'pointer')}
          onPointerOut={(e) => (document.body.style.cursor = 'auto')}
          castShadow
        >
          <icosahedronGeometry args={[0.8]} />
          <meshStandardMaterial 
            color="#dd1111" 
            roughness={0.1} 
            metalness={0.6}
            emissive="#440000"
          />
        </mesh>
      </Float>

      {/* Text label */}
      <Center position={[0, 1, 0]}>
        <Float speed={1} rotationIntensity={0} floatIntensity={0.3}>
          <Text
            fontSize={0.8}
            color="#dd0000"
            anchorX="center"
            anchorY="middle"
            onClick={handleClick}
            onPointerOver={(e) => (document.body.style.cursor = 'pointer')}
            onPointerOut={(e) => (document.body.style.cursor = 'auto')}
          >
            {title}
          </Text>
        </Float>
      </Center>
    </group>
  )
}

function LinkPortals({ urls }) {
  const numberOfUrls = urls.length
  const angleInterval = (2 * Math.PI) / numberOfUrls

  return (
    <>
      {urls.map((url, index) => {
        const angle = index * angleInterval
        const position = [
          Math.sin(angle) * 25,
          2,
          Math.cos(angle) * 25
        ]

        return (
          <LinkPortal
            key={index}
            url={url.url}
            title={url.title}
            position={position}
          />
        )
      })}
    </>
  )
}

export default LinkPortals