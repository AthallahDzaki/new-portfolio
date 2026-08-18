export const heroVertexShader = `
  precision highp float;

  uniform float uTime;
  uniform float uDistortion;
  uniform vec2 uPointer;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);

    // 100% Portable multi-frequency harmonic deformation waves
    float w1 = sin(position.x * 2.8 + uTime * 0.9) * cos(position.y * 2.8 + uTime * 0.7);
    float w2 = sin(position.z * 3.2 + uTime * 0.8) * cos(position.x * 3.2 + uTime * 0.6);
    float w3 = sin((position.x + position.y + position.z) * 2.2 + uTime * 0.5);

    float noise = (w1 + w2 + w3) * 0.3333;
    float displacement = noise * uDistortion * 0.38;
    vDisplacement = displacement;

    vec3 newPosition = position + normal * displacement;
    vPosition = newPosition;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

export const heroFragmentShader = `
  precision highp float;

  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uAccentColor;
  uniform float uTime;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  void main() {
    // Fresnel calculation
    vec3 viewDirection = normalize(-vPosition);
    float fresnel = dot(viewDirection, vNormal);
    fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
    fresnel = pow(fresnel, 2.5);

    // Color gradient mixing
    vec3 baseColor = mix(uColorA, uColorB, vDisplacement + 0.5);
    vec3 finalColor = mix(baseColor, uAccentColor, fresnel * 0.85);

    // Subtle ambient rim light
    finalColor += uAccentColor * fresnel * 0.4;

    gl_FragColor = vec4(finalColor, 0.92);
  }
`;
