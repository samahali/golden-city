
import { useEffect, useState } from 'react';
import * as THREE from 'three';

const useBuildingModel = (sceneObjects) => {
    const [buildingElements, setBuildingElements] = useState(null);

    useEffect(() => {
        if (!sceneObjects) return;

        const { scene } = sceneObjects;

        // Building materials with brighter, more vibrant gold colors
        const buildingMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFD700, // Pure bright gold
            metalness: 1.0,
            roughness: 0.1,
            envMapIntensity: 1.5
        });

        const baseMaterial = new THREE.MeshStandardMaterial({
            color: 0xF5F5DC, // Light cream/beige for base
            roughness: 0.8
        });

        const windowMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x8CEFFF, // Bright sky blue for windows
            metalness: 0,
            roughness: 0.1,
            transmission: 0.9,
            transparent: true,
            opacity: 0.4,
            reflectivity: 1,
            clearcoat: 1,
            clearcoatRoughness: 0.1
        });

        const roofMaterial = new THREE.MeshStandardMaterial({
            color: 0xF9D423, // Bright sunflower gold
            metalness: 1.0,
            roughness: 0.05,
            envMapIntensity: 2.0
        });

        // Create building base
        const baseGeometry = new THREE.BoxGeometry(12, 0.5, 12);
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.y = -2;
        base.receiveShadow = true;
        scene.add(base);

        // Create stairs
        const createStairs = () => {
            const stairsGroup = new THREE.Group();

            const stairMaterial = new THREE.MeshStandardMaterial({
                color: 0xFDFBE0, // Very light gold-white
                roughness: 0.4
            });

            // Three steps
            for (let i = 0; i < 3; i++) {
                const stepWidth = 6 - i * 0.5;
                const stepGeometry = new THREE.BoxGeometry(stepWidth, 0.25, 2);
                const step = new THREE.Mesh(stepGeometry, stairMaterial);
                step.position.set(0, -1.75 + (i * 0.25), 2.5 - (i * 0.5));
                step.receiveShadow = true;
                step.castShadow = true;
                stairsGroup.add(step);
            }

            return stairsGroup;
        };

        const stairs = createStairs();
        scene.add(stairs);

        // Create main tower structure
        const createTower = () => {
            const towerGroup = new THREE.Group();

            // Main building body - using bright gold
            const mainTowerGeometry = new THREE.BoxGeometry(4, 10, 4);
            const mainTower = new THREE.Mesh(mainTowerGeometry, buildingMaterial);
            mainTower.position.y = 3;
            mainTower.castShadow = true;
            mainTower.receiveShadow = true;
            towerGroup.add(mainTower);

            // Secondary tower - lighter gold variant
            const secondaryTowerMaterial = new THREE.MeshStandardMaterial({
                color: 0xFFE668, // Bright vibrant gold
                metalness: 0.9,
                roughness: 0.15
            });

            const secondaryTowerGeometry = new THREE.BoxGeometry(3, 7, 3);
            const secondaryTower = new THREE.Mesh(secondaryTowerGeometry, secondaryTowerMaterial);
            secondaryTower.position.set(-4, 1.5, -3);
            secondaryTower.castShadow = true;
            secondaryTower.receiveShadow = true;
            towerGroup.add(secondaryTower);

            // Third tower - another bright gold variant
            const thirdTowerMaterial = new THREE.MeshStandardMaterial({
                color: 0xFFDF00, // Golden yellow
                metalness: 0.9,
                roughness: 0.08
            });

            const thirdTowerGeometry = new THREE.BoxGeometry(3, 8, 3);
            const thirdTower = new THREE.Mesh(thirdTowerGeometry, thirdTowerMaterial);
            thirdTower.position.set(4, 2, 2);
            thirdTower.castShadow = true;
            thirdTower.receiveShadow = true;
            towerGroup.add(thirdTower);

            // Connector between towers
            const connectorGeometry = new THREE.BoxGeometry(3, 1.5, 3);
            const connector = new THREE.Mesh(connectorGeometry, buildingMaterial);
            connector.position.set(0, 1, -2);
            connector.castShadow = true;
            connector.receiveShadow = true;
            towerGroup.add(connector);

            return towerGroup;
        };

        const tower = createTower();
        scene.add(tower);

        // Create windows
        const createWindows = () => {
            const windowsGroup = new THREE.Group();

            // Main tower windows
            for (let floor = 0; floor < 5; floor++) {
                for (let side = 0; side < 4; side++) {
                    // Determine positions based on side
                    let x = 0, z = 0, rotation = 0;

                    if (side === 0) { // Front
                        x = 0; z = 2.01; rotation = 0;
                    } else if (side === 1) { // Right
                        x = 2.01; z = 0; rotation = Math.PI / 2;
                    } else if (side === 2) { // Back
                        x = 0; z = -2.01; rotation = Math.PI;
                    } else { // Left
                        x = -2.01; z = 0; rotation = -Math.PI / 2;
                    }

                    // Create three smaller windows per floor per side
                    for (let win = -1; win <= 1; win += 1) {
                        // Add a glow behind windows
                        const glowGeometry = new THREE.PlaneGeometry(0.8, 0.9);
                        const glowMaterial = new THREE.MeshBasicMaterial({
                            color: 0xFFFDE7, // Warm light glow
                            transparent: true,
                            opacity: 0.3
                        });

                        const glow = new THREE.Mesh(glowGeometry, glowMaterial);

                        // Position glow
                        glow.position.y = floor * 2 + 0.5;

                        if (side === 0 || side === 2) {
                            glow.position.x = win * 1;
                            glow.position.z = z + (side === 0 ? -0.01 : 0.01);
                        } else {
                            glow.position.x = x + (side === 1 ? -0.01 : 0.01);
                            glow.position.z = win * 1;
                        }

                        glow.rotation.y = rotation;
                        windowsGroup.add(glow);

                        // Add window
                        const windowGeometry = new THREE.PlaneGeometry(0.7, 0.8);
                        const window = new THREE.Mesh(windowGeometry, windowMaterial);

                        // Position window
                        window.position.y = floor * 2 + 0.5;

                        if (side === 0 || side === 2) {
                            window.position.x = win * 1;
                            window.position.z = z;
                        } else {
                            window.position.x = x;
                            window.position.z = win * 1;
                        }

                        window.rotation.y = rotation;
                        window.castShadow = false;
                        windowsGroup.add(window);
                    }
                }
            }

            // Add windows to the secondary towers
            const addTowerWindows = (centerX, centerZ, height) => {
                for (let floor = 0; floor < height / 2; floor++) {
                    for (let side = 0; side < 4; side++) {
                        // Determine positions based on side
                        let x = centerX, z = centerZ, rotation = 0;

                        if (side === 0) { // Front
                            z += 1.51; rotation = 0;
                        } else if (side === 1) { // Right
                            x += 1.51; rotation = Math.PI / 2;
                        } else if (side === 2) { // Back
                            z -= 1.51; rotation = Math.PI;
                        } else { // Left
                            x -= 1.51; rotation = -Math.PI / 2;
                        }

                        // Add two windows per side for smaller towers
                        for (let win = -0.6; win <= 0.6; win += 1.2) {
                            // Add glow behind windows
                            const glowGeometry = new THREE.PlaneGeometry(0.6, 0.8);
                            const glowMaterial = new THREE.MeshBasicMaterial({
                                color: 0xFFFDE7, // Warm light glow
                                transparent: true,
                                opacity: 0.3
                            });

                            const glow = new THREE.Mesh(glowGeometry, glowMaterial);

                            // Position for left/right sides
                            if (side === 1 || side === 3) {
                                glow.position.x = x;
                                glow.position.y = floor * 2 + 0.5;
                                glow.position.z = centerZ + win;
                            }
                            // Position for front/back sides
                            else {
                                glow.position.x = centerX + win;
                                glow.position.y = floor * 2 + 0.5;
                                glow.position.z = z;
                            }

                            glow.rotation.y = rotation;

                            // Adjust position slightly to avoid z-fighting
                            if (side === 0) glow.position.z -= 0.01;
                            if (side === 1) glow.position.x -= 0.01;
                            if (side === 2) glow.position.z += 0.01;
                            if (side === 3) glow.position.x += 0.01;

                            windowsGroup.add(glow);

                            // Add window with same positioning
                            const windowGeometry = new THREE.PlaneGeometry(0.5, 0.7);
                            const window = new THREE.Mesh(windowGeometry, windowMaterial);

                            // Position window using same logic as glow
                            if (side === 1 || side === 3) {
                                window.position.x = x;
                                window.position.y = floor * 2 + 0.5;
                                window.position.z = centerZ + win;
                            } else {
                                window.position.x = centerX + win;
                                window.position.y = floor * 2 + 0.5;
                                window.position.z = z;
                            }

                            window.rotation.y = rotation;
                            window.castShadow = false;
                            windowsGroup.add(window);
                        }
                    }
                }
            };

            // Add windows to secondary towers
            addTowerWindows(-4, -3, 7); // Second tower
            addTowerWindows(4, 2, 8);  // Third tower

            return windowsGroup;
        };

        const windows = createWindows();
        scene.add(windows);

        // Add spire/antenna with bright gold
        const createSpire = () => {
            const spireGroup = new THREE.Group();

            // Base of spire
            const spireBaseGeometry = new THREE.CylinderGeometry(0.3, 0.5, 0.5, 8);
            const spireBaseMaterial = new THREE.MeshStandardMaterial({
                color: 0xFFD700, // Pure gold
                metalness: 1.0,
                roughness: 0
            });
            const spireBase = new THREE.Mesh(spireBaseGeometry, spireBaseMaterial);
            spireBase.position.y = 8.25;
            spireBase.castShadow = true;
            spireGroup.add(spireBase);

            // Spire
            const spireGeometry = new THREE.CylinderGeometry(0.05, 0.3, 2, 8);
            const spireMaterial = new THREE.MeshStandardMaterial({
                color: 0xFFE87C, // Bright light gold
                metalness: 1.0,
                roughness: 0.1
            });
            const spire = new THREE.Mesh(spireGeometry, spireMaterial);
            spire.position.y = 9.5;
            spire.castShadow = true;
            spireGroup.add(spire);

            // Add decorative ring
            const ringGeometry = new THREE.TorusGeometry(0.15, 0.03, 16, 32);
            const ringMaterial = new THREE.MeshStandardMaterial({
                color: 0xFFD700, // Pure gold
                metalness: 1.0,
                roughness: 0
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.position.y = 9.5;
            ring.rotation.x = Math.PI / 2;
            spireGroup.add(ring);

            // Blinking light
            const blinkingLight = new THREE.PointLight(0xFFF6A9, 1, 10);
            blinkingLight.position.y = 10.6;
            blinkingLight.castShadow = false;
            spireGroup.add(blinkingLight);

            // Store a reference to the light for animation
            spireGroup.userData.blinkingLight = blinkingLight;

            return spireGroup;
        };

        const spire = createSpire();
        scene.add(spire);

        // Add roof decorations with bright gold colors
        const createRoofDecorations = () => {
            const roofGroup = new THREE.Group();

            // Main tower roof - bright gold pyramid
            const mainRoofGeometry = new THREE.ConeGeometry(3, 2, 4);
            const mainRoof = new THREE.Mesh(mainRoofGeometry, roofMaterial);
            mainRoof.position.y = 9;
            mainRoof.rotation.y = Math.PI / 4;
            mainRoof.castShadow = true;
            roofGroup.add(mainRoof);

            // Add decorative edge highlights
            const mainRoofEdgeGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2.2, 8);
            const mainRoofEdgeMaterial = new THREE.MeshStandardMaterial({
                color: 0xFFFCB7, // Very bright light gold
                metalness: 1.0,
                roughness: 0
            });

            // Add four edge highlights
            for (let i = 0; i < 4; i++) {
                const edge = new THREE.Mesh(mainRoofEdgeGeometry, mainRoofEdgeMaterial);
                edge.position.y = 9;
                edge.rotation.z = Math.PI / 4;
                edge.rotation.y = (Math.PI / 2) * i + Math.PI / 4;
                edge.position.x = Math.sin(edge.rotation.y) * 1.5;
                edge.position.z = Math.cos(edge.rotation.y) * 1.5;
                roofGroup.add(edge);
            }

            // Secondary tower roof - different gold variant
            const secondaryRoofGeometry = new THREE.ConeGeometry(2.2, 1.5, 4);
            const secondaryRoofMaterial = new THREE.MeshStandardMaterial({
                color: 0xFFE14D, // Bright goldenrod
                metalness: 1.0,
                roughness: 0.1
            });
            const secondaryRoof = new THREE.Mesh(secondaryRoofGeometry, secondaryRoofMaterial);
            secondaryRoof.position.set(-4, 5.5, -3);
            secondaryRoof.rotation.y = Math.PI / 4;
            secondaryRoof.castShadow = true;
            roofGroup.add(secondaryRoof);

            // Third tower roof - another gold variant
            const thirdRoofGeometry = new THREE.ConeGeometry(2.2, 1.5, 4);
            const thirdRoofMaterial = new THREE.MeshStandardMaterial({
                color: 0xFFD000, // Rich gold
                metalness: 1.0,
                roughness: 0.1
            });
            const thirdRoof = new THREE.Mesh(thirdRoofGeometry, thirdRoofMaterial);
            thirdRoof.position.set(4, 6, 2);
            thirdRoof.rotation.y = Math.PI / 4;
            thirdRoof.castShadow = true;
            roofGroup.add(thirdRoof);

            return roofGroup;
        };

        const roofDecorations = createRoofDecorations();
        scene.add(roofDecorations);

        // Store building elements for animations
        setBuildingElements({
            tower,
            windows,
            spire,
            roofDecorations
        });

    }, [sceneObjects]);

    return buildingElements;
};

export default useBuildingModel;