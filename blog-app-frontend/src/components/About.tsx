"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function About() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased gap-12 bg-white dark:bg-black dark:bg-grid-lime-300/[0.2] items-center justify-center relative overflow-hidden" id="about">
      
      <div>
        <div className="text-center">
            <h2 className="sm:text-4xl text-2xl text-lime-400 font-bold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-2xl leading-8 font-extrabold tracking-wide text-white sm:text-5xl">Know What Our Users Say</p>
        </div>
      </div>

      <div>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
      </div>

    </div>
  );
}

const testimonials = [
  {
    quote:
    "Done is better than perfect.  Don't let the fear of making mistakes hold you back.  Progress happens one step, one imperfect action at a time.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "The best things in life are often the most unexpected.  Embrace spontaneity, take chances, and be open to new experiences.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
    "Never stop learning.  The world is constantly changing, and so should you.  Embrace lifelong learning and keep your mind curious.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];
