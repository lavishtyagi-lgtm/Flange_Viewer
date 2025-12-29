import type{ FC } from 'react'
import { 
  Box,
  Typography,
  Slider,
  Select,
  MenuItem
} from '@mui/material' 
import type { FlangeParams, FlangeType } from '../types'

interface Props {
  flangeType: FlangeType
  setFlangeType: (type: FlangeType) => void
  params: FlangeParams
  setParams: React.Dispatch<React.SetStateAction<FlangeParams>>
}

const ControlPanel: FC<Props> = ({
  flangeType,
  setFlangeType,
  params,
  setParams
}) => {
  return (
    <Box sx={{ width: 300, p: 2 }}>
      <Typography variant="subtitle1">Flange Type</Typography>
      <Select
        fullWidth
        value={flangeType}
        onChange={e => setFlangeType(e.target.value as FlangeType)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="simple">Simple</MenuItem>
        <MenuItem value="slip-on">Slip On</MenuItem>
        <MenuItem value="weld-neck">Weld Neck</MenuItem>
      </Select>

      <Typography>Outer Diameter</Typography>
      <Slider
        min={100}
        max={400}
        value={params.outerDiameter}
        onChange={(_, v) =>
          setParams(p => ({ ...p, outerDiameter: v as number }))
        }
      />
      <Typography variant="caption" sx={{ textAlign: 'right', mb: 1 }}>{params.outerDiameter ?? 0} mm</Typography> 

      <Typography>Inner Diameter</Typography>
      <Slider
        min={40}
        max={300}
        value={params.innerDiameter}
        onChange={(_, v) =>
          setParams(p => ({ ...p, innerDiameter: v as number }))
        }
      />
      <Typography variant="caption" sx={{ textAlign: 'right', mb: 1 }}>{params.innerDiameter ?? 0} mm</Typography> 

      <Typography>Thickness</Typography>
      <Slider
        min={10}
        max={80}
        value={params.thickness}
        onChange={(_, v) =>
          setParams(p => ({ ...p, thickness: v as number }))
        }
      />
      <Typography variant="caption" sx={{ textAlign: 'right', mb: 1 }}>{params.thickness ?? 0} mm</Typography> 
      <Typography>Bolt Count</Typography>
      <Slider
        min={3}
        max={16}
        step={1}
        value={params.boltCount ?? 8}
        onChange={(_, v) =>
          setParams(p => ({ ...p, boltCount: v as number }))
        }
      />
      <Typography variant="caption" sx={{ textAlign: 'right', mb: 1 }}>{params.boltCount ?? 0} bolts</Typography>

      <Typography>Bolt Hole Diameter</Typography>
      <Slider
        min={8}
        max={30}
        value={params.boltHoleDiameter ?? 14}
        onChange={(_, v) =>
          setParams(p => ({ ...p, boltHoleDiameter: v as number }))
        }
      />
      <Typography variant="caption" sx={{ textAlign: 'right', mb: 1 }}>{params.boltHoleDiameter ?? 0} mm</Typography>
    </Box>
  )
}

export default ControlPanel
