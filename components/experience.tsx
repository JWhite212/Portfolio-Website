"use client";

import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import React from "react";
import { motion } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import SectionHeading from "./section-heading";

export default function Experience() {
  const { ref } = useSectionInView("Experience", 0.5);

  return (
    <section
      id="experience"
      ref={ref}
      className="scroll-mt-28 mb-24 sm:mb-40 w-full max-w-3xl px-4 mx-auto">
      <SectionHeading>My experience</SectionHeading>
      <VerticalTimeline lineColor="">
        {experiencesData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 * index }}
          >
            <VerticalTimelineElement
              visible={true}
              contentStyle={{
                background: "var(--vt-bg, #f3f4f6)",
                color: "var(--vt-text, #18181b)",
                boxShadow: "none",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                textAlign: "left",
                padding: "1.3rem 2rem 1.3rem 2rem",
              }}
              contentArrowStyle={{
                borderRight: "0.4rem solid #9ca3af",
              }}
              icon={item.icon}
              iconStyle={{
                background: "white",
                fontSize: "1.5rem",
              }}
              className="[&_.vertical-timeline-element-content]:dark:!bg-neutral-dark [&_.vertical-timeline-element-content]:dark:!text-gray-100">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold capitalize">{item.title}</h3>
                <span className="text-xs text-gray-500 dark:text-gray-300 whitespace-nowrap ml-4">{item.date}</span>
              </div>
              <p className="font-normal !mt-0">{item.location}</p>
              <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75">
                {item.description}
              </p>
            </VerticalTimelineElement>
          </motion.div>
        ))}
      </VerticalTimeline>
    </section>
  );
}
