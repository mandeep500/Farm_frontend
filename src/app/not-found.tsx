import React from "react";
import Link from "next/link";
import { Button } from "../components/ui/Button";
import { Sprout, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-24 bg-farm-50/50">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-farm-100 text-farm-700 flex items-center justify-center mx-auto shadow-sm">
          <Sprout className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-farm-600">
            404 Error
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-farm-950">
            Field Not Found
          </h1>
          <p className="text-xs sm:text-sm text-farm-700 leading-relaxed">
            The farm pathway or page you are looking for does not exist or has been moved to another pasture.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/">
            <Button
              variant="primary"
              className="w-full sm:w-auto font-semibold"
              leftIcon={<Home className="w-4 h-4" />}
            >
              Return to Homepage
            </Button>
          </Link>
          <Link href="/#contact">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

