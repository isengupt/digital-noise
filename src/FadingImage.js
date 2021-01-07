import * as THREE from "three"
import React, { Suspense, useRef, useState } from "react"
import { Canvas, useFrame, useLoader, useThree } from "react-three-fiber"
import img1 from "./img/Img4.jpg"
import img2 from "./img/Img5.jpg"
import disp from "./img/displacement/10.jpg"
import "./ImageFadeMaterial"

function FadingImage() {
  const ref = useRef()
  const [texture1, texture2, dispTexture] = useLoader(THREE.TextureLoader, [img1, img2, disp])
  const [hovered, setHover] = useState(false)
  const {viewport} = useThree()

  useFrame(({ clock }) => {
   
    ref.current.dispFactor = Math.sin(clock.elapsedTime/6);
  });
  //useFrame(() => (ref.current.dispFactor = THREE.MathUtils.lerp(ref.current.dispFactor, hovered ? 1 : 0, 0.1)))
  return (
    <mesh
    
    
     onPointerMove={(e) => setHover(true)} onPointerOut={(e) => setHover(false)} scale={[1, 1, 1]}>
      <planeBufferGeometry attach="geometry" args={[viewport.width - 1 , viewport.height -1 , 1,1]} />
      <imageFadeMaterial ref={ref} attach="material" tex={texture1} tex2={texture2} disp={dispTexture} />
    </mesh>
  )
}

export default FadingImage;