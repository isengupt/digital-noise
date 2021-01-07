import React, { useRef, useEffect, useMemo } from "react";
import { useFrame, extend, useThree } from "react-three-fiber";
import * as THREE from "three";
import material from "./material";
import material1 from "./material1";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { PostProcessing } from "./postprocessing";

extend({ EffectComposer, RenderPass, ShaderPass });

export function Effect(props) {
  const composer = useRef();
  const mesh = useRef();
  const { scene, gl, size, camera } = useThree();
  const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), []);
  useEffect(() => void composer.current.setSize(size.width, size.height), [
    size,
  ]);

  useFrame(({ clock }) => {

    mesh.current.material.uniforms.time.value = clock.elapsedTime;
  });
  useFrame(() => composer.current.render(), 1);
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <shaderPass
      ref={mesh}
       attachArray="passes" args={[PostProcessing]} />
    </effectComposer>
  );
}

let geometry1 = new THREE.IcosahedronBufferGeometry(1, 1);
let length = geometry1.attributes.position.array.length;
let bary = [];

for (let i = 0; i < length / 3; i++) {
  bary.push(0, 0, 1, 0, 1, 0, 1, 0, 0);
}
let aBary = new Float32Array(bary);
export function Outline(props) {
  const mesh = useRef();

  useFrame(({ clock }) => {
    mesh.current.rotation.x = clock.elapsedTime / 10;
    mesh.current.rotation.y = clock.elapsedTime / 10;
    mesh.current.material.uniforms.time.value = clock.elapsedTime;
  });
  return (
    <mesh {...props} ref={mesh}>
      <icosahedronBufferGeometry attach="geometry" args={[2.001, 2]}>
        <bufferAttribute
          attachObject={["attributes", "aBary"]}
          args={[aBary, 3]}
        />

        {/* <bufferAttribute attachObject={['attributes', 'count']} args={[count, 1]} /> */}
      </icosahedronBufferGeometry>
      <shaderMaterial attach="material" args={[material1]} />
    </mesh>
  );
}

function Ico(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(({ clock }) => {
    mesh.current.rotation.x = clock.elapsedTime / 10;
    mesh.current.rotation.y = clock.elapsedTime / 10;
    //mesh.current.position.x = Math.sin(clock.elapsedTime / 10)
    mesh.current.material.uniforms.time.value = clock.elapsedTime;
  });

  return (
    <mesh {...props} ref={mesh}>
      <icosahedronGeometry attach="geometry" args={[2, 2]}>
        {/* <bufferAttribute attachObject={['attributes', 'count']} args={[count, 1]} /> */}
      </icosahedronGeometry>
      <shaderMaterial attach="material" args={[material]} />
    </mesh>
  );
}

export default Ico;
