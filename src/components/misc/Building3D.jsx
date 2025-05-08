import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './Building3D.css';

const Building3D = () => {
  const mountRef = useRef(null);
  
  useEffect(() => {
    // Only run once the DOM element is available
    if (!mountRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf9f9f9);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      mountRef.current.clientWidth / mountRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(8, 4, 8);
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);
    
    // Add controls - IMPORTANT FOR INTERACTIVITY
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.target.set(0, 0, 0);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.far = 20;
    directionalLight.shadow.mapSize.set(2048, 2048);
    scene.add(directionalLight);
    
    // Create building materials with better textures
    const buildingMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x996515, 
      metalness: 0.7, 
      roughness: 0.3,
      envMapIntensity: 1.0
    });
    
    const baseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x7c7c7c,
      roughness: 0.8
    });
    
    const windowMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x87CEEB, 
      metalness: 0.9, 
      roughness: 0.1,
      transparent: true,
      opacity: 0.8
    });
    
    const roofMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xD4AF37,
      metalness: 0.8,
      roughness: 0.2
    });
    
    // Create building parts
    // Base foundation
    const baseGeometry = new THREE.BoxGeometry(4, 0.5, 4);
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -2;
    base.receiveShadow = true;
    scene.add(base);
    
    // Main building
    const buildingGeometry = new THREE.BoxGeometry(3, 4, 3);
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    building.castShadow = true;
    building.receiveShadow = true;
    scene.add(building);
    
    // Windows (front side)
    const windowGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.1);
    
    // Row 1
    const windowPositions = [
      [-1, 0.5, 1.5],
      [0, 0.5, 1.5],
      [1, 0.5, 1.5],
      [-1, -0.5, 1.5],
      [0, -0.5, 1.5],
      [1, -0.5, 1.5]
    ];
    
    windowPositions.forEach(position => {
      const window = new THREE.Mesh(windowGeometry, windowMaterial);
      window.position.set(...position);
      window.castShadow = true;
      scene.add(window);
    });
    
    // Add windows to other sides
    // Back side
    windowPositions.forEach(position => {
      const window = new THREE.Mesh(windowGeometry, windowMaterial);
      window.position.set(position[0], position[1], -1.5);
      window.castShadow = true;
      scene.add(window);
    });
    
    // Left side
    const leftWindowPositions = [
      [-1.5, 0.5, -1],
      [-1.5, 0.5, 0],
      [-1.5, 0.5, 1],
      [-1.5, -0.5, -1],
      [-1.5, -0.5, 0],
      [-1.5, -0.5, 1]
    ];
    
    leftWindowPositions.forEach(position => {
      const window = new THREE.Mesh(windowGeometry, windowMaterial);
      window.position.set(...position);
      window.rotation.y = Math.PI / 2;
      window.castShadow = true;
      scene.add(window);
    });
    
    // Right side
    const rightWindowPositions = [
      [1.5, 0.5, -1],
      [1.5, 0.5, 0],
      [1.5, 0.5, 1],
      [1.5, -0.5, -1],
      [1.5, -0.5, 0],
      [1.5, -0.5, 1]
    ];
    
    rightWindowPositions.forEach(position => {
      const window = new THREE.Mesh(windowGeometry, windowMaterial);
      window.position.set(...position);
      window.rotation.y = Math.PI / 2;
      window.castShadow = true;
      scene.add(window);
    });
    
    // Roof
    const roofGeometry = new THREE.BoxGeometry(3.5, 0.3, 3.5);
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 2;
    roof.castShadow = true;
    scene.add(roof);
    
    // Add a simple animation to make the building more interesting
    const rotateBuilding = () => {
      scene.rotation.y += 0.002;
    };
    
    // CRITICAL: Animation/Render loop - this makes it interactive!
    function animate() {
      requestAnimationFrame(animate);
      rotateBuilding(); // Add gentle rotation
      controls.update(); // Required for damping and auto-rotation
      renderer.render(scene, camera);
    }
    
    // Start the animation loop
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);
  
  return (
    <div className="building3d-container">
      <div className="building3d-header">
        <h2>Experience Our Gold Plaza Tower in 3D</h2>
        <p>Explore our newest luxury property with state-of-the-art facilities and premium location</p>
      </div>
      <div className="building3d-wrapper">
        <div className="building3d-canvas" ref={mountRef}></div>
        <div className="building3d-instructions">
          Click and drag to rotate • Scroll to zoom • Right-click and drag to pan
        </div>
      </div>
    </div>
  );
};

export default Building3D;