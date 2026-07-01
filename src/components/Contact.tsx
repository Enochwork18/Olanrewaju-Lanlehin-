"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Mail, MessageCircle, Send, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { personalInfo, closingText, socialLinks } from "@/data/data";
import DecorativeAccents from "./DecorativeAccents";

interface FormFields {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  from_name?: string;
  from_email?: string;
  subject?: string;
  message?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [fields, setFields] = useState<FormFields>({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!fields.from_name.trim()) errs.from_name = "Name is required";
    if (!fields.from_email.trim()) {
      errs.from_email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.from_email)) {
      errs.from_email = "Please enter a valid email address";
    }
    if (!fields.subject.trim()) errs.subject = "Subject is required";
    if (!fields.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: fields.from_name,
          from_email: fields.from_email,
          subject: fields.subject,
          message: fields.message,
          to_email: "olanrewajulanlehin5@gmail.com",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("success");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section id="contact" ref={ref} className="relative px-4 md:px-8 lg:px-16 xl:px-24 py-16 md:py-24 scroll-mt-20">
        <DecorativeAccents />
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl mb-12 text-near-black"
          >
            Get in <span className="text-accent">Touch</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <Send size={28} className="text-accent" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-near-black mb-3">
              Thanks {fields.from_name.split(" ")[0]}!
            </h3>
            <p className="text-mid-grey text-base leading-relaxed">
              Your message has been sent! Olanrewaju will get back to you shortly.
            </p>
            <button
              onClick={() => {
                setStatus("idle");
                setFields({ from_name: "", from_email: "", subject: "", message: "" });
              }}
              className="mt-6 text-accent underline text-sm hover:text-accent/80 transition-colors"
            >
              Send another message
            </button>
          </motion.div>
        </div>
        <div className="section-divider max-w-7xl mx-auto" />
      </section>
    );
  }

  return (
    <section id="contact" ref={ref} className="relative px-4 md:px-8 lg:px-16 xl:px-24 py-16 md:py-24 scroll-mt-20">
      <DecorativeAccents />
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl mb-12 text-near-black"
        >
          Get in <span className="text-accent">Touch</span>
        </motion.h2>

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-accent/10 border border-accent/30 text-accent text-sm"
          >
            Something went wrong. Please try again or email directly at{" "}
            <a href="mailto:olanrewajulanlehin5@gmail.com" className="underline">
              olanrewajulanlehin5@gmail.com
            </a>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-2 md:order-1"
          >
            <div className="relative w-full aspect-[4/3] max-w-md mx-auto md:mx-0 rounded-2xl overflow-hidden mb-8">
              <div className="absolute inset-0 border-2 border-accent rounded-2xl -translate-x-2 -translate-y-2 z-10 pointer-events-none" />
              <Image
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&q=80"
                alt="Contact"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-3 max-w-md mx-auto md:mx-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-accent" />
                </div>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-mid-grey hover:text-accent transition-colors text-sm md:text-base"
                >
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <MessageCircle size={18} className="text-accent" />
                </div>
                <a
                  href="https://wa.me/2349065011800"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mid-grey hover:text-accent transition-colors text-sm md:text-base"
                >
                  {personalInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent/20 hover:scale-110 transition-all"
                  aria-label="Facebook"
                >
                  <FacebookIcon size={18} />
                </a>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent/20 hover:scale-110 transition-all"
                  aria-label="Instagram"
                >
                  <InstagramIcon size={18} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 md:order-2"
          >
            <p className="text-near-black text-base md:text-lg leading-relaxed mb-8 font-serif italic">
              &ldquo;{closingText}&rdquo;
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="from_name" className="sr-only">Name</label>
                <input
                  id="from_name"
                  name="from_name"
                  type="text"
                  placeholder="Your Name *"
                  value={fields.from_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-card-bg border border-accent/20 text-near-black placeholder-mid-grey focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors text-sm"
                />
                {errors.from_name && <p className="text-accent text-xs mt-1">{errors.from_name}</p>}
              </div>
              <div>
                <label htmlFor="from_email" className="sr-only">Email</label>
                <input
                  id="from_email"
                  name="from_email"
                  type="email"
                  placeholder="Your Email Address *"
                  value={fields.from_email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-card-bg border border-accent/20 text-near-black placeholder-mid-grey focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors text-sm"
                />
                {errors.from_email && <p className="text-accent text-xs mt-1">{errors.from_email}</p>}
              </div>
              <div>
                <label htmlFor="subject" className="sr-only">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Subject *"
                  value={fields.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-card-bg border border-accent/20 text-near-black placeholder-mid-grey focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors text-sm"
                />
                {errors.subject && <p className="text-accent text-xs mt-1">{errors.subject}</p>}
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Your Message *"
                  value={fields.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-card-bg border border-accent/20 text-near-black placeholder-mid-grey focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors text-sm resize-none"
                />
                {errors.message && <p className="text-accent text-xs mt-1">{errors.message}</p>}
              </div>
              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={status === "loading" ? {} : { scale: 1.05 }}
                whileTap={status === "loading" ? {} : { scale: 0.95 }}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white rounded-full font-medium text-sm hover:bg-accent/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
      <div className="section-divider max-w-7xl mx-auto" />
    </section>
  );
}
