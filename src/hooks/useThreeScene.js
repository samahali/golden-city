import { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Sky } from 'three/examples/jsm/objects/Sky';
import { Water } from 'three/examples/jsm/objects/Water';

const useThreeScene = (mountRef) => {
  const [sceneObjects, setSceneObjects] = useState(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xAEE6F8); // Bright sky blue
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      mountRef.current.clientWidth / mountRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(10, 8, 15);
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mountRef.current.appendChild(renderer.domElement);
    
    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.target.set(0, 0, 0);
    controls.maxPolarAngle = Math.PI / 2 - 0.1;
    controls.minDistance = 8;
    controls.maxDistance = 25;
    
    // Add sky
    const sky = new Sky();
    sky.scale.setScalar(1000);
    scene.add(sky);
    
    const skyUniforms = sky.material.uniforms;
    skyUniforms['turbidity'].value = 6;
    skyUniforms['rayleigh'].value = 0.5;
    skyUniforms['mieCoefficient'].value = 0.005;
    skyUniforms['mieDirectionalG'].value = 0.9;
    
    const sun = new THREE.Vector3();
    const phi = THREE.MathUtils.degToRad(80);
    const theta = THREE.MathUtils.degToRad(150);
    sun.setFromSphericalCoords(1, phi, theta);
    skyUniforms['sunPosition'].value.copy(sun);
    
    // Add water
    const waterGeometry = new THREE.PlaneGeometry(100, 100);
    const water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg', function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }),
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x66E8E8, // Bright turquoise water
      distortionScale: 2.5,
      fog: false
    });
    water.rotation.x = -Math.PI / 2;
    water.position.y = -2.5;
    scene.add(water);
    
    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xfffaf0, 0.8);
    scene.add(ambientLight);
    
    const sunLight = new THREE.DirectionalLight(0xfffbf0, 1.2);
    sunLight.position.set(10, 15, 10);
    sunLight.castShadow = true;
    sunLight.shadow.camera.far = 50;
    sunLight.shadow.camera.left = -20;
    sunLight.shadow.camera.right = 20;
    sunLight.shadow.camera.top = 20;
    sunLight.shadow.camera.bottom = -20;
    sunLight.shadow.mapSize.set(4096, 4096);
    sunLight.shadow.bias = -0.0001;
    scene.add(sunLight);
    
    // Add accent lights
    const pointLight1 = new THREE.PointLight(0xFFE9A7, 1.0, 30);
    pointLight1.position.set(5, 8, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xFFD982, 0.8, 20);
    pointLight2.position.set(-5, 5, -5);
    scene.add(pointLight2);
    
    const pointLight3 = new THREE.PointLight(0x80D8FF, 0.5, 15);
    pointLight3.position.set(0, 2, 8);
    scene.add(pointLight3);
    
    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Store objects for use in other hooks
    setSceneObjects({
      scene,
      camera,
      renderer,
      controls,
      water,
      sun
    });
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      controls.dispose();
      renderer.dispose();
    };
  }, [mountRef]);
  
  return sceneObjects;
};

export default useThreeScene;