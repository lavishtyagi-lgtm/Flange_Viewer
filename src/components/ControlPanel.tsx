import React, { useEffect } from 'react'
import type { FC } from 'react'
import { Box, Typography, Slider, Select, MenuItem } from '@mui/material'
import type { FlangeParams, FlangeType } from '../types'

interface Props {
  flangeType: FlangeType
  setFlangeType: (type: FlangeType) => void
  params: FlangeParams
  setParams: React.Dispatch<React.SetStateAction<FlangeParams>>
}

const ControlPanel: FC<Props> = ({ flangeType, setFlangeType, params, setParams }) => {
  useEffect(() => {
    const boltR = (params.boltHoleDiameter ?? 14) / 2
    const minCircle = (params.innerDiameter ?? 0) + 2 * boltR + 2
    const maxCircle = (params.outerDiameter ?? 0) - 2 * boltR - 2

    if (minCircle > maxCircle) {
      if ((params.boltCount ?? 0) !== 0) setParams(p => ({ ...p, boltCount: 0 }))
      return
    }

    const circleDia = params.boltCircleDiameter ?? Math.max((params.outerDiameter ?? 200) - 60, (params.innerDiameter ?? 100) + 40)
    const circleRadius = circleDia / 2
    const requiredDistance = Math.max((params.boltHoleDiameter ?? 14) * 1.2, 8)

    let maxBolts = 0
    for (let n = 64; n >= 3; n--) {
      const chord = 2 * circleRadius * Math.sin(Math.PI / n)
      if (chord >= requiredDistance) {
        maxBolts = n
        break
      }
    }
    if (maxBolts === 0) maxBolts = 3

    if ((params.boltCount ?? 0) > maxBolts) setParams(p => ({ ...p, boltCount: maxBolts }))
  }, [params.boltCircleDiameter, params.boltHoleDiameter, params.outerDiameter, params.innerDiameter, params.boltCount, setParams])

  const boltR = (params.boltHoleDiameter ?? 14) / 2
  const minCircle = (params.innerDiameter ?? 0) + 2 * boltR + 2
  const maxCircle = (params.outerDiameter ?? 0) - 2 * boltR - 2
  const circleDia = params.boltCircleDiameter ?? Math.max((params.outerDiameter ?? 200) - 60, (params.innerDiameter ?? 100) + 40)
  const circleRadius = circleDia / 2
  const requiredDistance = Math.max((params.boltHoleDiameter ?? 14) * 1.2, 8)

  let maxBolts = 0
  for (let n = 64; n >= 3; n--) {
    const chord = 2 * circleRadius * Math.sin(Math.PI / n)
    if (chord >= requiredDistance) {
      maxBolts = n
      break
    }
  }
  if (maxBolts === 0) maxBolts = 3

  const clamped = Math.min(params.boltCount ?? 8, maxBolts)

  return (
    <Box sx={{ width: 300, p: 2 }}>
      <Typography variant="subtitle1">Flange Type</Typography>
      <Select fullWidth value={flangeType} onChange={e => setFlangeType(e.target.value as FlangeType)} sx={{ mb: 2 }}>
        <MenuItem value="simple">Simple</MenuItem>
        <MenuItem value="slip-on">Slip On</MenuItem>
        <MenuItem value="weld-neck">Weld Neck</MenuItem>
      </Select>

      <Typography>Outer Diameter</Typography>
      <Slider
        min={100}
        max={400}
        value={params.outerDiameter}
        onChange={(_, v) => {
          const MIN_GAP = 10
          const outer = v as number
          const inner = params.innerDiameter ?? 0
          let newInner = inner
          if (outer <= inner + MIN_GAP) newInner = Math.max(10, outer - MIN_GAP)

          const boltR = (params.boltHoleDiameter ?? 14) / 2
          const minCircle = newInner + 2 * boltR + 2
          const maxCircle = outer - 2 * boltR - 2
          const curr = params.boltCircleDiameter ?? Math.max(outer - 60, newInner + 40)
          let newCircle = Math.min(Math.max(curr, minCircle), maxCircle)

          setParams(p => ({ ...p, outerDiameter: outer, innerDiameter: newInner, boltCircleDiameter: newCircle }))
        }}
      />
      <Typography variant="caption" sx={{ textAlign: 'right', mb: 1 }}>{params.outerDiameter ?? 0} mm</Typography>

      <Typography>Inner Diameter</Typography>
      <Slider
        min={40}
        max={300}
        value={params.innerDiameter}
        onChange={(_, v) => {
          const MIN_GAP = 10
          const inner = v as number
          let outer = params.outerDiameter ?? 200
          if (inner >= outer - MIN_GAP) outer = inner + MIN_GAP

          const boltR = (params.boltHoleDiameter ?? 14) / 2
          const minCircle = inner + 2 * boltR + 2
          const maxCircle = outer - 2 * boltR - 2

          const curr = params.boltCircleDiameter ?? Math.max(outer - 60, inner + 40)
          let newCircle = Math.min(Math.max(curr, minCircle), maxCircle)

          setParams(p => ({ ...p, innerDiameter: inner, outerDiameter: outer, boltCircleDiameter: newCircle }))
        }}
      />
      <Typography variant="caption" sx={{ textAlign: 'right', mb: 1 }}>{params.innerDiameter ?? 0} mm</Typography>

      <Typography>Thickness</Typography>
      <Slider min={10} max={80} value={params.thickness} onChange={(_, v) => setParams(p => ({ ...p, thickness: v as number }))} />
      <Typography variant="caption" sx={{ textAlign: 'right', mb: 1 }}>{params.thickness ?? 0} mm</Typography>

      <Typography>Bolt Count</Typography>
      {minCircle > maxCircle ? (
        <>
          <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1 }}>Bolt circle unavailable (inner/outer/hole sizes conflict).</Typography>
          <Typography variant="caption" sx={{ textAlign: 'right', mb: 1 }}>No bolts</Typography>
        </>
      ) : (
        <>
          <Slider min={3} max={Math.max(6, maxBolts)} step={1} value={clamped} onChange={(_, v) => setParams(p => ({ ...p, boltCount: Math.min(v as number, maxBolts) }))} />
          <Typography variant="caption" sx={{ textAlign: 'right', mb: 1 }}>{clamped} bolts (max {maxBolts})</Typography>
        </>
      )}

      <Typography>Bolt Hole Diameter</Typography>
      <Slider
        min={8}
        max={30}
        value={params.boltHoleDiameter ?? 14}
        onChange={(_, v) => {
          const hole = v as number
          const boltR = hole / 2
          const minCircle = (params.innerDiameter ?? 0) + 2 * boltR + 2
          const maxCircle = (params.outerDiameter ?? 0) - 2 * boltR - 2
          const curr = params.boltCircleDiameter ?? Math.max((params.outerDiameter ?? 200) - 60, (params.innerDiameter ?? 100) + 40)
          let newCircle = Math.min(Math.max(curr, minCircle), maxCircle)

          setParams(p => ({ ...p, boltHoleDiameter: hole, boltCircleDiameter: newCircle }))
        }}
      />
      <Typography variant="caption" sx={{ textAlign: 'right', mb: 1 }}>{params.boltHoleDiameter ?? 0} mm</Typography>
    </Box>
  )
}

export default ControlPanel
