'use client'

import { useWindowWidth } from '@/hooks/use-window-width'
import { BREAKPOINT_VALUES, BREAKPOINTS } from '@/lib/constants'
import { type ReactNode } from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BreakpointsArray = Object.values(BREAKPOINTS)

type Breakpoints = (typeof BreakpointsArray)[number]

export const MediaQuery = ({
  breakpoint,
  mediaQuery,
  children,
}: {
  breakpoint: Breakpoints
  mediaQuery: 'max' | 'min'
  children: ReactNode
}) => {
  const width = useWindowWidth()
  const showChildren =
    mediaQuery === 'max'
      ? width < BREAKPOINT_VALUES[breakpoint]
      : width > BREAKPOINT_VALUES[breakpoint]

  if (!showChildren) {
    return null
  }

  return children
}
