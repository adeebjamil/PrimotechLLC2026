import React from "react";

interface Partner {
  id: number;
  name: string;
  tel: string;
  email: string;
  website: string;
  websiteLabel: string;
  profile: string;
  logo: React.ReactNode;
}

const partners: Partner[] = [
  {
    id: 1,
    name: "Lovosis Technology",
    tel: "+971 50 916 2488",
    email: "sales@lovosis.com",
    website: "https://lovosis.com/",
    websiteLabel: "https://lovosis.com/",
    profile:
      "Lovosis Technology is a leading provider of innovative IT solutions and services, empowering businesses with cutting-edge technology.",
    logo: (
      <div className="flex items-center justify-center w-full h-full">
        {/* Lovosis Technology logo placeholder */}
        <svg viewBox="0 0 200 80" className="w-40" xmlns="http://www.w3.org/2000/svg">
          {/* Lightning bolt icon */}
          <polygon
            points="30,10 18,42 28,42 16,70 42,30 30,30"
            fill="#4a9ebe"
          />
          {/* LOVOSIS text */}
          <text
            x="50"
            y="38"
            fontFamily="Arial, sans-serif"
            fontWeight="700"
            fontSize="22"
            fill="#4a9ebe"
            letterSpacing="2"
          >
            LOVOSIS
          </text>
          {/* TECHNOLOGY text */}
          <text
            x="50"
            y="58"
            fontFamily="Arial, sans-serif"
            fontWeight="400"
            fontSize="11"
            fill="#4a9ebe"
            letterSpacing="3"
          >
            TECHNOLOGY
          </text>
        </svg>
      </div>
    ),
  },
  {
    id: 2,
    name: "Spottive Technologies",
    tel: "+971 55 234 1712",
    email: "sales@spottive.com",
    website: "https://spottive.com/",
    websiteLabel: "https://spottive.com/",
    profile:
      "Spottive Technologies specializes in smart solutions and digital transformation for enterprises across various industries.",
    logo: (
      <div className="flex items-center justify-center w-full h-full">
        {/* Spottive Technologies logo placeholder */}
        <svg viewBox="0 0 200 80" className="w-40" xmlns="http://www.w3.org/2000/svg">
          {/* Circular icon */}
          <circle cx="22" cy="40" r="16" fill="none" stroke="#3b8fc4" strokeWidth="3" />
          <path
            d="M14,40 Q22,28 30,40 Q22,52 14,40Z"
            fill="#3b8fc4"
          />
          {/* spottive text */}
          <text
            x="45"
            y="44"
            fontFamily="Arial, sans-serif"
            fontWeight="700"
            fontSize="22"
            fill="#3b8fc4"
            letterSpacing="1"
          >
            spottive
          </text>
          {/* TECHNOLOGIES text */}
          <text
            x="45"
            y="60"
            fontFamily="Arial, sans-serif"
            fontWeight="400"
            fontSize="9"
            fill="#3b8fc4"
            letterSpacing="3"
          >
            TECHNOLOGIES
          </text>
        </svg>
      </div>
    ),
  },
];

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="flex flex-col sm:flex-row gap-0 py-10">
      {/* Logo Box */}
      <div className="w-full sm:w-[220px] flex-shrink-0 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center min-h-[160px] p-6">
        {partner.logo}
      </div>

      {/* Info */}
      <div className="flex-1 px-0 sm:px-10 pt-6 sm:pt-0 flex flex-col justify-center">
        <h3 className="text-base font-bold text-gray-900 mb-4">
          {partner.name}
        </h3>

        {/* Contact rows */}
        <div className="space-y-2 mb-4">
          <div className="flex gap-6 text-sm">
            <span className="text-gray-500 w-16 flex-shrink-0">Tel :</span>
            <span className="text-gray-800">{partner.tel}</span>
          </div>
          <div className="flex gap-6 text-sm">
            <span className="text-gray-500 w-16 flex-shrink-0">Email :</span>
            <a
              href={`mailto:${partner.email}`}
              className="text-teal-500 hover:underline"
            >
              {partner.email}
            </a>
          </div>
          <div className="flex gap-6 text-sm">
            <span className="text-gray-500 w-16 flex-shrink-0">Web site :</span>
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-500 hover:underline"
            >
              {partner.websiteLabel}
            </a>
          </div>
        </div>

        {/* Company Profile */}
        <div className="text-sm">
          <span className="font-semibold text-gray-800">Company Profile : </span>
          <span className="text-gray-600">{partner.profile}</span>
        </div>
      </div>
    </div>
  );
}

export default function PartnerList() {
  return (
    <section className="w-full bg-white py-4 px-6">
      <div className="max-w-4xl mx-auto divide-y divide-gray-200">
        {partners.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </div>
    </section>
  );
}
