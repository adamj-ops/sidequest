"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Using a simplified approach to avoid TypeScript errors
export function ThemeProvider({ children, ...props }: React.PropsWithChildren<any>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
