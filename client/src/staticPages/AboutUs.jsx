import React, { useState } from "react";
import { ThumbsUp, Eye, Users, CheckCircle } from "lucide-react";

const AboutUsComponents = [
  {
    component: () => {
      const [video1, setVideo1] = useState(false);
      const [video2, setVideo2] = useState(false);

      return {
        render: (
          <div className="bg-white text-black py-10 px-5 lg:px-20">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-2">
              <a href="/" className="text-grey-600">Home</a> / <a href="/" className="text-[#E33831]">About Us</a>
            </div>

            {/* About Us Heading */}
            <h1 className="text-3xl font-bold mb-6">About Us</h1>

            {/* About Us Content */}
            <div className="space-y-4 text-justify text-gray-700">
              <p>
                Global Exposure, 24X7 live showroom, instant inquiries, potential buyers! All this is what B2B entrepreneurs dream and wish for. The call from the global business village is to recognize the value of the Internet and transform businesses with effective E-Presence. Global appeal is the pre-requisite, in the present era, for any business to flourish in an arena where competition grows tougher at every level. With the growing competition, there arose a need among the business enterprises to promote their business online and appeal to global customers.
              </p>
              <p>
                At the same time, the need for a common B2B showroom to exhibit their products and a platform to promote their business became urgent. Besides this, the incessant tussle among the business entrepreneurs to revolutionize their business to attract more potential buyers and crack more prolific deals accounted for the presence of a common platform where they can promote their business online. ExportersIndia.com is the answer to all, which continues to serve you with such a common B2B platform where innumerous manufacturers, wholesale suppliers, importers, exporters, service providers, etc. have registered in. A complete solution provider to all your business queries, ExportersIndia is the destination where business enterprises have benefited by the much-needed promotion and exposure in the current scenario of the global market. ExportersIndia has become a strong source of reliability because of the use of peerless technology and innovative measures. This online B2B directory is the home of innumerous products and businesses across the globe and hence it serves as the ideal destination for everyone who wants to witness a bloom in the global trade scenario.
              </p>
              <p>
                Incepted in the year 1997, this <span className="font-semibold">portal is owned and managed by Weblink .In Pvt Ltd.</span>, one of the leading names in the realm of web design and development and e-commerce solutions. Backed up by an invincible experience and dexterity, Weblink .In Pvt Ltd. has provided this portal the much-required exposure to the global business arena. For the same, this portal has become the sure shot solution for all requirements of the buyers as well as the sellers.
              </p>
              <p>
                We are committed to provide each of the business entrepreneurs with the utmost exposure to the global market conditions and provide them a platform where they can interact with the respective community. We intend to be a destination where all the requirements of the business entrepreneur cease.
              </p>
              <p>
                We endeavor to grant a global status to every business irrespective of however small it is and wherever it is located on the earth’s face. Thus, we enable the businesses to have a strong stand against its peers by means of the B2B online interface.
              </p>
            </div>

            {/* Key Strengths Section */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-4">Key Strengths</h2>
              <div className="bg-gray-100 p-5 rounded-lg shadow-lg">
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>
                    We adopt technologically revolutionized measures to give a new dimension to your business. We incorporate the latest updates in this field to make the business of the clients renowned worldwide.
                  </li>
                  <li>
                    A huge databank comprising of both buyers and sellers from across the globe.
                  </li>
                  <li>
                    The user-friendliness of the portal has been one of the remarkable features attracting numerous buyers.
                  </li>
                  <li>
                    No matter whatever is the requirement of the buyer, they can find the respective company dealing in that product. This is possible because of the appropriate categorization of the portal into products.
                  </li>
                  <li>
                    Continuous updation of all the business-related information makes it reliable.
                  </li>
                  <li>Free registration to the companies.</li>
                  <li>
                    Complete E-commerce solutions in the most cost-effective manner.
                  </li>
                  <li>
                    Updated information about the trade shows—both past and upcoming.
                  </li>
                </ul>
              </div>
            </div>

            {/* Our Mission, Core Values, Our Vision, and Our Team Section */}
            <div className="mt-10 p-8 rounded-lg shadow-lg bg-[#FFE0E0]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Our Mission */}
                <div className="flex items-start space-x-6 p-5 rounded-lg">
                  <ThumbsUp className="text-red-600 text-5xl" />
                  <div>
                    <h3 className="text-xl font-semibold">Our Mission</h3>
                    <p className="text-gray-700">
                      Our mission is to touch the horizon where our capabilities may successfully meet with the requirements of our clients, that too with ultimate transparency and cost-effectiveness.
                    </p>
                  </div>
                </div>

                {/* Our Vision */}
                <div className="flex items-start space-x-6 p-5 rounded-lg">
                  <Eye className="text-red-600 text-5xl" />
                  <div>
                    <h3 className="text-xl font-semibold">Our Vision</h3>
                    <p className="text-gray-700">
                      To sow the seeds of par-excellence services with a customer-centric approach and reap the trust of worldwide clients.
                    </p>
                  </div>
                </div>

                {/* Core Values */}
                <div className="flex items-start space-x-6 p-5 rounded-lg">
                  <CheckCircle className="text-red-600 text-5xl" />
                  <div>
                    <h3 className="text-xl font-semibold">Core Values</h3>
                    <p className="text-gray-700">
                      <strong>Transpicuous Work Culture:</strong> Our words and actions always go hand-in-hand. We strongly preserve transparency to be correct ethically, legally, and socially.
                    </p>
                    <p className="text-gray-700">
                      <strong>Result-Orientation:</strong> By setting clear goals, fixing the priorities, organizing the resources, and rigorously monitoring the growth of the project.
                    </p>
                    <p className="text-gray-700">
                      <strong>Customer-Centric Approach:</strong> We revere the uniqueness of each client and their requirements, thus shaping out mirror-like solutions.
                    </p>
                    <p className="text-gray-700">
                      <strong>Innovation:</strong> Think and do out of the box by setting the minds free. We also seek the unrevealed possibilities hidden in feedback and suggestions of clients and co-workers.
                    </p>
                  </div>
                </div>

                {/* Our Team */}
                <div className="flex items-start space-x-6 p-5 rounded-lg">
                  <Users className="text-red-600 text-5xl" />
                  <div>
                    <h3 className="text-xl font-semibold">Our Team</h3>
                    <p className="text-gray-700">
                      The efforts of an experienced and skilled team are rooted at the core of our working. All of our team members are adept in their respective fields and keep themselves abreast with the latest updates. Be it the designing and development, content, or the management team, each member is dedicated to the complete satisfaction of the buyers and suppliers, carving out solutions accordingly.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Get Business Online Section */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-4">How to Get Business Online</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Video 1 */}
                <div className="relative w-full aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  {!video1 ? (
                    <img
                      src="/path-to-thumbnail1.jpg"
                      alt="Video 1 Thumbnail"
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => setVideo1(true)}
                    />
                  ) : (
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/YOUR_VIDEO_ID1?autoplay=1"
                      title="Video 1"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
                
                {/* Video 2 */}
                <div className="relative w-full aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  {!video2 ? (
                    <img
                      src="/path-to-thumbnail2.jpg"
                      alt="Video 2 Thumbnail"
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => setVideo2(true)}
                    />
                  ) : (
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/YOUR_VIDEO_ID2?autoplay=1"
                      title="Video 2"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <div className="shadow-lg rounded-lg p-10 max-w-8xl text-gray-700 italic text-lg text-center bg-white">
                A patient ear for client’s requirements and a constant effort to bring
                about those changes in the business arena has gained us a huge clientele
                across the globe. We have lived up to the expectations of our huge
                client base till now and intend to be a reliable source for them in the
                near future as well by embarking upon new arenas of business.
              </div>
            </div>
          </div>
        )
      };
    }
  }
];

const AboutUs = () => {
  return AboutUsComponents[0].component().render;
};

export default AboutUs;