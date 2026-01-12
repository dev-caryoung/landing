import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Easing functions
export const easings = {
  smooth: "power2.out",
  smooth2: "power3.out",
  smooth3: "power4.out",
  expo: "expo.out",
  elastic: "elastic.out(1, 0.5)",
  bounce: "bounce.out",
  custom: "M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1",
};

// Text reveal animation
export function animateTextReveal(
  element: HTMLElement,
  options?: {
    delay?: number;
    duration?: number;
    stagger?: number;
  }
) {
  const lines = element.querySelectorAll(".line");

  if (lines.length === 0) return;

  gsap.set(lines, { y: "100%", opacity: 0 });

  return gsap.to(lines, {
    y: "0%",
    opacity: 1,
    duration: options?.duration ?? 1,
    stagger: options?.stagger ?? 0.1,
    ease: easings.smooth3,
    delay: options?.delay ?? 0,
  });
}

// Fade up animation
export function animateFadeUp(
  elements: HTMLElement | HTMLElement[] | NodeListOf<Element>,
  options?: {
    delay?: number;
    duration?: number;
    stagger?: number;
    y?: number;
  }
) {
  gsap.set(elements, { y: options?.y ?? 60, opacity: 0 });

  return gsap.to(elements, {
    y: 0,
    opacity: 1,
    duration: options?.duration ?? 1,
    stagger: options?.stagger ?? 0.1,
    ease: easings.smooth3,
    delay: options?.delay ?? 0,
  });
}

// Scroll trigger fade up
export function scrollFadeUp(
  elements: HTMLElement | HTMLElement[] | NodeListOf<Element>,
  options?: {
    start?: string;
    end?: string;
    stagger?: number;
    y?: number;
  }
) {
  gsap.set(elements, { y: options?.y ?? 60, opacity: 0 });

  return gsap.to(elements, {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: options?.stagger ?? 0.1,
    ease: easings.smooth3,
    scrollTrigger: {
      trigger: elements instanceof NodeList ? elements[0] : elements,
      start: options?.start ?? "top 80%",
      end: options?.end ?? "bottom 20%",
      toggleActions: "play none none reverse",
    },
  });
}

// Character-by-character reveal
export function animateCharacters(
  element: HTMLElement,
  options?: {
    delay?: number;
    duration?: number;
    stagger?: number;
  }
) {
  const chars = element.querySelectorAll(".char");

  if (chars.length === 0) return;

  gsap.set(chars, { opacity: 0.4 });

  return gsap.to(chars, {
    opacity: 1,
    duration: options?.duration ?? 0.05,
    stagger: options?.stagger ?? 0.02,
    ease: "none",
    delay: options?.delay ?? 0,
  });
}

// Scroll-triggered character reveal
export function scrollCharacterReveal(
  element: HTMLElement,
  options?: {
    start?: string;
    end?: string;
  }
) {
  const chars = element.querySelectorAll(".char");

  if (chars.length === 0) return;

  gsap.set(chars, { opacity: 0.3 });

  return gsap.to(chars, {
    opacity: 1,
    duration: 0.05,
    stagger: 0.02,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: options?.start ?? "top 80%",
      end: options?.end ?? "top 40%",
      scrub: 1,
    },
  });
}

// Parallax effect
export function parallax(
  element: HTMLElement,
  options?: {
    speed?: number;
    start?: string;
    end?: string;
  }
) {
  const speed = options?.speed ?? 0.5;

  return gsap.to(element, {
    yPercent: -20 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element.parentElement,
      start: options?.start ?? "top bottom",
      end: options?.end ?? "bottom top",
      scrub: true,
    },
  });
}

// Pin section with content animation
export function pinSection(
  trigger: HTMLElement,
  content: HTMLElement,
  options?: {
    pinnedDuration?: string;
  }
) {
  return ScrollTrigger.create({
    trigger,
    start: "top top",
    end: options?.pinnedDuration ?? "+=200%",
    pin: true,
    pinSpacing: true,
    onUpdate: (self) => {
      // Progress can be used for animations
      const progress = self.progress;
      gsap.set(content, { opacity: 1 - progress * 0.5 });
    },
  });
}

// Counter animation
export function animateCounter(
  element: HTMLElement,
  endValue: number,
  options?: {
    duration?: number;
    suffix?: string;
    prefix?: string;
  }
) {
  const obj = { value: 0 };

  return gsap.to(obj, {
    value: endValue,
    duration: options?.duration ?? 2,
    ease: easings.smooth2,
    onUpdate: () => {
      const prefix = options?.prefix ?? "";
      const suffix = options?.suffix ?? "";
      element.textContent = `${prefix}${Math.round(obj.value).toLocaleString()}${suffix}`;
    },
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
}

// Stagger reveal for grid items
export function staggerReveal(
  container: HTMLElement,
  items: NodeListOf<Element> | HTMLElement[],
  options?: {
    stagger?: number;
    start?: string;
  }
) {
  gsap.set(items, { y: 40, opacity: 0 });

  return gsap.to(items, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: options?.stagger ?? 0.1,
    ease: easings.smooth3,
    scrollTrigger: {
      trigger: container,
      start: options?.start ?? "top 70%",
      toggleActions: "play none none reverse",
    },
  });
}

// Header animation
export function animateHeader(header: HTMLElement) {
  gsap.set(header, { y: -40, opacity: 0 });

  return gsap.to(header, {
    y: 0,
    opacity: 1,
    duration: 1,
    delay: 0.5,
    ease: easings.smooth3,
  });
}

// Scale reveal for images
export function scaleReveal(
  element: HTMLElement,
  options?: {
    start?: string;
    duration?: number;
  }
) {
  gsap.set(element, { scale: 1.2, opacity: 0 });

  return gsap.to(element, {
    scale: 1,
    opacity: 1,
    duration: options?.duration ?? 1.5,
    ease: easings.smooth3,
    scrollTrigger: {
      trigger: element,
      start: options?.start ?? "top 80%",
      toggleActions: "play none none reverse",
    },
  });
}

// Progress bar animation
export function createProgressBar(progressBar: HTMLElement) {
  return gsap.to(progressBar, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
    },
  });
}
