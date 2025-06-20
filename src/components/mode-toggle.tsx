"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { usePathname } from "next/navigation";



export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const pathname = usePathname();

  if (
    pathname === "/"

  ) {
    return null;
  }

  return (
    // <TooltipProvider disableHoverableContent>
    //   <Tooltip delayDuration={100}>
    //     <TooltipTrigger>
    <div
      role="button"
      className="rounded-full w-8 h-8 bg-background mr-2 flex items-center justify-center border border-input hover:bg-accent hover:text-accent-foreground"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <SunIcon className="w-[1.2rem] h-[1.2rem] rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100" />
      <MoonIcon className="absolute w-[1.2rem] h-[1.2rem] rotate-0 scale-1000 transition-transform ease-in-out duration-500 dark:-rotate-90 dark:scale-0" />
      <span className="sr-only">Switch Theme</span>
    </div>
    //     </TooltipTrigger>
    //     <TooltipContent side="bottom">Switch Theme</TooltipContent>
    //   </Tooltip>
    // </TooltipProvider>
  );
}