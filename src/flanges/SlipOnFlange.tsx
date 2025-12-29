import * as THREE from 'three'
import type { FC } from 'react'
import SimpleFlange from './SimpleFlange'
import type{ FlangeParams } from '../types'

interface SlipOnFlangeProps extends FlangeParams {
  hubHeight?: number
  hubDiameter?: number
}

const SlipOnFlange: FC<SlipOnFlangeProps> = ({
  thickness = 20,
  hubHeight = 30,
  hubDiameter = 130, // Default slightly smaller to avoid bolts
  innerDiameter = 100,
  ...params
}) => {
  // Logic: Ensure bolts are outside the hub
  const safeBoltCircle = Math.max(hubDiameter + 30, (params.outerDiameter || 200) * 0.75);

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      {/* 1. The Plate */}
      <SimpleFlange 
        {...params} 
        thickness={thickness} 
        innerDiameter={innerDiameter}
        boltCircleDiameter={safeBoltCircle} 
      />

      {/* 2. The Hub - Positioned along the Z axis (the 'thickness' direction) */}
      <mesh position={[0, 0, thickness + hubHeight / 2]} rotation={[0, 0, 0]}>
        <cylinderGeometry
          args={[
            hubDiameter / 2, 
            hubDiameter / 2, 
            hubHeight, 
            48, 
            1, 
            true // Makes it a hollow tube
          ]}
        />
        {/* We rotate the cylinder geometry internally because THREE cylinders are Y-up */}
        <primitive object={new THREE.CylinderGeometry(hubDiameter/2, hubDiameter/2, hubHeight, 48, 1, true).rotateX(Math.PI / 2)} attach="geometry" />
        
        <meshStandardMaterial 
          metalness={0.7} 
          roughness={0.3} 
          color="#cccccc" 
          side={THREE.DoubleSide} 
        />
      </mesh>
    </group>
  )
}
export default SlipOnFlange