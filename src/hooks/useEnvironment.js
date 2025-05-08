import { useEffect } from 'react';
import * as THREE from 'three';

const useEnvironment = (sceneObjects) => {
  useEffect(() => {
    if (!sceneObjects) return;
    
    const { scene } = sceneObjects;
    
    // Create ground
    const groundSize = 40;
    const groundGeometry = new THREE.PlaneGeometry(groundSize, groundSize);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xADFF8C, // Lighter bright green grass
      roughness: 0.8,
      metalness: 0.1
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Environment elements group
    const envGroup = new THREE.Group();
    
    // Create tree function
    const createTree = (x, z, type = 'normal') => {
      const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, 1.5, 8);
      const trunkMaterial = new THREE.MeshStandardMaterial({
        color: 0xE5A667, // Lighter brown
        roughness: 0.9
      });
      const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
      trunk.position.set(x, -1.25, z);
      trunk.castShadow = true;
      trunk.receiveShadow = true;
      
      let leavesMaterial;
      if (type === 'normal') {
        leavesMaterial = new THREE.MeshStandardMaterial({
          color: 0xB6FF94, // Very bright light green
          roughness: 0.8
        });
      } else if (type === 'flowering') {
        leavesMaterial = new THREE.MeshStandardMaterial({
          color: 0xFFD1E0, // Light pastel pink
          roughness: 0.8
        });
      } else {
        leavesMaterial = new THREE.MeshStandardMaterial({
          color: 0xFFEE75, // Bright pastel yellow
          roughness: 0.7
        });
      }
      
      const leavesGeometry = new THREE.ConeGeometry(1, 2, 8);
      const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
      leaves.position.set(x, 0.5, z);
      leaves.castShadow = true;
      leaves.receiveShadow = true;
      
      envGroup.add(trunk);
      envGroup.add(leaves);
      
      // Add a second layer to some trees
      if (Math.random() > 0.5) {
        const topLeavesGeometry = new THREE.ConeGeometry(0.7, 1.5, 8);
        const topLeaves = new THREE.Mesh(topLeavesGeometry, leavesMaterial);
        topLeaves.position.set(x, 1.8, z);
        topLeaves.castShadow = true;
        topLeaves.receiveShadow = true;
        envGroup.add(topLeaves);
      }
    };
    
    // Add flower beds with vibrant colors
    const createFlowerBed = (x, z, radius, count) => {
      const flowerBedGeometry = new THREE.CircleGeometry(radius, 16);
      const flowerBedMaterial = new THREE.MeshStandardMaterial({
        color: 0x8D6E63, // Light brown soil
        roughness: 1.0
      });
      const flowerBed = new THREE.Mesh(flowerBedGeometry, flowerBedMaterial);
      flowerBed.rotation.x = -Math.PI / 2;
      flowerBed.position.set(x, -1.98, z);
      flowerBed.receiveShadow = true;
      envGroup.add(flowerBed);
      
      // Add individual flowers with bright colors
      const flowerColors = [
        0xFF5252, // Red
        0xFFEB3B, // Yellow
        0xE040FB, // Purple
        0xFFFFFF, // White
        0xFF9800  // Orange
      ];
      
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const dist = radius * 0.8 * Math.random();
        const fx = x + Math.cos(angle) * dist;
        const fz = z + Math.sin(angle) * dist;
        
        const stemGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8);
        const stemMaterial = new THREE.MeshStandardMaterial({
          color: 0x7CB342, // Green stem
          roughness: 0.8
        });
        const stem = new THREE.Mesh(stemGeometry, stemMaterial);
        stem.position.set(fx, -1.83, fz);
        stem.castShadow = true;
        envGroup.add(stem);
        
        const flowerGeometry = new THREE.SphereGeometry(0.08, 8, 8);
        const flowerMaterial = new THREE.MeshStandardMaterial({
          color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
          roughness: 0.5
        });
        const flower = new THREE.Mesh(flowerGeometry, flowerMaterial);
        flower.position.set(fx, -1.68, fz);
        flower.scale.y = 0.5; // Flatten slightly
        flower.castShadow = true;
        envGroup.add(flower);
      }
    };
    
    // Place trees in a decorative pattern with varying types
    const treePositions = [
      [-8, 8, 'normal'], [8, -8, 'golden'], [-8, -8, 'flowering'], [8, 8, 'normal'],
      [-6, 0, 'flowering'], [6, 0, 'golden'], [0, -8, 'normal'], [0, 8, 'flowering']
    ];
    
    treePositions.forEach(pos => createTree(pos[0], pos[1], pos[2]));
    
    // Add flower beds at strategic locations
    createFlowerBed(0, 6, 2, 25);
    createFlowerBed(-6, -6, 1.5, 15);
    createFlowerBed(6, -6, 1.5, 15);
    
    // Create paths around the building
    const createPath = (startX, startZ, endX, endZ, width) => {
      const pathLength = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endZ - startZ, 2));
      const pathGeometry = new THREE.PlaneGeometry(width, pathLength);
      const pathMaterial = new THREE.MeshStandardMaterial({
        color: 0xF5F5DC, // Light beige path
        roughness: 0.9
      });
      
      const path = new THREE.Mesh(pathGeometry, pathMaterial);
      path.rotation.x = -Math.PI / 2;
      
      // Calculate path center and rotation
      const centerX = (startX + endX) / 2;
      const centerZ = (startZ + endZ) / 2;
      path.position.set(centerX, -1.99, centerZ);
      
      // Calculate rotation angle
      const angle = Math.atan2(endZ - startZ, endX - startX);
      path.rotation.z = angle - Math.PI / 2;
      
      path.receiveShadow = true;
      envGroup.add(path);
    };
    
    // Create walkways around the building
    createPath(0, 0, 0, 8, 1.5);  // Front path
    createPath(0, 0, -6, -6, 1);  // Path to second tower
    createPath(0, 0, 6, -6, 1);   // Path to third tower
    
    // Add gold particle effects around building with rich gold colors
    const createGoldParticles = () => {
      const particlesGroup = new THREE.Group();
      const particlesMaterial = new THREE.PointsMaterial({
        color: 0xFCC200, // Real gold color
        size: 0.05,
        transparent: true,
        opacity: 0.7
      });
      
      const particlesCount = 1000;
      const particlesGeometry = new THREE.BufferGeometry();
      const positionArray = new Float32Array(particlesCount * 3);
      
      for (let i = 0; i < particlesCount; i++) {
        // Create a sphere of particles around the building
        const radius = 20;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        positionArray[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positionArray[i * 3 + 1] = (radius * Math.cos(phi)) + 5; // Offset y to center on building
        positionArray[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      
      // Store the original positions for animation
      particles.userData.originalPositions = [...positionArray];
      particlesGroup.add(particles);
      
      return particlesGroup;
    };
    
    const goldParticles = createGoldParticles();
    scene.add(goldParticles);
    
    // Add the environment group to the scene
    scene.add(envGroup);
    
    // Return cleanup function
    return () => {
      scene.remove(ground);
      scene.remove(envGroup);
      scene.remove(goldParticles);
      
      // Dispose geometries and materials
      ground.geometry.dispose();
      ground.material.dispose();
      
      // Dispose all children in envGroup
      envGroup.traverse(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(material => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      
      // Dispose particles
      goldParticles.traverse(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
    };
  }, [sceneObjects]);
};

export default useEnvironment;