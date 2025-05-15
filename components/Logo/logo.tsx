import Image from "next/image"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  withText?: boolean
  className?: string
}

export function Logo({ size = "md", withText = true, className = "" }: LogoProps) {
  const sizes = {
    sm: { width: 24, height: 24 },
    md: { width: 32, height: 32 },
    lg: { width: 48, height: 48 },
  }

  return (
    <div className={`flex items-center ${className}`}>
      {/* <div className="relative">
        <Image
          src="/images/logo.png"
          alt="DE UNIQUE ROYAL CHOICE DRY CLEANERS"
          width={sizes[size].width}
          height={sizes[size].height}
          className="object-contain"
        />
      </div> */}
      {withText && (
        <div className="flex flex-col">
          <span className="max-sm:text-sm font-bold text-brand-purple leading-tight">DE UNIQUE ROYAL CHOICE</span>
          <span className="max-sm:text-sm font-bold text-brand-yellow leading-tight tracking-wider">DRY CLEANERS</span>
        </div>
      )}
    </div>
  )
}
