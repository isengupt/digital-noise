
import React, { useRef } from 'react'
import { useFrame } from 'react-three-fiber'

import shaderMaterial from './shadermaterial'

let rotation = Math.PI / 4;
let lineWidth = 0.4;
let repeat = 10;

function Square(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(({ clock }) => {
    mesh.current.material.uniforms.time.value = clock.elapsedTime
    mesh.current.material.uniforms.rotation.value = rotation;
    mesh.current.material.uniforms.lineWidth.value = lineWidth;
    mesh.current.material.uniforms.repeat.value = repeat;
  })

  return (
    <mesh {...props} ref={mesh}>
      <planeGeometry attach="geometry" args={[10, 10, 1,1]}>

      </planeGeometry>
      <shaderMaterial attach="material" args={[shaderMaterial]} />
    </mesh>
  )
}

export default Square