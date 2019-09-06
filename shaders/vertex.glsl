
precision mediump float;

// uniform mat4 projectionMatrix;
// uniform mat4 modelViewMatrix;

// attribute vec3 position;
// attribute vec3 normal;

varying float vReflectionFactor;
varying float backCull;


void main() {

	// vUv = position;
	// vNormal = projectionMatrix * modelViewMatrix * vec4(normal, 1.0);
	// vPosition = vec4(position, 1.0);


	// gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );

  vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );

  vec3 I = worldPosition.xyz - cameraPosition;

//   vReflectionFactor = 0.1 + 1.0 * pow( 1.0 + dot( normalize( I ), worldNormal ), 2.0 );
	vReflectionFactor = -dot( normalize( I ), worldNormal);
	backCull = step(-0.05, vReflectionFactor);

  gl_Position = projectionMatrix * mvPosition;
}
