import * as THREE from 'three'
import {useMemo } from 'react'
import SimpleFlange from './SimpleFlange'
import type{ FlangeParams } from '../types'
import type { FC } from 'react'

interface WeldNeckFlangeProps extends FlangeParams {
  neckLength?: number
  neckEndDiameter?: number
}

const WeldNeckFlange: FC<WeldNeckFlangeProps> = ({
  thickness = 25,
  neckLength = 60,
  neckEndDiameter = 90,
  innerDiameter = 80,
  outerDiameter = 220,
  ...params
}) => {
  // Logic: Ensure the neck base is smaller than the bolt circle to avoid overlap
  const neckBaseDiameter = innerDiameter + 30;
  const safeBoltCircle = Math.max(neckBaseDiameter + 30, outerDiameter * 0.75);

  const neckGeometry = useMemo(() => {
    // THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments, heightSegments, openEnded)
    const geo = new THREE.CylinderGeometry(
      neckEndDiameter / 2, 
      neckBaseDiameter / 2, 
      neckLength, 
      48, 
      1, 
      true
    );
    // IMPORTANT: Rotate the geometry data so it stands up along the Z-axis 
    // to match the ExtrudeGeometry of the plate.
    geo.rotateX(Math.PI / 2);
    return geo;
  }, [neckEndDiameter, neckBaseDiameter, neckLength]);

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      {/* 1. The Base Plate */}
      <SimpleFlange 
        {...params} 
        thickness={thickness} 
        innerDiameter={innerDiameter}
        outerDiameter={outerDiameter}
        boltCircleDiameter={safeBoltCircle} 
      />

      {/* 2. The Tapered Neck */}
      {/* Positioned at [0, 0, thickness + length/2] because Z is 'Up' inside this group */}
      <mesh position={[0, 0, thickness + neckLength / 2]}>
        <primitive object={neckGeometry} attach="geometry" />
        <meshStandardMaterial 
          metalness={0.7} 
          roughness={0.3} 
          color="#cccccc" 
          side={THREE.DoubleSide} 
        />
      </mesh>
    </group>
  );
}

export default WeldNeckFlange;