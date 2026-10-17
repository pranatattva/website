"use client";
import { useEffect } from "react";
// Lets the hover outline appear when boxes are tapped on phones
export default function TouchHover() {
  useEffect(() => {
    const noop = () => {};
    document.addEventListener("touchstart", noop, { passive: true });
    return () => document.removeEventListener("touchstart", noop);
  }, []);
  return null;
}
