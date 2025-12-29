import type { FC } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid } from '@react-three/drei'
import FlangeRenderer from './FlangeRenderer'
import type { FlangeParams, FlangeType } from '../types'

interface Props {
  flangeType: FlangeType
  params: FlangeParams
}

const CanvasScene: FC<Props> = ({ flangeType, params }) => {
  return (
    <Canvas camera={{ position: [300, 200, 300], fov: 45 }}>
      <hemisphereLight args={[0xffffff, 0x444444, 0.6]} />
      <directionalLight position={[200, 200, 200]} intensity={0.8} castShadow />
      <ambientLight intensity={0.25} />

      <FlangeRenderer type={flangeType} params={params} />

      <Grid args={[500, 500]} />
      <axesHelper args={[150]} />
      <OrbitControls />
    </Canvas>
  )
}

export default CanvasScene
