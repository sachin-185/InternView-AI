import React, { useState, useContext } from "react";
import { APP_FEATURES } from "../../utils/data";
import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";
import Modal from "../../components/Model";
import { AuthContext } from "../../context/AuthContext.jsx";
import ProfileButton from "../../components/layouts/ProfileButton";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] relative overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-[100px] animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[80px] animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px]"></div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-[#0a0a0a]/75 backdrop-blur-xl border-b border-white/5 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <div
            className="text-2xl sm:text-3xl font-bold text-white cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => navigate("/")}
          >
            <span className="text-indigo-400">Prep</span>AI
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="text-gray-200 hover:text-indigo-400 font-medium text-base transition-colors duration-300 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#features"
              className="text-gray-200 hover:text-indigo-400 font-medium text-base transition-colors duration-300 relative group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>
          {user ? (
            <ProfileButton />
          ) : (
            <button
              className="px-5 py-2 sm:px-6 sm:py-2.5 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 font-medium text-sm sm:text-base hover:scale-105"
              onClick={() => setOpenAuthModal(true)}
            >
              Get Started
            </button>
          )}
        </div>
      </header>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-5 sm:space-y-6 lg:space-y-8 order-2 lg:order-1">
            <div className="inline-block animate-fade-in">
              <div className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-purple-500/20 border border-orange-500/30 rounded-full text-sm font-medium text-orange-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Active
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl text-white font-bold mb-6 leading-tight">
              Get Ready for
              <br />
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 animate-gradient">
                  Tech Interview
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-indigo-400/30"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 9c50-8 100-8 200 0"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl">
              Practice with AI-generated interview questions tailored to your
              role. Get instant feedback, detailed explanations, and track your
              progress. Transform from nervous to confident.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 font-semibold text-base sm:text-lg hover:scale-105 hover:-translate-y-1"
                onClick={handleCTA}
              >
                Start Practicing Free →
              </button>
              <button
                onClick={() => {
                  const features = document.getElementById("features");
                  features?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all duration-300 font-semibold text-base sm:text-lg"
              >
                Explore Features
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${i === 1 ? "from-orange-400 to-pink-400" : i === 2 ? "from-purple-400 to-blue-400" : i === 3 ? "from-green-400 to-teal-400" : "from-yellow-400 to-orange-400"} border-2 border-gray-900 flex items-center justify-center text-white text-sm font-bold`}
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="text-white font-semibold">10,000+ Users</div>
                <div className="text-gray-500 text-sm">Using PrepAI</div>
              </div>
            </div>
          </div>

          {/* Right Column - Abstract UI Decoration */}
          <div className="order-1 lg:order-2 relative w-full h-[350px] sm:h-[400px] lg:h-[500px]">
            {/* Glow Effects */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF9324]/30 via-purple-500/20 to-blue-500/30 rounded-[100px] blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-b from-[#FF9324]/20 to-transparent rounded-full blur-2xl"></div>

            {/* 3D Floating UI Elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Main Chat Interface Mock */}
              <div className="relative z-20 w-full max-w-sm bg-[#111111]/90 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] transform transition-all duration-700 hover:-translate-y-2 animate-float">
                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF9324] to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                      <span className="text-white text-sm font-bold">AI</span>
                    </div>
                    <div>
                      <div className="text-gray-200 font-semibold text-sm">
                        Interviewer Agent
                      </div>
                      <div className="text-green-400 text-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>{" "}
                        Online
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm p-4 text-sm text-gray-300 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#FF9324]"></div>
                    "Can you explain the difference between REST and GraphQL?"
                  </div>
                  <div className="bg-[#FF9324]/10 border border-[#FF9324]/20 rounded-2xl rounded-tr-sm p-4 text-sm text-gray-200 ml-6 relative">
                    <div className="flex gap-2 items-center mb-2">
                      <div className="w-1.5 h-1.5 bg-[#FF9324] rounded-full animate-bounce"></div>
                      <div
                        className="w-1.5 h-1.5 bg-[#FF9324] rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-1.5 h-1.5 bg-[#FF9324] rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full w-full mb-2"></div>
                    <div className="h-2 bg-white/10 rounded-full w-4/5"></div>
                  </div>
                </div>
              </div>

              {/* Floating Stats Card */}
              <div
                className="absolute -top-4 sm:-top-8 -right-4 sm:-right-8 z-30 bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl transform transition-transform duration-500 hover:scale-105 animate-float"
                style={{ animationDelay: "1.5s" }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400 text-xl font-bold">
                    95
                  </div>
                  <div>
                    <div className="text-white font-bold">Score</div>
                    <div className="text-green-400 text-xs">Excellent!</div>
                  </div>
                </div>
              </div>

              {/* Floating Code Snippet Card */}
              <div
                className="absolute -bottom-8 -left-4 sm:-left-12 z-30 bg-[#0a0a0a] backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl transform transition-transform duration-500 hover:scale-105 animate-float hidden sm:block"
                style={{ animationDelay: "2s" }}
              >
                <div className="flex gap-1.5 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="font-mono text-xs space-y-1.5">
                  <div>
                    <span className="text-pink-500">import</span>{" "}
                    <span className="text-yellow-300">&#123;</span> useState{" "}
                    <span className="text-yellow-300">&#125;</span>{" "}
                    <span className="text-pink-500">from</span>{" "}
                    <span className="text-green-400">'react'</span>;
                  </div>
                  <div className="text-gray-500 mt-2">
                    // Ready for your code interview
                  </div>
                  <div>
                    <span className="text-blue-400">const</span>{" "}
                    <span className="text-blue-200">result</span>{" "}
                    <span className="text-pink-500">=</span>{" "}
                    <span className="text-yellow-300">await</span>{" "}
                    ai.evaluate();
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="mt-20 sm:mt-24 lg:mt-32 mb-16">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full mb-4">
              <span className="text-orange-400 font-medium text-sm">
                Features
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose <span className="text-[#FF9324]">PrepAI</span>?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to crack your next interview
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {APP_FEATURES.map((feature, index) => (
              <div
                key={feature.id}
                className="group relative p-6 sm:p-8 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/10"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl flex items-center justify-center font-bold text-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.id}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-20 mb-16">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
              <span className="text-purple-400 font-medium text-sm">
                How It Works
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Get Started in <span className="text-[#FF9324]">3 Steps</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Profile",
                desc: "Sign up and tell us about your target role and experience level",
                icon: "👤",
              },
              {
                step: "02",
                title: "Generate Questions",
                desc: "Our AI creates personalized interview questions just for you",
                icon: "🤖",
              },
              {
                step: "03",
                title: "Practice & Improve",
                desc: "Answer questions, get AI feedback, and track your progress",
                icon: "📈",
              },
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center hover:border-orange-500/50 transition-colors duration-300">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="text-orange-400 font-bold text-sm mb-2">
                    {item.step}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-gray-600">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mb-16">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-blue-500/20"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAyIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
            <div className="relative py-12 sm:py-16 px-8 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Land Your Dream Job?
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto mb-8">
                Join thousands of successful candidates who have transformed
                their interview skills with PrepAI.
              </p>
              <button
                className="px-10 py-4 bg-gradient-to-r from-[#FF9324] to-[#ff7b00] text-white rounded-xl hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 font-semibold text-lg hover:scale-105"
                onClick={handleCTA}
              >
                Get Started Now →
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-gray-800 bg-gray-900/30 rounded-t-3xl">
          <div className="py-10 sm:py-14">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand Column */}
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-2xl font-bold text-white mb-4">
                  <span className="text-indigo-400">Prep</span>AI
                </h3>
                <p className="text-gray-400 mb-6 max-w-md">
                  Master your next tech interview with AI-powered practice
                  sessions. Get personalized questions, instant feedback, and
                  track your progress.
                </p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-indigo-500 hover:text-white transition-all duration-300 hover:scale-110"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-indigo-500 hover:text-white transition-all duration-300 hover:scale-110"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-indigo-500 hover:text-white transition-all duration-300 hover:scale-110"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      onClick={() => navigate("/")}
                      className="text-gray-400 hover:text-indigo-400 transition-colors"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#features"
                      className="text-gray-400 hover:text-indigo-400 transition-colors"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-indigo-400 transition-colors"
                    >
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">
                  Contact
                </h4>
                <ul className="space-y-3">
                  <li className="text-gray-400">support@prepai.com</li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-indigo-400 transition-colors"
                    >
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-indigo-400 transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-indigo-400 transition-colors"
                    >
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="py-6 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
              <p className="text-gray-500 text-sm">
                © 2026 PrepAI. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm">
                Made with <span className="text-red-500">❤</span> for
                interviewers
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Auth Modal */}
      {openAuthModal && (
        <Modal
          isOpen={openAuthModal}
          onClose={() => setOpenAuthModal(false)}
          title={currentPage === "login" ? "Login" : "Sign Up"}
        >
          {currentPage === "login" ? (
            <Login setCurrentPage={setCurrentPage} />
          ) : (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default LandingPage;
