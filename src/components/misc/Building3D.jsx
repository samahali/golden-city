import React, { useRef, useMemo } from 'react';
import './Building3D.css';
import useThreeScene from '../../hooks/useThreeScene';
import useBuildingModel from '../../hooks/useBuildingModel';
import useEnvironment from '../../hooks/useEnvironment';
import useAnimations from '../../hooks/useAnimations';

const Building3D = () => {
  // Reference to container for Three.js scene
  const mountRef = useRef(null);
  
  // Initialize Three.js scene
  const sceneObjects = useThreeScene(mountRef);
  
  // Add building models
  const buildingElements = useBuildingModel(sceneObjects);
  
  // Add environment elements
  useEnvironment(sceneObjects);
  
  // Set up animations
  useAnimations(sceneObjects, buildingElements);
  
  // Use memoized info boxes to prevent unnecessary re-renders
  const infoBoxes = useMemo(() => (
    <div className="building3d-info-boxes">
      <div className="info-box">
        <div className="info-icon">
          <i className="fas fa-building"></i>
        </div>
        <h3>Luxury Gold Architecture</h3>
        <p>Premium gold-plated exterior with floor-to-ceiling windows</p>
      </div>
      
      <div className="info-box">
        <div className="info-icon">
          <i className="fas fa-tree"></i>
        </div>
        <h3>Vibrant Surroundings</h3>
        <p>Colorful gardens and serene water features</p>
      </div>
      
      <div className="info-box">
        <div className="info-icon">
          <i className="fas fa-coins"></i>
        </div>
        <h3>Valuable Investment</h3>
        <p>Prime location with high appreciation potential</p>
      </div>
    </div>
  ), []);
  
  return (
    <div className="building3d-container">
      <div className="building3d-header">
        <h2>Golden Plaza Towers in 3D</h2>
        <p>Explore our flagship luxury property with state-of-the-art facilities in a prime location</p>
      </div>
      
      <div className="building3d-wrapper">
        <div className="building3d-canvas" ref={mountRef}></div>
        
        <div className="building3d-instructions">
          <div className="instruction">
            <i className="fas fa-mouse"></i> Click and drag to rotate
          </div>
          <div className="instruction">
            <i className="fas fa-search-plus"></i> Scroll to zoom
          </div>
          <div className="instruction">
            <i className="fas fa-hand-paper"></i> Right-click to pan
          </div>
        </div>
      </div>
      
      {infoBoxes}
    </div>
  );
};

export default Building3D;