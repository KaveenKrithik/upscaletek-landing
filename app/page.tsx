import Image from "next/image"
import { Suspense } from "react"
import { Construction3D } from "@/components/construction-3d"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section with 3D Construction Animation */}
      <section className="relative min-h-screen flex flex-col items-center justify-center">
        <div className="absolute top-8 left-8 z-10">
          <Image src="/logo.png" alt="UpscaleTek Logo" width={200} height={50} priority />
        </div>

        <div className="w-full h-screen">
          <Suspense fallback={<LoadingSpinner />}>
            <Construction3D />
          </Suspense>

          <div className="absolute bottom-12 left-0 right-0 text-center animate-bounce z-10">
            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-purple-600/20 hover:bg-purple-600/30 px-6 py-3 rounded-full backdrop-blur-sm transition-all duration-300"
            >
              <span className="text-lg mr-2">Scroll Down</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  )
}
