export var vertex1 = `
uniform float time;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 eyeVector;
attribute vec3 aBary;
varying vec3 vBary;
float PI = 3.141592653589793238;
void main() {
  vUv = uv;
  vBary = aBary;
  vNormal = normalize(normalMatrix*normal);
vec3 newPosition = position;
  vec4 worldPosition = modelMatrix  * vec4(newPosition, 1.0);
  eyeVector = normalize(worldPosition.xyz - cameraPosition);
  //vec3 newPosition = position + vec3( sin((time + uv.x + uv.y) * 10.0) * 0.2,cos((time + uv.x + uv.y) * 10.0) *0.2,0);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}
`