export type FlangeType = 'simple' | 'slip-on' | 'weld-neck'

export interface FlangeParams {
  outerDiameter?: number
  innerDiameter?: number
  thickness?: number

  boltCount?: number
  boltHoleDiameter?: number
  boltCircleDiameter?: number

  // Slip-on / Weld-neck specific options
  hubHeight?: number
  hubDiameter?: number
  neckLength?: number
  neckEndDiameter?: number
}  
