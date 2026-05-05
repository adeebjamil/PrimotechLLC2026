const features = [
  {
    id: 1,
    title: "Competitive Margins",
    description: "Attractive profit margins and volume-based incentives",
    icon: (
      <svg
        className="w-6 h-6 text-teal-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Training & Support",
    description: "Comprehensive training programs and technical support",
    icon: (
      <svg
        className="w-6 h-6 text-teal-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Quality Products",
    description: "Access to cutting-edge security technology solutions",
    icon: (
      <svg
        className="w-6 h-6 text-teal-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

export default function BecomePartner() {
  return (
    <section className="w-full bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Become Our Partner
        </h2>

        {/* Subtext */}
        <p className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto mb-14">
          Join our growing network of trusted partners and distributors. We offer
          comprehensive support, training programs, and marketing resources to
          help you succeed in the security technology market.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {features.map((feature) => (
            <div key={feature.id} className="flex flex-col items-center gap-4">
              {/* Icon circle */}
              <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                {feature.icon}
              </div>

              {/* Text */}
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
