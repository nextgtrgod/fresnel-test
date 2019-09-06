
precision mediump float;

varying float vReflectionFactor;
varying float backCull;

void main() {

	// vec3 normal = vec3(vNormal.x, vNormal.y, 1.0);
	// normal = normalize(clamp(normal, 0.0, 1.0));

	// vec3 direction = normalize(worldDirection);
	// float dot_dn = clamp(-dot(direction, normal), 0.0, 1.0);
	// dot_dn = pow(dot_dn, 2.0);

	// gl_FragColor = vec4(vec3(normal), 1.0);

//gl_FragColor = vec4(direction, 1.0);
float r = pow(clamp(1.0 - vReflectionFactor, 0.0, 1.0), 6.0);
float b = clamp(backCull, 0.0, 1.0);
gl_FragColor = vec4(vec3(0.0), backCull * r);
}
