export const playgroundVertexShader = `
  uniform float uTime;
  uniform float uDistortion;
  uniform float uSpeed;
  uniform float uPulse;
  uniform float uExplode;
  uniform vec2 uPointer;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying float vDisplacement;

  // Simplex Noise 3D
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0);
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z.xxxx);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);

    // Dynamic procedural noise displacement
    float noise = snoise(position * 1.8 + vec3(uTime * 0.4));
    float pulse = sin(uTime * 4.0) * uPulse * 0.15;
    float displacement = (noise * uDistortion * 0.5) + pulse;
    vDisplacement = displacement;

    // Explode offset along normal
    vec3 explodedPos = position + normal * (displacement + uExplode * 0.8);
    vPosition = explodedPos;
    vWorldPosition = (modelMatrix * vec4(explodedPos, 1.0)).xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(explodedPos, 1.0);
  }
`;

export const playgroundFragmentShader = `
  uniform vec3 uAccentColor;
  uniform vec3 uSecondaryColor;
  uniform float uTime;
  uniform float uDistortion;
  uniform int uShaderMode; // 0: Holographic, 1: RGB Normals, 2: Cyber Grid, 3: Metallic Chrome
  uniform float uWireframeGlow;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying float vDisplacement;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float fresnel = 1.0 - max(dot(viewDir, vNormal), 0.0);
    fresnel = pow(fresnel, 2.0);

    vec3 finalColor = vec3(0.0);

    if (uShaderMode == 0) {
      // 0: HOLOGRAPHIC IRIDESCENT (Crisp, highly visible glowing glass)
      vec3 irid = 0.5 + 0.5 * cos(uTime * 0.8 + vPosition.xyx + vec3(0.0, 2.0, 4.0));
      vec3 base = mix(uAccentColor * 0.35, uSecondaryColor * 0.6, vDisplacement + 0.5);
      finalColor = mix(base, irid, fresnel * 0.65);
      finalColor += uAccentColor * fresnel * 1.2;
      // High-tech inner light
      finalColor += vec3(0.12, 0.12, 0.18) * (1.0 - fresnel);
    } 
    else if (uShaderMode == 1) {
      // 1: RGB CYBER NORMALS (Vibrant colorful surface topology)
      vec3 normalColor = normalize(vNormal) * 0.5 + 0.5;
      finalColor = mix(normalColor, uAccentColor, fresnel * 0.5);
      finalColor += uAccentColor * fresnel * 0.8;
    }
    else if (uShaderMode == 2) {
      // 2: CYBER GRID / MATRIX SCANLINE
      float scanline = sin((vPosition.y + uTime * 0.5) * 25.0) * 0.5 + 0.5;
      scanline = pow(scanline, 4.0);
      vec3 gridColor = uAccentColor * (0.3 + scanline * 0.8);
      gridColor += uSecondaryColor * fresnel * 1.5;
      finalColor = gridColor;
    }
    else {
      // 3: METALLIC LIQUID CHROME (High-contrast reflections)
      vec3 reflected = reflect(-viewDir, vNormal);
      float spec = pow(max(dot(reflected, vec3(0.0, 1.0, 0.5)), 0.0), 16.0);
      vec3 chrome = vec3(0.25, 0.28, 0.35) + spec * vec3(1.2);
      finalColor = mix(chrome, uAccentColor, fresnel * 0.9);
      finalColor += uAccentColor * spec * 0.8;
    }

    // Add glowing ambient rim emission
    finalColor += uAccentColor * 0.18;

    gl_FragColor = vec4(finalColor, 0.95);
  }
`;
