"use client";

import { useState, useEffect, useRef } from "react";

export function useTypewriterSingle(
  text: string,
  speed = 80,
  startDelay = 0
) {
  const [charIndex, setCharIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    if (charIndex < text.length) {
      const timer = setTimeout(() => setCharIndex((i) => i + 1), speed);
      return () => clearTimeout(timer);
    }
  }, [charIndex, text, speed, started]);

  return text.substring(0, charIndex);
}

export function useTypewriterRotator(
  texts: string[],
  typeSpeed = 80,
  deleteSpeed = 50,
  pauseAfterType = 2000,
  startDelay = 0
) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);
  const pauseRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;

    const currentText = texts[textIndex];

    if (!isDeleting && charIndex >= currentText.length) {
      const timer = setTimeout(() => setIsDeleting(true), pauseAfterType);
      pauseRef.current = timer;
      return () => clearTimeout(timer);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((i) => (i + 1) % texts.length);
      return;
    }

    const speed = isDeleting ? deleteSpeed : typeSpeed;
    const timer = setTimeout(() => {
      setCharIndex((i) => (isDeleting ? i - 1 : i + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, texts, typeSpeed, deleteSpeed, pauseAfterType, started]);

  return texts[textIndex].substring(0, charIndex);
}
