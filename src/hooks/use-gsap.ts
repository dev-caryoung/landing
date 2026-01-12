"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Hook for basic GSAP animations
export function useGsap<T extends HTMLElement = HTMLElement>(
  callback: (element: T, gsapInstance: typeof gsap) => void | (() => void),
  deps: React.DependencyList = []
) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const cleanup = callback(elementRef.current, gsap);

    return () => {
      if (typeof cleanup === "function") {
        cleanup();
      }
      // Kill all scroll triggers associated with this element
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === elementRef.current) {
          trigger.kill();
        }
      });
    };
  }, deps);

  return elementRef;
}

// Hook for scroll-triggered animations
export function useScrollAnimation<T extends HTMLElement = HTMLElement>(
  animation: (element: T) => gsap.core.Tween | gsap.core.Timeline | ScrollTrigger | void,
  options?: {
    start?: string;
    end?: string;
    markers?: boolean;
  }
) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      animation(elementRef.current!);
    }, elementRef);

    return () => ctx.revert();
  }, []);

  return elementRef;
}

// Hook for fade-up animation on scroll
export function useFadeUp<T extends HTMLElement = HTMLElement>(
  options?: {
    y?: number;
    duration?: number;
    delay?: number;
    start?: string;
  }
) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    gsap.set(element, { y: options?.y ?? 60, opacity: 0 });

    const animation = gsap.to(element, {
      y: 0,
      opacity: 1,
      duration: options?.duration ?? 1,
      delay: options?.delay ?? 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: options?.start ?? "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === element)
        .forEach((t) => t.kill());
    };
  }, []);

  return elementRef;
}

// Hook for text reveal animation
export function useTextReveal<T extends HTMLElement = HTMLElement>(
  options?: {
    delay?: number;
    stagger?: number;
    scrollTrigger?: boolean;
  }
) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const lines = element.querySelectorAll(".line");

    if (lines.length === 0) return;

    gsap.set(lines, { y: "100%", opacity: 0 });

    const animationConfig: gsap.TweenVars = {
      y: "0%",
      opacity: 1,
      duration: 1,
      stagger: options?.stagger ?? 0.1,
      ease: "power4.out",
      delay: options?.delay ?? 0,
    };

    if (options?.scrollTrigger) {
      animationConfig.scrollTrigger = {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse",
      };
    }

    const animation = gsap.to(lines, animationConfig);

    return () => {
      animation.kill();
    };
  }, []);

  return elementRef;
}

// Hook for stagger reveal
export function useStaggerReveal<T extends HTMLElement = HTMLElement>(
  selector: string,
  options?: {
    stagger?: number;
    y?: number;
    start?: string;
  }
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll(selector);

    if (items.length === 0) return;

    gsap.set(items, { y: options?.y ?? 40, opacity: 0 });

    const animation = gsap.to(items, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: options?.stagger ?? 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: options?.start ?? "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === containerRef.current)
        .forEach((t) => t.kill());
    };
  }, [selector]);

  return containerRef;
}

// Hook for parallax effect
export function useParallax<T extends HTMLElement = HTMLElement>(
  speed: number = 0.5
) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    const animation = gsap.to(element, {
      yPercent: -20 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      animation.kill();
    };
  }, [speed]);

  return elementRef;
}

// Hook for counter animation
export function useCounter<T extends HTMLElement = HTMLElement>(
  endValue: number,
  options?: {
    duration?: number;
    suffix?: string;
    prefix?: string;
  }
) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const obj = { value: 0 };

    const animation = gsap.to(obj, {
      value: endValue,
      duration: options?.duration ?? 2,
      ease: "power2.out",
      onUpdate: () => {
        const prefix = options?.prefix ?? "";
        const suffix = options?.suffix ?? "";
        element.textContent = `${prefix}${Math.round(obj.value).toLocaleString()}${suffix}`;
      },
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      animation.kill();
    };
  }, [endValue]);

  return elementRef;
}
