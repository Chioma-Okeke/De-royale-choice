export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^0\d{10}$/;

export const BREAKPOINTS = {
    "2XS": "2xs",
    XS: "xs",
    SM: "sm",
    MD: "md",
    LG: "lg",
    XL: "xl",
} as const;

export const BREAKPOINT_VALUES = {
    "2xs": 359,
    xs: 479,
    sm: 639,
    md: 767,
    lg: 1023,
    xl: 1279,
} as const;
