import Link from "next/link";

export default function PartnersHero() {
  return (
    <div className="relative w-full h-[280px] overflow-hidden">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&h=600&fit=crop"
        alt="Handshake"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Teal-green gradient overlay — stronger on left, fades right */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-700/80 via-teal-600/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-12 max-w-2xl">
        <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
          Our Partners
        </h1>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 border border-white text-white text-sm px-5 py-2 rounded-full w-fit hover:bg-white hover:text-teal-700 transition-colors duration-200"
        >
          Contact Us <span>→</span>
        </Link>
      </div>
    </div>
  );
}
