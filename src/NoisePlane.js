import React, { Suspense, useRef, useMemo } from "react";

import { useLoader, useUpdate, useFrame, useThree } from 'react-three-fiber'

import * as THREE from "three";

import shaderMaterial from "./shadermaterial";


let rotation = Math.PI / 4;
let lineWidth = 0.4;
let repeat = 10;


function Text({
  children,
  mouseTarget,
  vAlign = "center",
  hAlign = "center",
  size = 1,
  color = "#000000",
  ...props
}) {
  const font = useLoader(THREE.FontLoader, "/bold.blob");
  const config = useMemo(
    () => ({
      font,
      size: 1.5,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: false,
    }),
    [font]
  );

  const planeRef = useRef();
  const {viewport} = useThree()

  useFrame(({ clock }) => {
    let time = clock.elapsedTime;
    //mesh.current.material.uniforms.time.value = time;
    planeRef.current.material.uniforms.time.value = time;
    //mesh.current.material.uniforms.rotation.value = rotation;
    //mesh.current.material.uniforms.lineWidth.value = lineWidth;
    //mesh.current.material.uniforms.repeat.value = repeat;
    //mesh.current.rotation.y = mouseTarget.current.x / 8
    //mesh.current.rotation.x = mouseTarget.current.y / 8
    planeRef.current.position.z = -1.2
    planeRef.current.material.uniforms.rotation.value = rotation;
    planeRef.current.material.uniforms.lineWidth.value = lineWidth;
    planeRef.current.material.uniforms.repeat.value = repeat;
  });

  const mesh = useUpdate(
    (self) => {
      const size = new THREE.Vector3();
      self.geometry.computeBoundingBox();
      self.geometry.boundingBox.getSize(size);
      self.position.x =
        hAlign === "center" ? -size.x / 2 : hAlign === "right" ? 0 : -size.x;
      self.position.y =
        vAlign === "center" ? -size.y / 2 : vAlign === "top" ? 0 : -size.y;
    },
    [children]
  );
  return (
    <group {...props} scale={[1, 1, 1]} >
    {/*   <mesh ref={mesh}
    
      >
        <textBufferGeometry
          attach="geometry"
 
          args={[children, config]}
        />
        <shaderMaterial attach="material" args={[shaderMaterial]} />
      </mesh> */}
      <mesh ref={planeRef}

      >
      <planeGeometry attach="geometry" args={[viewport.width -1, viewport.height - 1, 1, 1]}></planeGeometry>
      <shaderMaterial attach="material" args={[shaderMaterial]} />
    </mesh>
    </group>
  );
}





export default function NoisePlane(props) {
  const ref = useRef();
 

  return (

      <Text hAlign="center" mouseTarget={props.mouseTarget} position={[0, 0, 1]} children="MOKSHA" />
     

  );
}