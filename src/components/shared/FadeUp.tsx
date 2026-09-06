import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

// ── Single element: fades + slides up when it enters the viewport ──
interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

export function FadeUp({
  children,
  delay = 0,
  duration = 0.65,
  y = 48,
  className = "",
  once = true,
}: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.08 }}
      transition={{ duration, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Stagger container: triggers children one after another ──
interface FadeUpStaggerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
}

const staggerContainer = (stagger: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  },
});

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 44 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease },
  },
};

export function FadeUpStagger({
  children,
  staggerDelay = 0.1,
  className = "",
  once = true,
}: FadeUpStaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.06 }}
      variants={staggerContainer(staggerDelay)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Child item to use inside FadeUpStagger ──
interface FadeUpItemProps {
  children: ReactNode;
  className?: string;
}

export function FadeUpItem({ children, className = "" }: FadeUpItemProps) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}

// ── Slide from left (for left-side content in two-column layouts) ──
export function FadeLeft({
  children,
  delay = 0,
  className = "",
}: Pick<FadeUpProps, "children" | "delay" | "className">) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Slide from right (for right-side images in two-column layouts) ──
export function FadeRight({
  children,
  delay = 0,
  className = "",
}: Pick<FadeUpProps, "children" | "delay" | "className">) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Hero: animate immediately on mount (not scroll-triggered) ──
interface HeroFadeProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

export function HeroFade({ children, delay = 0, y = 32, className = "" }: HeroFadeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
