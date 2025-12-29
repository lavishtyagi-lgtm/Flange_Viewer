import * as THREE from 'three'
import SimpleFlange from './SimpleFlange'
import type{ FlangeParams } from '../types'
import type { FC } from 'react'
import { useMemo } from 'react'
interface WeldNeckFlangeProps extends FlangeParams {
  neckLength?: number
  neckEndDiameter?: number
}

const WeldNeckFlange: FC<WeldNeckFlangeProps> = ({
  thickness = 25,
  neckLength = 60,
  neckEndDiameter,
  innerDiameter = 80,
  outerDiameter = 220,
  ...params
}) => {
  const baseDia = innerDiameter + 30 
  const endDia = neckEndDiameter ?? (innerDiameter + 10)
  const length = Math.max(6, neckLength)
  const safeBoltCircle = Math.max(baseDia + 30, params.boltCircleDiameter ?? (outerDiameter - 60))

  const neckGeometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(endDia / 2, baseDia / 2, length, 48, 1, true)
    geo.rotateX(Math.PI / 2) // THIS FIXES THE INCLINATION
    return geo
  }, [endDia, baseDia, length])

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <SimpleFlange
        {...params}
        thickness={thickness}
        innerDiameter={innerDiameter}
        outerDiameter={outerDiameter}
        boltCircleDiameter={safeBoltCircle}
      />

      <mesh position={[0, 0, thickness + length / 2]}>
        <primitive object={neckGeometry} attach="geometry" />
        <meshStandardMaterial metalness={0.7} roughness={0.3} color="#cccccc" side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
export default WeldNeckFlange;