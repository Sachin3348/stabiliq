import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const whatsappUrl = 'https://wa.me/916239368517?text=Hi!%20I%27m%20interested%20in%20learning%20more%20about%20STABILIQ%20membership.%20Can%20you%20help%20me%3F';

  const footerLinks = [
    { name: 'Terms & Conditions', to: '/terms' },
    { name: 'Privacy Policy', to: '/privacy' },
    { name: 'Refund Policy', to: '/refund' },
    { name: 'Contact Us', to: whatsappUrl, external: true }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-blue-400" strokeWidth={2} />
              <span className="text-2xl font-bold tracking-tight">STABILIQ</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
            STABILIQ is a subscription based membership program for salaried professionals
            that provides upskilling courses, job transition support and financial assistance
            in case of involuntary job loss.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#how-it-works" className="text-slate-400 hover:text-white transition-colors text-sm">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#benefits" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Benefits
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#faq" className="text-slate-400 hover:text-white transition-colors text-sm">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a href={link.to} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors text-sm">
                      {link.name}
                    </a>
                  ) : (
                    <Link to={link.to} className="text-slate-400 hover:text-white transition-colors text-sm">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@stabiliq.in" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Email: <span className="text-white">support@stabiliq.in</span>
                </a>
              </li>
              <li>
                <a href="tel:+916239368517" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Phone: <span className="text-white">+91 6239368517</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 mb-8"></div>

        {/* Bottom Section */}
        <div className="space-y-6">
          {/* Disclaimer */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h4 className="font-semibold text-amber-400 mb-2">Important Disclaimer</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              STABILIQ is a membership-based assistance platform and not an insurance company. 
              Support decisions are discretionary and subject to eligibility and verification. 
              All members must read and agree to the Terms & Conditions before joining.
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center text-slate-500 text-sm">
            <p>&copy; {currentYear} STABILIQ. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;