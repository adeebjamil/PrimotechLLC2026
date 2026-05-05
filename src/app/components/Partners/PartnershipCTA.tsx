import Link from "next/link";

export default function PartnershipCTA() {
  return (
    <section className="w-full bg-gray-50 py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-2xl font-extrabold text-gray-900 uppercase tracking-wide mb-6">
          Interested in Partnership?
        </h2>

        {/* Body text */}
        <p className="text-gray-500 text-base leading-relaxed mb-10">
          Ready to join our partner network? Contact us today to learn more about
          partnership opportunities and how we can help grow your business
          together.
        </p>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 border border-teal-500 text-teal-500 text-sm font-medium px-8 py-3 rounded-full hover:bg-teal-500 hover:text-white transition-colors duration-200"
        >
          Contact Partnership Team <span>→</span>
        </Link>
      </div>
    </section>
  );
}
