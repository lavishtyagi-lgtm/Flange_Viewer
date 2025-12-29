import * as THREE from 'three'
import type { FC } from 'react'
import SimpleFlange from './SimpleFlange'
import type{ FlangeParams } from '../types'
import { useMemo } from 'react'
interface SlipOnFlangeProps extends FlangeParams {
  hubHeight?: number
  hubDiameter?: number
}

const SlipOnFlange: FC<SlipOnFlangeProps> = ({
  thickness = 20,
  hubHeight = 30,
  hubDiameter,
  innerDiameter = 100,
  outerDiameter = 220,
  ...params
}) => {
  const hubDia = Math.min(Math.max(hubDiameter ?? (innerDiameter + 40), innerDiameter + 10), outerDiameter - 40)
  const hubH = Math.max(4, hubHeight)
  const safeBoltCircle = Math.max(hubDia + 20, params.boltCircleDiameter ?? (outerDiameter - 60))

  // Create geometry and rotate it to stand along the Z-axis
  const geometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(hubDia / 2, hubDia / 2, hubH, 48, 1, true)
    geo.rotateX(Math.PI / 2) // THIS FIXES THE INCLINATION
    return geo
  }, [hubDia, hubH])

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <SimpleFlange
        {...params}
        thickness={thickness}
        innerDiameter={innerDiameter}
        outerDiameter={outerDiameter}
        boltCircleDiameter={safeBoltCircle}
      />

      {/* Positioned at Z = thickness + half-height */}
      <mesh position={[0, 0, thickness + hubH / 2]}>
        <primitive object={geometry} attach="geometry" />
        <meshStandardMaterial metalness={0.7} roughness={0.3} color="#cccccc" side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
export default SlipOnFlange