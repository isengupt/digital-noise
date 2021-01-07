import * as THREE from "three";
import { fragment2 } from "./shaders1/fragment2";
import { vertex } from "./shaders1/vertex";
import img1 from "./img/img2.jpg";
import img2 from "./img/img2.jpg";
import img3 from "./img/img3.jpg";
import disp from "./img/disp3.jpg";
import text from "./img/text.png";
const shaderMaterial = {
  extensions: {
    derivatives: "#extension GL_OES_standard_derivatives : enable",
  },
  side: THREE.DoubleSide,
  uniforms: {
    time: { type: "f", value: 0 },
    progress: { type: "f", value: 0 },
    mouse: {type: 'v3', value: new THREE.Vector3()},
    image: { type: "t", value: new THREE.TextureLoader().load(img1) },
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
  fragmentShader: fragment2,
};

export default shaderMaterial;
