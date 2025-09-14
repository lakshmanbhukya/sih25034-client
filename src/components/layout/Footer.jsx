import React from 'react';
import { Heart, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">🎓</span>
              </div>
              <h3 className="text-xl font-bold">Internship Finder</h3>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Helping students find the perfect internship opportunities that match their skills, 
              interests, and career goals. Your journey to professional success starts here.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Find Internships
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  My Recommendations
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Update Profile
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Help & Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-blue-400" />
                <span className="text-gray-300">support@internshipfinder.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-blue-400" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-3 text-blue-400" />
                <span className="text-gray-300">Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Internship Finder. All rights reserved.
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 mx-1 text-red-500" />
              <span>for students</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
