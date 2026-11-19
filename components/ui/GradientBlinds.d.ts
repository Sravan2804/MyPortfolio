import React from 'react';

export interface GradientBlindsProps {
  className?: string;
  style?: React.CSSProperties;
  dpr?: number;
  paused?: boolean;
  gradientColors?: string[];
  angle?: number;
  noise?: number;
  blindCount?: number;
  blindMinWidth?: number;
  mouseDampening?: number;
  mirrorGradient?: boolean;
  spotlightRadius?: number;
  spotlightSoftness?: number;
  spotlightOpacity?: number;
  distortAmount?: number;
  shineDirection?: 'left' | 'right';
  lightColor?: string;
  perspective?: number;
  gradientSpeed?: number;
  shine?: number;
  relief?: number;
  glow?: number;
  sway?: number;
  speed?: number;
  hoverTilt?: number;
  clickEffect?: 'ripple' | 'none';
  idle?: 'drift' | 'center' | 'stay';
  intro?: boolean;
  mixBlendMode?: string;
  lightMode?: boolean;
}

declare const GradientBlinds: React.FC<GradientBlindsProps>;
export default GradientBlinds;
