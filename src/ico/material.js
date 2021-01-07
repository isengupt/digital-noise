import { fragment } from "../shaders/ico/fragment";
import { vertex } from "../shaders/ico/vertex";
import * as THREE from "three";
import img1 from "./img/img1.jpg";
let t = new THREE.TextureLoader().load(img1)

t.wrapS = t.wrapT = THREE.MirroredRepeatWrapping;
const material = {
  fragmentShader: fragment,
  vertexShader: vertex,
  extensions: {
    derivatives: "#extension GL_OES_standard_derivatives: enable",
  },
  uniforms: {
    time: { type: "f", value: 0 },
    uvRate1: {
      value: new THREE.Vector2(1,1)
    },
    resolution: {type: 'v4', value: new THREE.Vector4()},
    landscape: {value:  t }
  },
  //wireframe: true,

};

export default material;
