import React, { useRef } from 'react'
import { useFrame, useThree } from 'react-three-fiber'

import shaderMaterial from './shadermaterial2'
import * as THREE from "three"
import { fragment1 } from "./shaders1/fragment1";
import { vertex } from "./shaders1/vertex";
import img1 from "./img/img2.jpg";
import img2 from "./img/img2.jpg";
import img3 from "./img/img3.jpg";
import disp from "./img/disp3.jpg";
import text from "./img/text.png";

function Square(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(({ clock }) => {
    mesh.current.material.uniforms.time.value = clock.elapsedTime
    mesh.current.material.uniforms.progress.value = Math.sin(clock.elapsedTime / 2);
  })

  const {viewport} = useThree()

  return (
    <mesh {...props} ref={mesh}>
      <planeGeometry attach="geometry" args={[viewport.width -1, viewport.height - 1, 1,1]}>
       
      </planeGeometry>
      <shaderMaterial attach="material" args={[
{
  extensions: {
    derivatives: "#extension GL_OES_standard_derivatives : enable",
  },
  side: THREE.DoubleSide,
  uniforms: {
    time: { type: "f", value: 0 },
    progress: { type: "f", value: 0 },
    mouse: {type: 'v3', value: new THREE.Vector3()},
    image: { type: "t", value: new THREE.TextureLoader().load(props.image) },
    text: { type: "t", value: new THREE.TextureLoader().load(text) },
    displacement: {
      type: "t",
      value: new THREE.TextureLoader().load(disp),
    },
    resolution: { type: "v4", value: new THREE.Vector4() },
    uvRate1: {
      value: new THREE.Vector2(1, 1),
    },
  },
  vertexShader: vertex,
  fragmentShader: fragment1,
}


      ]} />
    </mesh>
  )
}

export default Square
