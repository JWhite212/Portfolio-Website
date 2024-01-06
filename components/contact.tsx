"use client";

import { useSectionInView } from "@/lib/hooks";
import { FaPaperPlane } from "react-icons/fa";
import SectionHeading from "./section-heading";

export default function Contact() {
  const { ref } = useSectionInView("Contact");

  return (
    <section
      ref={ref}
      id="contact"
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] ">
      <SectionHeading>Contact Me</SectionHeading>
      <p className="text-">
        Please contact me directly at{" "}
        <a
          className="underline"
          href="mailto:jamiecs@live.co.uk">
          jamiecs@live.co.uk
        </a>{" "}
        or through this form.
      </p>
	  <form>
		<input type="email" placeholder="Email" />
		<textarea/>
		<button type="submit">Submit <FaPaperPlane/></button>
	  </form>

    </section>
  );
}
