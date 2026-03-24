"use client";

import { Suspense, lazy } from "react";
const Spline = lazy(() => import("@splinetool/react-spline"));

export function SplineScene({ scene, className }) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-black/10 backdrop-blur-sm">
          <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  );
}
