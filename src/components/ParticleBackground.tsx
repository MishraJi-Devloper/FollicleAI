/**
 * Three.js Particle Background Component
 * Subtle, professional background animation
 * LIGHTWEIGHT: Minimal performance impact
 */

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../theme/ThemeContext';
import './ParticleBackground.css';

export const ParticleBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Create particles
    const particleCount = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 200;
      positions[i + 1] = (Math.random() - 0.5) * 200;
      positions[i + 2] = (Math.random() - 0.5) * 200;

      velocities[i] = (Math.random() - 0.5) * 0.5;
      velocities[i + 1] = (Math.random() - 0.5) * 0.5;
      velocities[i + 2] = (Math.random() - 0.5) * 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Material - responsive to dark mode
    const material = new THREE.PointsMaterial({
      color: isDark ? 0x60a5fa : 0x3b82f6,
      size: 0.5,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.4,
      fog: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;
    particlesRef.current = particles;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update particle positions (very slow movement)
      const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute;
      const positions = positionAttribute.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i] * 0.01;
        positions[i + 1] += velocities[i + 1] * 0.01;
        positions[i + 2] += velocities[i + 2] * 0.01;

        // Wrap around
        if (positions[i] > 100) positions[i] = -100;
        if (positions[i] < -100) positions[i] = 100;
        if (positions[i + 1] > 100) positions[i + 1] = -100;
        if (positions[i + 1] < -100) positions[i + 1] = 100;
      }

      positionAttribute.needsUpdate = true;

      // Subtle rotation
      particles.rotation.x += 0.0001;
      particles.rotation.y += 0.0002;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  // Update color on theme change
  useEffect(() => {
    if (particlesRef.current && particlesRef.current.material instanceof THREE.PointsMaterial) {
      const material = particlesRef.current.material;
      material.color.setHex(isDark ? 0x60a5fa : 0x3b82f6);
      material.opacity = isDark ? 0.3 : 0.2;
    }
  }, [isDark]);

  return <div ref={containerRef} className="particle-background" />;
};
