import React, { forwardRef, SVGProps } from 'react'
import { cn } from "@/lib/utils"

export interface SVGProperties extends React.SVGAttributes<SVGSVGElement> {
  asChild?: boolean
  useGsap?: boolean
  children?: React.ReactNode
  href?: string
}

const LoadingSpinner = forwardRef<SVGSVGElement, SVGProperties>(
  ({ className, ...properties }, reference) => {
    return (
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ref={reference}
        className={cn('size-6 animate-spin stroke-current', className)}
        {...properties}
      >
        <g className="spinner_V8m1">
          <circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="3"></circle>
        </g>
      </svg>
    )
  }
)

export function LoaderSpinner({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('animate-spin', className)}
      {...props}
    >
      <path
        d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM2.50109 8C2.50109 11.037 4.96304 13.4989 8 13.4989C11.037 13.4989 13.4989 11.037 13.4989 8C13.4989 4.96304 11.037 2.50109 8 2.50109C4.96304 2.50109 2.50109 4.96304 2.50109 8Z"
        fill="inherit"
      />
      <path
        d="M8 0C9.05058 1.2528e-08 10.0909 0.206926 11.0615 0.608964C12.0321 1.011 12.914 1.60028 13.6569 2.34315C14.3997 3.08602 14.989 3.96793 15.391 4.93853C15.7931 5.90914 16 6.94943 16 8H13.4989C13.4989 7.27787 13.3567 6.56282 13.0803 5.89566C12.804 5.2285 12.3989 4.6223 11.8883 4.11168C11.3777 3.60106 10.7715 3.19602 10.1043 2.91967C9.43718 2.64332 8.72213 2.50109 8 2.50109V0Z"
        fill="currentColor"
      />
    </svg>
  )
}

LoadingSpinner.displayName = 'LoadingSpinner'
export default LoadingSpinner
