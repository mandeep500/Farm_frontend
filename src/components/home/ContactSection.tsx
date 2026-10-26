"use client";

import React, { useState } from "react";
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
  MessageSquare,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Calendar,
} from "lucide-react";

export function ContactSection() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<string | null>(null);

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
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    setSuccessInfo(null);
    try {
      const response = await contactService.submitContact(data);
      if (response.success) {
        setSuccessInfo(
          response.message ||
            "Thank you! Your inquiry has been delivered to Sekhon Farm."
        );
        reset();
      }
    } catch (err: any) {
      setServerError(
        err.message || "Failed to deliver your message. Please try again."
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

          {/* Right Column: Contact Form with Validation */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-farm-200/80 shadow-lg">
            <div className="mb-6">
              <h3 className="font-serif text-2xl font-bold text-farm-950">
                Send Us a Message
              </h3>
              <p className="text-xs sm:text-sm text-farm-600 mt-1">
                Fill in the details below and our team will get back to you within 24 hours.
              </p>
            </div>

            {/* Status alerts */}
            {serverError && (
              <ErrorMessage
                message={serverError}
                onDismiss={() => setServerError(null)}
                className="mb-6"
              />
            )}

            {successInfo && (
              <SuccessMessage
                title="Message Transmitted!"
                message={successInfo}
                onDismiss={() => setSuccessInfo(null)}
                className="mb-6"
              />
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              {/* Name */}
              <Input
                label="Full Name"
                placeholder="e.g. Gurpreet Singh"
                isRequired
                leftIcon={<User className="w-4 h-4 text-farm-600" />}
                error={errors.name?.message}
                {...register("name")}
              />

              {/* Email & Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="name@example.com"
                  isRequired
                  leftIcon={<Mail className="w-4 h-4 text-farm-600" />}
                  error={errors.email?.message}
                  {...register("email")}
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="(555) 000-0000"
                  isRequired
                  leftIcon={<Phone className="w-4 h-4 text-farm-600" />}
                  error={errors.phone?.message}
                  {...register("phone")}
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-farm-950"
                >
                  Message
                  <span className="text-red-500 ml-1" aria-hidden="true">*</span>
                </label>
                <div className="relative">
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Tell us about your produce needs, order volume, or questions..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-farm-200/60 focus:border-farm-600 hover:border-gray-400 transition duration-150"
                    aria-invalid={!!errors.message}
                    {...register("message")}
                  />
                </div>
                {errors.message && (
                  <p
                    role="alert"
                    className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1.5"
                  >
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  isLoading={isSubmitting}
                  className="w-full sm:w-auto min-w-[180px] font-semibold shadow-md"
                  rightIcon={<Send className="w-4 h-4" />}
                >
                  Submit Inquiry
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

