import { ArrowRight, Database, Eye, Leaf, Lock, Monitor, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

export function OnboardingScreen() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    {
      icon: <Database className="h-8 w-8" />,
      title: 'Pusat Data',
      description: 'Sistem manajemen data terintegrasi',
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: 'Monitor Langsung',
      description: 'Pemantauan hutan secara real-time',
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Otomatisasi',
      description: 'Alur kerja verifikasi otomatis',
    },
  ];

  const partnerItems = [
    { src: '/images/mitra-danau-seluluk-jaya.png', alt: 'Mitra Danau Seluluk Jaya' },
    { src: '/images/mitra-kph.png', alt: 'Mitra KPH' },
    { src: '/images/mitra-kth-mawar-bersemi.png', alt: 'Mitra KTH Mawar Bersemi' },
    { src: '/images/mitra-masoraian.png', alt: 'Mitra Masoraian' },
    { src: '/images/mitra-petak-puti.jpg', alt: 'Mitra Petak Puti' },
    { src: '/images/mitra-tani-sejati.jpg', alt: 'Mitra Tani Sejati' },
    { src: '/images/mitra-ssms.png', alt: 'Mitra SSMS' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-5">
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-100 via-green-100 to-gray-100"
          style={{
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
          }}
        />
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Navigation - Responsive */}
      <nav className="fixed top-3 md:top-6 left-1/2 transform -translate-x-1/2 z-50 px-4 w-full max-w-md md:max-w-none md:w-auto">
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-full px-4 md:px-8 py-2 md:py-3 shadow-lg">
          <div className="flex items-center justify-between md:justify-center md:space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="font-bold text-sm md:text-lg text-gray-900">SUSTAINABLE FOREST</span>
            </div>
            <Button
              variant="ghost"
              className="text-green-600 hover:bg-green-50 rounded-full px-3 md:px-6 hover:text-green-600 text-sm md:text-base"
              onClick={() => (window.location.href = '/login')}>
              <Lock className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">AKSES DASHBOARD</span>
              <span className="sm:hidden">DASHBOARD</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Responsive Split/Stack */}
      <section className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Content */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative order-2 lg:order-1">
          <div
            className="max-w-lg text-center lg:text-left"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
            }}>
            <div className="mb-8">
              <div className="inline-block p-3 bg-gradient-to-r from-gray-100 to-green-100 rounded-2xl mb-6">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
                <span className="bg-gradient-to-r from-green-600 via-green-600 to-green-600 bg-clip-text text-transparent">
                  SUSTAINABLE
                </span>
                <br />
                <span className="text-gray-900">FOREST</span>
                <br />
                <span className="text-lg md:text-xl lg:text-2xl font-normal text-gray-500">
                  SISTEM
                </span>
              </h1>
            </div>

            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Platform administrasi untuk pengelolaan konservasi hutan
            </p>

            <div className="flex flex-col space-y-4">
              <Button
                size="lg"
                className="bg-primary text-white hover:bg-green-700 border-0 rounded-2xl h-12 md:h-14 text-base md:text-lg font-semibold group"
                onClick={() => (window.location.href = '/login')}>
                AKSES DASHBOARD
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>AMAN</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>REAL-TIME</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>OTOMATIS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Visual */}
        <div className="w-full lg:w-1/2 h-64 md:h-96 lg:h-auto relative overflow-hidden order-1 lg:order-2">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-green-100 to-gray-100">
            {/* Geometric Shapes - Responsive */}
            <div
              className="absolute top-1/4 right-1/4 w-16 md:w-24 lg:w-32 h-16 md:h-24 lg:h-32 border-2 border-green-600/30 rounded-3xl rotate-45"
              style={{
                transform: `rotate(${45 + scrollY * 0.1}deg) translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
              }}
            />
            <div
              className="absolute bottom-1/3 right-1/3 w-12 md:w-16 lg:w-24 h-12 md:h-16 lg:h-24 bg-primary/20 rounded-full"
              style={{
                transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
              }}
            />
            <div
              className="absolute top-1/2 right-1/2 w-8 md:w-12 lg:w-16 h-8 md:h-12 lg:h-16 border border-green-600/40 rotate-12"
              style={{
                transform: `rotate(${12 + scrollY * 0.05}deg)`,
              }}
            />

            {/* Grid Pattern - Responsive */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-6 md:grid-cols-8 grid-rows-6 md:grid-rows-8 h-full w-full">
                {[...Array(64)].map((_, i) => (
                  <div key={i} className="border border-green-600/30"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Responsive Grid */}
      <section className="py-16 md:py-24 lg:py-32 relative bg-gray-50/30">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                MODUL UTAMA
              </span>
            </h2>
            <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-green-600 to-green-600 mx-auto"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative"
                style={{
                  transform: `translateY(${Math.sin(scrollY * 0.01 + index) * 10}px)`,
                }}>
                <div className="relative bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 md:p-8 hover:bg-white/90 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl">
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-green-600 to-green-600 p-[1px]">
                    <div className="w-full h-full bg-white rounded-3xl"></div>
                  </div>

                  <div className="relative z-10">
                    <div className="inline-flex p-3 md:p-4 rounded-2xl bg-primary mb-4 md:mb-6">
                      <div className="text-white">{feature.icon}</div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600 text-base md:text-lg">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section - Responsive */}
      <section className="py-16 md:py-20 bg-green-600/5 relative z-10">
        <div className="container mx-auto px-4">
          <div>
            <div className="flex flex-col gap-6 md:gap-8">
              <div className="flex flex-col items-center gap-1">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center text-green-700">
                  Mitra Kami
                </h3>
                <p className="text-base md:text-lg text-gray-600">
                  Bersama Membangun Hutan Lestari
                </p>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8 mt-4 md:mt-8">
                {partnerItems.map((item) => {
                  return (
                    <div
                      key={item.alt}
                      className="w-20 md:w-28 lg:w-32 xl:w-40 flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="overflow-hidden rounded-lg bg-white p-2 md:p-3 lg:p-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA - Responsive */}
      <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-primary/10"></div>
        <div className="container mx-auto px-4 md:px-8 lg:px-12 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 md:mb-8 text-white">
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                SIAP BERKONTRIBUSI
              </span>
            </h2>

            <p className="text-lg md:text-xl text-white/80 mb-8 md:mb-12">
              Kelola data dan pantau hutan secara efisien
            </p>

            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-white/90 border-0 rounded-full h-12 md:h-14 lg:h-16 px-8 md:px-10 lg:px-12 text-base md:text-lg lg:text-xl font-bold group"
              onClick={() => (window.location.href = '/login')}>
              <Monitor className="mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
              <span className="hidden sm:inline">MASUK PANEL ADMIN</span>
              <span className="sm:hidden">PANEL ADMIN</span>
              <ArrowRight className="ml-2 md:ml-3 h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - Responsive */}
      <footer className="border-t border-gray-200 py-6 md:py-8 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="font-bold text-gray-900 text-sm md:text-base">
                SUSTAINABLE FOREST
              </span>
            </div>
            <div className="text-gray-600 text-xs md:text-sm">© 2025 Sistem Kontrol Hutan</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
