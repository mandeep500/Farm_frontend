"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormData } from "../../schemas/contact.schema";
import { contactService } from "../../services/contact.service";
import { APP_CONFIG } from "../../lib/constants";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { ErrorMessage } from "../ui/ErrorMessage";
import { SuccessMessage } from "../ui/SuccessMessage";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  User,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Calendar,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export function ContactSection() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{ name: string; ticketId?: string; message: string } | null>(null);
  const [renderedAt, setRenderedAt] = useState<number>(Date.now());

  useEffect(() => {
    setRenderedAt(Date.now());
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      website: "",
      hp_field: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    setSuccessInfo(null);
    try {
      const response = await contactService.submitContact({
        ...data,
        _renderedAt: renderedAt,
      });

      if (response.success) {
        setSuccessInfo({
          name: data.name,
          ticketId: response.data?.ticketId,
          message:
            response.message ||
            "Your message has been delivered directly to our Gmail inbox. Our agricultural team will be in touch within 24 hours.",
        });
        reset();
      } else {
        setServerError(response.message || "Failed to deliver your message. Please try again.");
      }
    } catch (err: any) {
      setServerError(
        err.message || "Failed to deliver your message. Please check your internet connection or try again."
      );
    }
  };

  return (
    <section id="contact" className="py-24 bg-farm-50/60 border-t border-farm-100 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="farm" className="mb-3">
            Get in Touch
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-farm-950 tracking-tight">
            Connect with Sekhon Farm
          </h2>
          <p className="mt-4 text-base sm:text-lg text-farm-700 leading-relaxed">
            Have questions regarding our seasonal harvest, wholesale organic
            produce, CSA deliveries, or visiting our farm estate? We would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact Info & Farm Visits */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-farm-900 text-white shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-emerald-700/20 rounded-full blur-2xl" />

              <div className="relative z-10 space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  Direct Inquiries
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Farmstead Headquarters
                </h3>
                <p className="text-xs sm:text-sm text-farm-200/90 leading-relaxed">
                  Our family estate is open for seasonal patron visits, farm tours,
                  and fresh gate pickups.
                </p>
              </div>

              {/* Info Items */}
              <div className="space-y-4 pt-2 text-sm text-farm-100">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-farm-800 flex items-center justify-center shrink-0 text-emerald-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-emerald-300 uppercase">
                      Estate Address
                    </p>
                    <p className="text-xs text-farm-100 mt-0.5 leading-relaxed">
                      {APP_CONFIG.contact.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-farm-800 flex items-center justify-center shrink-0 text-emerald-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-emerald-300 uppercase">
                      Direct Telephone
                    </p>
                    <a
                      href={`tel:${APP_CONFIG.contact.phone.replace(/\D/g, "")}`}
                      className="text-xs text-farm-100 hover:text-white transition-colors"
                    >
                      {APP_CONFIG.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-farm-800 flex items-center justify-center shrink-0 text-emerald-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-emerald-300 uppercase">
                      Electronic Mail
                    </p>
                    <a
                      href={`mailto:${APP_CONFIG.contact.email}`}
                      className="text-xs text-farm-100 hover:text-white transition-colors"
                    >
                      {APP_CONFIG.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-farm-800 flex items-center justify-center shrink-0 text-emerald-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-emerald-300 uppercase">
                      Farm Gate Hours
                    </p>
                    <p className="text-xs text-farm-100 mt-0.5 leading-relaxed">
                      {APP_CONFIG.contact.hours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-farm-800">
                <p className="text-xs font-medium text-farm-300 mb-3">
                  Follow Our Harvest Journey:
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href={APP_CONFIG.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-farm-800 hover:bg-emerald-600 flex items-center justify-center text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={APP_CONFIG.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-farm-800 hover:bg-emerald-600 flex items-center justify-center text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={APP_CONFIG.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-farm-800 hover:bg-emerald-600 flex items-center justify-center text-white transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a
                    href={APP_CONFIG.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-farm-800 hover:bg-emerald-600 flex items-center justify-center text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Farm Tour Notice Card */}
            <div className="p-6 rounded-2xl bg-white border border-farm-200/80 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-harvest-100 flex items-center justify-center text-harvest-700 shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-farm-950">
                  Weekend Guided Tours
                </h4>
                <p className="text-xs text-farm-700 mt-1 leading-relaxed">
                  We host educational farm walks every Saturday morning at 10:00 AM.
                  Advance registration is encouraged.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form Matching User Screenshot */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-gray-200/90 shadow-xl">
            {/* Header Matching Provided Design */}
            <div className="mb-8">
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-farm-950 tracking-tight">
                Send Us a Message
              </h3>
              <p className="text-sm font-medium text-emerald-800 mt-2">
                Fill in the details below and our team will get back to you within 24 hours.
              </p>
            </div>

            {/* Status alerts */}
            {serverError && (
              <ErrorMessage
                message={serverError}
                onDismiss={() => setServerError(null)}
                className="mb-6 rounded-2xl"
              />
            )}

            {successInfo && (
              <div className="mb-6 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 shadow-sm animate-fade-in">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-serif font-bold text-base text-emerald-950">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                      {successInfo.message}
                    </p>
                    {successInfo.ticketId && (
                      <p className="text-xs font-semibold text-emerald-900 pt-1">
                        Inquiry Reference Ticket: <span className="font-mono bg-emerald-100 px-2 py-0.5 rounded text-emerald-950">{successInfo.ticketId}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              {/* Spam Protection Honeypots (Invisible to humans, trapped by automated bots) */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
                {...register("website")}
              />
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
                {...register("hp_field")}
              />

              {/* 1. Full Name */}
              <div className="space-y-2">
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-farm-950"
                >
                  Full Name <span className="text-rose-500 font-semibold ml-0.5">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-700">
                    <User className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="e.g. Gurpreet Singh"
                    aria-invalid={!!errors.name}
                    className={`w-full py-3.5 pl-12 pr-4 rounded-2xl border bg-white text-gray-900 text-sm sm:text-base placeholder:text-gray-400 transition-all duration-150 outline-none ${
                      errors.name
                        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-gray-300 hover:border-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    }`}
                    {...register("name")}
                  />
                </div>
                {errors.name && (
                  <p role="alert" className="text-xs text-red-600 font-medium pl-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* 2 & 3. Email Address & Phone Number Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Email Address */}
                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-farm-950"
                  >
                    Email Address <span className="text-rose-500 font-semibold ml-0.5">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-700">
                      <Mail className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="name@example.com"
                      aria-invalid={!!errors.email}
                      className={`w-full py-3.5 pl-12 pr-4 rounded-2xl border bg-white text-gray-900 text-sm sm:text-base placeholder:text-gray-400 transition-all duration-150 outline-none ${
                        errors.email
                          ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                          : "border-gray-300 hover:border-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                      }`}
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <p role="alert" className="text-xs text-red-600 font-medium pl-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label
                    htmlFor="contact-phone"
                    className="block text-sm font-medium text-farm-950"
                  >
                    Phone Number <span className="text-rose-500 font-semibold ml-0.5">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-700">
                      <Phone className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="(555) 000-0000"
                      aria-invalid={!!errors.phone}
                      className={`w-full py-3.5 pl-12 pr-4 rounded-2xl border bg-white text-gray-900 text-sm sm:text-base placeholder:text-gray-400 transition-all duration-150 outline-none ${
                        errors.phone
                          ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                          : "border-gray-300 hover:border-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                      }`}
                      {...register("phone")}
                    />
                  </div>
                  {errors.phone && (
                    <p role="alert" className="text-xs text-red-600 font-medium pl-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* 4. Message */}
              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-farm-950"
                >
                  Message <span className="text-rose-500 font-semibold ml-0.5">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="Tell us about your produce needs, order volume, or questions..."
                  aria-invalid={!!errors.message}
                  className={`w-full p-4 rounded-2xl border bg-white text-gray-900 text-sm sm:text-base placeholder:text-gray-400 transition-all duration-150 outline-none resize-y ${
                    errors.message
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-gray-300 hover:border-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  }`}
                  {...register("message")}
                />
                {errors.message && (
                  <p role="alert" className="text-xs text-red-600 font-medium pl-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button Matching Brand Design */}
              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  isLoading={isSubmitting}
                  className="w-full sm:w-auto min-w-[200px] text-base font-bold bg-[#1a3d29] hover:bg-[#275e3e] active:scale-[0.98] transition-all rounded-xl shadow-md text-white py-3.5 px-8"
                  rightIcon={<Send className="w-4 h-4" />}
                >
                  {isSubmitting ? "Sending to Gmail..." : "Send Message"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
