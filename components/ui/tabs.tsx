"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn("group/tabs flex flex-col gap-2", className)}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex items-center gap-2 rounded-none p-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        line: "gap-2 border-b border-white/10 bg-transparent pb-3",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function TabsList({
  className,
  variant = "default",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-none text-sm font-medium whitespace-nowrap transition-all outline-none select-none",
        // Passive / Inactive tab styles
        "border border-white/10 bg-[#202020] text-[#969696]",
        "hover:border-white/25 hover:bg-[#242424] hover:text-white",
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-[#da291c]",
        "disabled:pointer-events-none disabled:opacity-50",
        // Active tab styles (data-active & aria-selected)
        "data-active:border-[#da291c] data-active:bg-[#da291c]/10 data-active:text-white data-active:shadow-[inset_0_-2px_0_#da291c]",
        "aria-selected:border-[#da291c] aria-selected:bg-[#da291c]/10 aria-selected:text-white aria-selected:shadow-[inset_0_-2px_0_#da291c]",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
