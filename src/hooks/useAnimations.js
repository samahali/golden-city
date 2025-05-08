import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const useAnimations = (sceneObjects, buildingElements) => {
  // Reference to store animation frame for cleanup
  const animationFrameRef = useRef();
  
  useEffect(() => {
    if (!sceneObjects || !buildingElements) return;
    
    const { renderer, scene, camera, controls, water } = sceneObjects;
    const { tower, spire } = buildingElements;
    
    // Create a clock for timing
    const clock = new THREE.Clock();
    let lastBlinkTime = 0;
    let blinkState = true;
    
    // Animation loop
    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();
      
      // Update controls
      controls.update();
      
      // Animate water with gentle waves
      if (water) {
        water.material.uniforms['time'].value += delta * 0.5;
      }
      
      // Blink the spire light every second, alternating between gold and white
      if (spire && spire.userData.blinkingLight) {
        if (elapsedTime - lastBlinkTime > 1) {
          blinkState = !blinkState;
          lastBlinkTime = elapsedTime;
          spire.userData.blinkingLight.intensity = blinkState ? 1 : 0.5;
          spire.userData.blinkingLight.color.set(blinkState ? 0xFFFCC9 : 0xFFE082);
        }
      }
      
      // Add subtle building sway for realism - very gentle
      if (tower) {
        tower.rotation.z = Math.sin(elapsedTime * 0.1) * 0.002;
      }
      
      // Animate gold particles to shimmer if they exist
      scene.traverse((object) => {
        if (object instanceof THREE.Points && object.userData.originalPositions) {
          const positions = object.geometry.attributes.position.array;
          const originalPositions = object.userData.originalPositions;
          
          for (let i = 0; i < positions.length; i += 3) {
            // Make particles shimmer by slightly adjusting their positions
            positions[i] = originalPositions[i] + Math.sin(elapsedTime * 2 + i) * 0.05;
            positions[i + 1] = originalPositions[i + 1] + Math.cos(elapsedTime * 2 + i) * 0.05;
            positions[i + 2] = originalPositions[i + 2] + Math.sin(elapsedTime * 2 + i + 2) * 0.05;
          }
          
          object.geometry.attributes.position.needsUpdate = true;
          
          // Rotate the particle system slowly
          object.rotation.y = elapsedTime * 0.05;
        }
      });
      
      // Render scene
      renderer.render(scene, camera);
      
      // Store animation frame reference for cleanup
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup function
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [sceneObjects, buildingElements]);
};

export default useAnimations;