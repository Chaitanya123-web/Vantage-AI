// src/components/ImageSlider.jsx
import React, { useState } from "react";

const slides = [
];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);


}
