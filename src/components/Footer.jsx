import React from 'react';

function Footer() {
  return (
    <footer className="py-16 bg-gradient-to-br from-[#161032] via-[#2a1f4f] to-[#161032] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#06A77D] rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#f1a208] rounded-full blur-3xl opacity-10"></div>

      <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-y-12 gap-x-8 lg:gap-x-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h4 className="text-2xl font-bold bg-gradient-to-r from-[#06A77D] to-[#D5C67A] bg-clip-text text-transparent mb-4">
              Vantage AI
            </h4>
            <p className="mt-4 text-base text-[#afcbff] leading-relaxed">
              AI-powered financial intelligence platform delivering predictive analytics, stress testing, and explainable AI insights for smarter investment decisions.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[#06A77D] rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20">
                <span className="text-white text-lg">𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[#06A77D] rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20">
                <span className="text-white text-lg">in</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-[#06A77D] rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20">
                <span className="text-white text-lg">f</span>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <p className="text-sm font-bold tracking-wider text-[#D5C67A] uppercase mb-6">Company</p>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-[#afcbff] hover:text-white transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#06A77D] transition-all duration-200 mr-2"></span>
                  About
                </a>
              </li>
              <li>
                <a href="#features" className="text-[#afcbff] hover:text-white transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#06A77D] transition-all duration-200 mr-2"></span>
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-[#afcbff] hover:text-white transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#06A77D] transition-all duration-200 mr-2"></span>
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-[#afcbff] hover:text-white transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#06A77D] transition-all duration-200 mr-2"></span>
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <p className="text-sm font-bold tracking-wider text-[#D5C67A] uppercase mb-6">Support</p>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-[#afcbff] hover:text-white transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#06A77D] transition-all duration-200 mr-2"></span>
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-[#afcbff] hover:text-white transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#06A77D] transition-all duration-200 mr-2"></span>
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-[#afcbff] hover:text-white transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#06A77D] transition-all duration-200 mr-2"></span>
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-[#afcbff] hover:text-white transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#06A77D] transition-all duration-200 mr-2"></span>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Feedback Form */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <p className="text-sm font-bold tracking-wider text-[#D5C67A] uppercase mb-6">Stay Updated</p>
            <p className="text-[#afcbff] text-sm mb-4">Get the latest insights and updates delivered to your inbox.</p>
            <form action="#" method="POST" className="space-y-3">
              <input 
                type="email" 
                name="email" 
                id="email" 
                placeholder="Enter your email" 
                className="block w-full p-4 text-white placeholder-[#afcbff]/50 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:outline-none focus:border-[#06A77D] focus:ring-2 focus:ring-[#06A77D]/50 transition-all duration-200"
              />
              <button 
                type="submit" 
                className="w-full px-6 py-4 font-bold text-white bg-gradient-to-r from-[#06A77D] to-[#048a64] rounded-2xl hover:from-[#048a64] hover:to-[#06A77D] transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-[#06A77D]/50"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#afcbff] text-sm">
              © {new Date().getFullYear()} Vantage AI. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-[#afcbff] hover:text-white transition-colors duration-200">
                Terms
              </a>
              <a href="#" className="text-[#afcbff] hover:text-white transition-colors duration-200">
                Privacy
              </a>
              <a href="#" className="text-[#afcbff] hover:text-white transition-colors duration-200">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;