import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene3D from './components/Scene3D'
import ConfigForm from './components/ConfigForm'
import LoadingScreen from './components/LoadingScreen'

function App({ sceneData }) {
  const parsedSceneData = sceneData ? JSON.parse(sceneData) : null

  if (!parsedSceneData) {
    return <ConfigForm />
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        camera={{ 
          position: [0, 5, 5], 
          fov: 60,
          near: 0.1,
          far: 1000 
        }}
        shadows
        gl={{ 
          antialias: true,
          shadowMap: true 
        }}
      >
        <Suspense fallback={null}>
          <Scene3D sceneData={parsedSceneData} />
        </Suspense>
      </Canvas>
      <LoadingScreen />
    </div>
  )
}

export default App