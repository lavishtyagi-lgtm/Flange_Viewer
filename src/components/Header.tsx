import { AppBar, Toolbar, Typography, Box, Select, MenuItem, Button } from '@mui/material'
import type { FlangeType } from '../types'

interface HeaderProps {
  flangeType: FlangeType
  setFlangeType: (t: FlangeType) => void
  reset: () => void
}

export function Header({ flangeType, setFlangeType, reset }: HeaderProps) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, cursor: 'default', '&:hover': { transform: 'scale(1.03)', transition: 'transform .12s' } }}
        >
          Flange Viewer
        </Typography>

        <Box sx={{ flex: 1 }} />

        {/* Quick flange type selector */}
        <Select
          value={flangeType}
          onChange={e => setFlangeType(e.target.value as FlangeType)}
          size="small"
          variant="standard"
          sx={{ mr: 2, color: 'white' }}
        >
          <MenuItem value="simple">Simple</MenuItem>
          <MenuItem value="slip-on">Slip On</MenuItem>
          <MenuItem value="weld-neck">Weld Neck</MenuItem>
        </Select>

        <Button size="small" variant="outlined" color="inherit" onClick={reset} sx={{ ml: 1 }}>
          Reset
        </Button>
      </Toolbar>
    </AppBar>
  )
}  

