import { Instagram, Twitter, Linkedin, Github, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import playStore from '../../../assets/images/google_store_icon.svg';
import appStore from '../../../assets/images/apple_store_icon.svg';

const footerData = [
  {
    title: 'Products',
    links: [
      { name: 'Pera iOS', path: '/products/ios' },
      { name: 'Pera Android', path: '/products/android' },
      { name: 'Pera Web', path: '/products/web' },
      { name: 'Pera Explorer', path: '/products/explorer' }
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'Support Center', path: '/support' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'Join Our Team', path: '/careers' },
      { name: 'Media Kit', path: '/media-kit' },
      { name: 'Blog', path: '/blog' },
      { name: 'Roadmap', path: '/roadmap' },
      { name: 'Bug Bounty', path: '/bug-bounty' }
    ]
  },
  {
    title: 'Additional Resources',
    links: [
      { name: 'Open Source Repos', path: '/opensource' },
      { name: 'Algorand Governance', path: '/governance' },
      { name: 'Algorand Foundation', path: '/foundation' },
      { name: 'Algorand Developer Portal', path: '/developers' },
      { name: 'Pera Technical & API Docs', path: '/docs' }
    ]
  },
  {
    title: 'Legal & Social',
    sections: [
      {
        title: 'Legal',
        links: [
          { name: 'Terms of Service', path: '/terms' },
          { name: 'Privacy Policy', path: '/privacy' }
        ]
      },
      {
        title: 'Social',
        links: [
          { name: 'Instagram', path: '#', icon: Instagram },
          { name: 'Twitter', path: '#', icon: Twitter },
          { name: 'LinkedIn', path: '#', icon: Linkedin },
          { name: 'GitHub', path: '#', icon: Github },
          { name: 'YouTube', path: '#', icon: Youtube }
        ]
      }
    ]
  }
];

const  Footer=()=> {
  return (
    <footer className="bg-[#1C1B1F] text-gray-300 mt-auto">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {footerData.map((column, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-4">{column.title}</h3>

              {column.sections ? (
                column.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mb-6">
                    <h4 className="text-white font-medium mb-3 text-sm">
                      {section.title}
                    </h4>
                    {section.title === 'Social' ? (
                      <div className="space-y-4">
                      <div className="flex space-x-4">
                        {section.links.map((link, linkIndex) => (
                          <Link
                            key={linkIndex}
                            to={link.path}
                            className="hover:text-[#e03733] transition-colors"
                            aria-label={link.name}
                          >
                            <link.icon className="w-5 h-5" />
                          </Link>
                        ))}
                      </div>
                      <div className="flex space-x-4 pt-2">
                        <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                          <img src={playStore} alt="Google Play" className="h-10" />
                        </a>
                        <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                          <img src={appStore} alt="App Store" className="h-10" />
                        </a>
                      </div>
                    </div>
                    ) : (
                      <ul className="space-y-2">
                        {section.links.map((link, linkIndex) => (
                          <li key={linkIndex}>
                            <Link
                              to={link.path}
                              className="hover:text-[#e03733] transition-colors text-sm"
                            >
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))
              ) : (
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.path}
                        className="hover:text-[#e03733] transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8 flex justify-evenly">
          <p className="text-sm text-gray-400">
            {`© 2023 -${new Date().getFullYear()}`} <Link to="https://bmtechx.in/" className='hover:underline'>BmTechx.in</Link>, All rights reserved
          </p>
          <p className="text-sm text-gray-400">
            <Link to="https://bmtechx.in/" className='hover:underline'>Privacy Policy </Link> - <Link to="https://bmtechx.in/" className='hover:underline'>Terms & Conditions</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;