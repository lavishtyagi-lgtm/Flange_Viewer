import { useMemo } from 'react'
import * as THREE from 'three'
import type { FlangeParams } from '../types'
import type { FC } from 'react'

const MIN_OUTER = 100
const MIN_INNER = 10
const MIN_HOLE = 8
const MAX_HOLE = 30
const MIN_GAP = 20 // minimum gap between inner and outer diameters

const SimpleFlange: FC<FlangeParams & { boltCircleDiameter?: number }> = ({
  outerDiameter = 200,
  innerDiameter = 100,
  thickness = 20,
  boltCount = 8,
  boltHoleDiameter = 14,
  boltCircleDiameter
}) => {
  const geometry = useMemo(() => {
    // Clamp basic parameters to safe ranges
    const outer = Math.max(outerDiameter, MIN_OUTER)
    const inner = Math.min(Math.max(innerDiameter, MIN_INNER), outer - MIN_GAP)
    const holeDia = Math.min(Math.max(boltHoleDiameter, MIN_HOLE), MAX_HOLE)
    const boltR = holeDia / 2

    const shape = new THREE.Shape()
    shape.absarc(0, 0, outer / 2, 0, Math.PI * 2)

    const bore = new THREE.Path()
    bore.absarc(0, 0, inner / 2, 0, Math.PI * 2, true)
    shape.holes.push(bore)

    // Determine feasible bolt circle range
    const minCircle = inner + 2 * boltR + 2
    const maxCircle = outer - 2 * boltR - 2

    if (minCircle <= maxCircle && boltCount >= 3) {
      // choose a bolt circle that stays within the allowed range
      let circle = boltCircleDiameter ?? Math.max(outer - 60, inner + 40)
      circle = Math.min(Math.max(circle, minCircle), maxCircle)

      const circleR = circle / 2
      const requiredDistance = Math.max(holeDia * 1.2, 8)

      // compute the largest bolt count that will satisfy chord spacing
      let allowedBolts = 0
      for (let n = 64; n >= 3; n--) {
        const chord = 2 * circleR * Math.sin(Math.PI / n)
        if (chord >= requiredDistance) {
          allowedBolts = n
          break
        }
      }
      if (allowedBolts >= 3) {
        const placeBolts = Math.min(boltCount, allowedBolts)
        for (let i = 0; i < placeBolts; i++) {
          const theta = (i / placeBolts) * Math.PI * 2
          const x = Math.cos(theta) * circleR
          const y = Math.sin(theta) * circleR
          const b = new THREE.Path()
          b.absarc(x, y, boltR, 0, Math.PI * 2, true)
          shape.holes.push(b)
        }
      }
    }

    return new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      bevelEnabled: false
    })
  }, [outerDiameter, innerDiameter, thickness, boltCount, boltHoleDiameter, boltCircleDiameter])

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial metalness={0.7} roughness={0.35} color="#cccccc" />
    </mesh>
  )
}

export default SimpleFlange