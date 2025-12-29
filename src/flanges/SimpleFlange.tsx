import { useMemo } from 'react'
import * as THREE from 'three'
import type { FlangeParams } from '../types'
import type { FC } from 'react'

const SimpleFlange: FC<FlangeParams & { boltCircleDiameter?: number }> = ({
  outerDiameter = 200,
  innerDiameter = 100,
  thickness = 20,
  boltCount = 8,
  boltHoleDiameter = 14,
  boltCircleDiameter
}) => {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.absarc(0, 0, outerDiameter / 2, 0, Math.PI * 2)

    const hole = new THREE.Path()
    hole.absarc(0, 0, innerDiameter / 2, 0, Math.PI * 2, true)
    shape.holes.push(hole)

    // IMPROVED LOGIC: Ensure circleDia is always outside the hub area
    const circleDia = boltCircleDiameter ?? outerDiameter * 0.8
    const boltRadius = boltHoleDiameter / 2

    for (let i = 0; i < boltCount; i++) {
      const theta = (i / boltCount) * Math.PI * 2
      const x = Math.cos(theta) * (circleDia / 2)
      const y = Math.sin(theta) * (circleDia / 2)
      const b = new THREE.Path()
      b.absarc(x, y, boltRadius, 0, Math.PI * 2, true)
      shape.holes.push(b)
    }

    return new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelSegments: 2
    })
  }, [outerDiameter, innerDiameter, thickness, boltCount, boltHoleDiameter, boltCircleDiameter])

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial metalness={0.7} roughness={0.35} color="#cccccc" />
    </mesh>
  )
}

export default SimpleFlange