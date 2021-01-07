import ReactDOM from "react-dom"
import React, { Suspense, useEffect, useRef, useMemo } from "react"
import { Canvas, useLoader, useFrame, useThree } from "react-three-fiber"
import { Html } from "drei"
import { TextureLoader, LinearFilter } from "three"
import lerp from "lerp"
import NoiseText from "./Text"
import FadingImage from './FadingImage'
import { Text, MultilineText } from "./components/Text"
import Basic from "./Basic"
import Basic1 from "./Basic1"
import Basic2 from "./Basic2"
import Basic3 from "./Basic3"
import img1 from "./img/img1.jpg";
import img2 from "./img/img2.jpg";
import Plane from "./components/Plane"

import Ico, { Outline, Effect } from "./ico/Ico"

import { Block, useBlock } from "./blocks"
import state from "./store"
import "./styles.css"

import NoisePlane from "./NoisePlane"

function Startup() {
  const ref = useRef()
  useFrame(() => (ref.current.material.opacity = lerp(ref.current.material.opacity, 0, 0.025)))
  return <Plane ref={ref} color="#0e0e0f" position={[0, 0, 200]} scale={[100, 100, 1]} />
}

function Paragraph({ image, index, offset, factor, header, aspect, text }) {
  const { contentMaxWidth: w, canvasWidth, margin, mobile } = useBlock()
  const size = aspect < 1 && !mobile ? 0.65 : 1
  const alignRight = (canvasWidth - w * size - margin) / 2
  const pixelWidth = w * state.zoom * size
  const left = !(index % 2)
  const color = index % 2 ? "#D40749" : "#2FE8C3"
  return (
    <Block factor={factor} offset={offset}>
      <group position={[left ? -alignRight : alignRight, 0, 0]}>
        <Html
          style={{ width: pixelWidth / (mobile ? 1 : 2), textAlign: left ? "left" : "right" }}
          position={[left || mobile ? (-w * size) / 2 : 0, (-w * size) / 2 / aspect - 0.4, 1]}>
          <div tabIndex={index}>{text}</div>
        </Html>

        <Basic position={[left ? -alignRight : alignRight, 0, 0]} image={image}/>
      </group>
    </Block>
  )
}

function Content({ mouseTarget, mouseMoved, mouse }) {
  const images = useLoader(
    TextureLoader,
    state.paragraphs.map(({ image }) => image)
  )

  useMemo(() => images.forEach((texture) => (texture.minFilter = LinearFilter)), [images])
  const { contentMaxWidth: w, canvasWidth, canvasHeight, mobile } = useBlock()
  return (
    <>
      <Block factor={1} offset={0}>
        <Block factor={1.2}>
          <NoisePlane mouseTarget={mouseTarget} />
        </Block>
        <Block factor={-2}>
          <NoiseText hAlign="center" position={[0, 0, 1]} children="WELCOME" mouseTarget={mouseTarget} />
        </Block>
      </Block>
      <Block factor={-1.1} offset={1.0}>
        <Basic2 image={img1} />
      </Block>

      <Block factor={-1.1} offset={2.0}>
        <Basic3 image={img2} />
      </Block>
      {state.paragraphs.map((props, index) => (
        <Paragraph key={index} index={index} {...props} image={props.image} />
      ))}

      <Block factor={1.0} offset={3.0}>
      <FadingImage />
      </Block>

      <Block factor={1.25} offset={3.0}>
        <Ico position={[0, 0, 0]} />
        <Effect />
        <Outline position={[0, 0, 0]} />
        <Html className="bottom-left" position={[-canvasWidth / 2, -canvasHeight / 2, 0]}>
        It is a long established fact that a reader 
        </Html>
      </Block>
    </>
  )
}

function App() {
  //const [mouseTarget, setMouseTarget] = React.useState({ x: 0, y: 0 })
  //const [mouse, setMouse] = React.useState({ x: 0, y: 0 })

  const mouse = useRef({ x: 0, y: 0 })
  const mouseTarget = useRef({ x: 0, y: 0 })
  const scrollArea = useRef()
  var frustumSize = 3
  const onScroll = (e) => (state.top.current = e.target.scrollTop)
  useEffect(() => void onScroll({ target: scrollArea.current }), [])

  /* function mouseMoved(e) {
    //console.log('movde')
    //mouse.current ={ x: 2 * (e.pageX / window.innerWidth - 0.5), y: 2 * (e.pageY / window.innerHeight - 0.5) }

    //mouseTarget.current =  { x: mouseTarget.current.x - 0.1 * (mouseTarget.current.x - mouse.current.x), y: mouseTarget.current.y - 0.1 * (mouseTarget.current.y - mouse.current.y) }
  } */
  function mouseMoved(e) {
    //console.log('movde')
    mouse.current.x = 2 * (e.pageX / window.innerWidth - 0.5)
    mouse.current.y = 2 * (e.pageY / window.innerHeight - 0.5)
    // setMouse({ x: 2 * (e.pageX / window.innerWidth - 0.5), y: 2 * (e.pageY / window.innerHeight - 0.5) })
    mouseTarget.current.x = mouseTarget.current.x - 0.1 * (mouseTarget.current.x - mouse.current.x)
    mouseTarget.current.y = mouseTarget.current.y - 0.1 * (mouseTarget.current.y - mouse.current.y)

    // setMouseTarget((e) => ({ x: e.x - 0.1 * (e.x - mouse.current.x), y: e.y - 0.1 * (e.y - mouse.current.y) }))
  }
  return (
    <div className="container" onMouseMove={(e) => mouseMoved(e)}>
      <Canvas colorManagement={false} orthographic camera={{ zoom: state.zoom, position: [0, 0, 500] }}>
        <Suspense fallback={<Html center className="loading" children="Loading..." />}>
          <Content mouseMoved={mouseMoved} mouseTarget={mouseTarget} mouse={mouse} />

          <Startup />
       
        </Suspense>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        {new Array(state.sections).fill().map((_, index) => (
          <div key={index} id={"0" + index} style={{ height: `${(state.pages / state.sections) * 100}vh` }} />
        ))}
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
