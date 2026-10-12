"use client";

import { MotionConfig } from "motion/react";

// Respeita o "reduzir movimento" do sistema: a Motion desliga deslocamentos e loops,
// mantendo só as transições de opacidade
export default function Movimento({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
