'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Smooth noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;

    // Create flowing gradient effect
    float noise1 = snoise(uv * 3.0 + uTime * 0.1);
    float noise2 = snoise(uv * 2.0 - uTime * 0.15);
    float noise3 = snoise(uv * 4.0 + vec2(uTime * 0.2, -uTime * 0.1));

    // Combine noise for complex pattern
    float pattern = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;

    // Create gradient base colors - deep blue to purple to cyan
    vec3 color1 = vec3(0.05, 0.1, 0.25); // Deep blue
    vec3 color2 = vec3(0.15, 0.05, 0.35); // Purple
    vec3 color3 = vec3(0.0, 0.3, 0.4); // Cyan
    vec3 color4 = vec3(0.1, 0.15, 0.3); // Mid blue

    // Mix colors based on position and noise
    vec3 finalColor = mix(color1, color2, uv.y + pattern * 0.3);
    finalColor = mix(finalColor, color3, sin(uv.x * 2.0 + uTime * 0.1) * 0.3 + 0.3);
    finalColor = mix(finalColor, color4, noise2 * 0.2 + 0.2);

    // Add some brightness variation
    float brightness = 1.0 + pattern * 0.2;
    finalColor *= brightness;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function ShaderMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} scale={[1, 1, 1]}>
      <planeGeometry args={[10, 10, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function ShaderBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ShaderMesh />
      </Canvas>
    </div>
  );
}
