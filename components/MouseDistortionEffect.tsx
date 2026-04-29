'use client';

import { useEffect, useRef } from 'react';
import CollectibleVase from './CollectibleVase';

export default function MouseDistortionEffect() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dynamically load Three.js
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r152/three.min.js';
    script.async = true;

    script.onload = () => {
      const THREE = (window as any).THREE;
      if (!THREE) return;

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(
        window.innerWidth / -2,
        window.innerWidth / 2,
        window.innerHeight / 2,
        window.innerHeight / -2,
        1,
        1000
      );
      camera.position.z = 1;

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      containerRef.current?.appendChild(renderer.domElement);

      // Load image
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load('https://picsum.photos/1200/800?random=' + Math.random());

      // Uniforms
      const uniforms = {
        uTexture: { value: texture },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uTime: { value: 0 },
      };

      // Shader material
      const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D uTexture;
          uniform vec2 uMouse;
          uniform float uTime;
          varying vec2 vUv;

          void main() {
            vec2 uv = vUv;

            // distance from mouse
            float dist = distance(uv, uMouse);

            // distortion strength
            float strength = 0.15 * exp(-10.0 * dist);

            // ripple effect
            uv += (uv - uMouse) * strength;

            vec4 color = texture2D(uTexture, uv);

            gl_FragColor = color;
          }
        `,
      });

      // Plane covering screen
      const geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Mouse tracking
      const handleMouseMove = (e: MouseEvent) => {
        uniforms.uMouse.value.x = e.clientX / window.innerWidth;
        uniforms.uMouse.value.y = 1.0 - e.clientY / window.innerHeight;
      };

      // Resize
      const handleResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.left = window.innerWidth / -2;
        camera.right = window.innerWidth / 2;
        camera.top = window.innerHeight / 2;
        camera.bottom = window.innerHeight / -2;
        camera.updateProjectionMatrix();
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);

      // Animation loop
      let animationFrameId: number;
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        uniforms.uTime.value += 0.01;
        renderer.render(scene, camera);
      };
      animate();

      // Cleanup
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        containerRef.current?.removeChild(renderer.domElement);
      };
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div ref={containerRef} className="h-full w-full" />
      <CollectibleVase
        id="distortion-vase"
        size={36}
        className="bottom-[16%] left-[17%] rotate-[9deg]"
      />
    </div>
  );
}
