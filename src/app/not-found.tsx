import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative w-full flex-grow flex items-center justify-center overflow-hidden min-h-[80vh]">
      {/* Background Image with Overlay mapped from Hero vibe */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F3443]/90 via-[#144655]/85 to-[#1a5566]/80 backdrop-blur-sm"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 md:px-16 lg:px-24 text-center py-20">
        <div className="max-w-3xl">
          {/* Visual Element */}
          <div className="w-24 h-24 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-8 backdrop-blur-md border border-white/20">
            <svg className="w-12 h-12 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          {/* Label */}
          <p className="text-teal-400 text-sm md:text-base font-semibold tracking-[0.2em] uppercase mb-4">
            404 Error
          </p>

          {/* Title */}
          <h1 className="text-white text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Page Not <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">Found</span>
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            The page you are looking for could not be found. It may have been moved, renamed, or is temporarily unavailable.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-teal-500/25 group"
            >
              <svg className="w-5 h-5 mr-3 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Homepage
            </Link>

            <Link
              href="/support"
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm border border-white/20 transition-all duration-300 hover:border-white/40 group"
            >
              Contact Support
              <svg className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
