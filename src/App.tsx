import { useState } from 'react'
import { Box, Paper } from '@mui/material'
import { Header } from './components/Header'
import ControlPanel from './components/ControlPanel'
import CanvasScene from './components/CanvasScene'
import type{ FlangeParams, FlangeType } from './types'

const initialParams: FlangeParams = {
  outerDiameter: 200,
  innerDiameter: 100,
  thickness: 20,
  boltCount: 8,
  boltHoleDiameter: 14,
  boltCircleDiameter: 140,
  hubHeight: 30,
  hubDiameter: 140,
  neckLength: 60,
  neckEndDiameter: 110
}

const App = () => {
  const [flangeType, setFlangeType] = useState<FlangeType>('simple')
  const [params, setParams] = useState<FlangeParams>(initialParams)

  const resetParams = () => {
    setFlangeType('simple')
    setParams(initialParams)
  }
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header flangeType={flangeType} setFlangeType={setFlangeType} reset={resetParams} />

      <Box sx={{ flex: 1, display: 'flex' }}>
        <Paper elevation={3}>
          <ControlPanel
            flangeType={flangeType}
            setFlangeType={setFlangeType}
            params={params}
            setParams={setParams}
          />
        </Paper>

        <Box sx={{ flex: 1 }}>
          <CanvasScene flangeType={flangeType} params={params} />
        </Box>
      </Box>
    </Box>
  )
}

export default App
