import * as THREE from 'three'
import React, { useMemo } from 'react'
import { useLoader, useUpdate, useFrame } from 'react-three-fiber'
import shaderMaterial from './shadermaterial'
let rotation = Math.PI / 4;
let lineWidth = 0.4;
let repeat = 10;
export default function Text({ 
  
  mouseTarget,
  children, vAlign = 'center', hAlign = 'center', size = 1, color = '#000000', ...props }) {
  const font = useLoader(THREE.FontLoader, '/bold.blob')
  const config = useMemo(
    () => ({ font, 
      size: 1.3,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: false,
    }),
    [font]
  )

  useFrame(({ clock }) => {
    mesh.current.material.uniforms.time.value = clock.elapsedTime 
    mesh.current.material.uniforms.rotation.value = rotation;
    mesh.current.material.uniforms.lineWidth.value = lineWidth;
    mesh.current.material.uniforms.repeat.value = repeat;
    mesh.current.rotation.y = -mouseTarget.current.x / 4
    mesh.current.rotation.x = mouseTarget.current.y / 4
  })

  const mesh = useUpdate(
    (self) => {
      const size = new THREE.Vector3()
      self.geometry.computeBoundingBox()
      self.geometry.boundingBox.getSize(size)
      self.position.x = hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
      self.position.y = vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y
    },
    [children]
  )
  return (
    <group {...props} scale={[1,1,1]}
       translate={[-1.5,-0.5,-0.2]}
    >
      <mesh ref={mesh}>
        <textBufferGeometry attach="geometry" 
        translate={[-1.5,-0.5,-0.2]}
        args={[children, config]} />
        <shaderMaterial attach="material" args={[shaderMaterial]} />
      </mesh>
    </group>
  )
}
