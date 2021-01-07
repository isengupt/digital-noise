import React, { useRef } from 'react'
import { useFrame, useThree } from 'react-three-fiber'

import shaderMaterial from './shadermaterial3'



function Square(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(({ clock }) => {
    mesh.current.material.uniforms.time.value = clock.elapsedTime
    mesh.current.material.uniforms.mouse.value = Math.sin(clock.elapsedTime / 2);
  })

  const {viewport} = useThree()

  return (
    <mesh {...props} ref={mesh}>
      <planeGeometry attach="geometry" args={[viewport.width -1, viewport.height - 1, 1,1]}>
       
      </planeGeometry>
      <shaderMaterial attach="material" args={[shaderMaterial]} />
    </mesh>
  )
}

export default Square
