import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen w-full bg-bg-light flex items-center justify-center p-6">
      
      <div className="text-center max-w-md">

        {/* Illustration */}
        <div className="relative w-64 h-64 mx-auto mb-6">
          <Image
            src="/assets/404-illustration.png"
            alt="404 Not Found"
            fill
            className="object-contain"
          />
        </div>

        {/* Error Code */}
        <h1 className="text-6xl font-bold text-primary mb-2">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-text-dark mb-3">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-500 mb-8">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          
          <Link href="/">
            <Button className="bg-primary text-white font-semibold px-6 py-2 rounded-xl hover:bg-secondary transition">
              Go Home
            </Button>
          </Link>

          <Link href="/contact">
            <Button className="bg-white border border-primary/20 text-text-dark font-semibold px-6 py-2 rounded-xl hover:bg-primary/5 transition">
              Contact
            </Button>
          </Link>

        </div>

        {/* subtle footer text */}
        <p className="mt-8 text-xs text-gray-400">
          MediQueue • Helping you stay on track
        </p>

      </div>
    </div>
  );
};

export default NotFoundPage;