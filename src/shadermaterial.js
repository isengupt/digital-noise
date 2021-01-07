import * as THREE from "three";
import { fragment } from "./shaders/fragment";
import { vertex } from "./shaders/vertex";

const shaderMaterial = {
  uniforms: {
    time: { type: "f", value: 0 },
    lineWidth: { type: "f", value: 0 },
    rotation: { type: "f", value: 0 },
    repeat: { type: "f", value: 0 },
    resolution: { type: "v4", value: new THREE.Vector4() },
    uvRate1: {
      value: new THREE.Vector2(1, 1),
    },
  },
  extensions: {
    derivatives: "#extension GL_OES_standard_derivatives : enable",
  },
  side: THREE.DoubleSide,
  vertexShader: vertex,
  fragmentShader: fragment,
};

export default shaderMaterial;
