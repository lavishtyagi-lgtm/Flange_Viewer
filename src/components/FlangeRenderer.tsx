import type { FC } from 'react'
import SimpleFlange from '../flanges/SimpleFlange'
import SlipOnFlange from '../flanges/SlipOnFlange'
import WeldNeckFlange from '../flanges/WeldNeckFlange'
import type { FlangeParams, FlangeType } from '../types'

interface Props {
  type: FlangeType
  params: FlangeParams
}

const FlangeRenderer: FC<Props> = ({ type, params }) => {
  switch (type) {
    case 'slip-on':
      return <SlipOnFlange {...params} />
    case 'weld-neck':
      return <WeldNeckFlange {...params} />
    default:
      return <SimpleFlange {...params} />
  }
}

export default FlangeRenderer
