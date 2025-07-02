import { ArrowRight, Database, Eye, Leaf, Lock, Monitor, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

export function OnboardingScreen() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-5">
        <div
          className="absolute inset-0 bg-gradient-to-br from-muted via-accent to-muted"
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

      {/* Floating Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-full px-8 py-3 shadow-lg">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="font-bold text-lg text-foreground">SUSTAINABLE FOREST</span>
            </div>
            <Button
              variant="ghost"
              className="text-primary hover:bg-accent rounded-full px-6 hover:text-primary"
              onClick={() => (window.location.href = '/login')}>
              <Lock className="h-4 w-4 mr-2" />
              AKSES ADMIN
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Split Screen */}
      <section className="min-h-screen flex">
        {/* Left Side - Content */}
        <div className="w-1/2 flex items-center justify-center p-12 relative">
          <div
            className="max-w-lg"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
            }}>
            <div className="mb-8">
              <div className="inline-block p-3 bg-gradient-to-r from-muted to-accent rounded-2xl mb-6">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-6xl font-black leading-tight mb-6">
                <span className="bg-gradient-to-r from-primary via-primary to-primary bg-clip-text text-transparent">
                  SUSTAINABLE
                </span>
                <br />
                <span className="text-foreground">FOREST</span>
                <br />
                <span className="text-2xl font-normal text-muted-foreground">SISTEM</span>
              </h1>
            </div>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Platform administrasi untuk pengelolaan konservasi hutan
            </p>

            <div className="flex flex-col space-y-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 border-0 rounded-2xl h-14 text-lg font-semibold group"
                onClick={() => (window.location.href = '/login')}>
                AKSES DASHBOARD
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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
        <div className="w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-muted via-accent to-muted">
            {/* Geometric Shapes */}
            <div
              className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-primary/30 rounded-3xl rotate-45"
              style={{
                transform: `rotate(${45 + scrollY * 0.1}deg) translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
              }}
            />
            <div
              className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-primary/20 rounded-full"
              style={{
                transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
              }}
            />
            <div
              className="absolute top-1/2 right-1/2 w-16 h-16 border border-primary/40 rotate-12"
              style={{
                transform: `rotate(${12 + scrollY * 0.05}deg)`,
              }}
            />

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                {[...Array(64)].map((_, i) => (
                  <div key={i} className="border border-primary/30"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Cards Floating */}
      <section className="py-32 relative bg-muted/30">
        <div className="container mx-auto px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                MODUL UTAMA
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative"
                style={{
                  transform: `translateY(${Math.sin(scrollY * 0.01 + index) * 10}px)`,
                }}>
                <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 hover:bg-card/90 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl">
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary to-primary p-[1px]">
                    <div className="w-full h-full bg-card rounded-3xl"></div>
                  </div>

                  <div className="relative z-10">
                    <div className="inline-flex p-4 rounded-2xl bg-primary mb-6">
                      <div className="text-primary-foreground">{feature.icon}</div>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-card-foreground">
                      {feature.title}
                    </h3>

                    <p className="text-muted-foreground text-lg">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col items-center gap-1">
                <h3
                  className="text-4xl md:text-5xl font-semibold text-center"
                  style={{ color: '#237277' }}>
                  Mitra Kami
                </h3>
                <p className="text-lg text-muted-foreground">Bersama Membangun Hutan Lestari</p>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-8 mt-8">
                {partnerItems.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="w-32 md:w-40 flex flex-col items-center gap-2 group">
                      <div className="overflow-hidden rounded-lg bg-white p-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
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

      {/* Bottom CTA - Full Width */}
      <section className="py-24 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-primary/10"></div>
        <div className="container mx-auto px-12 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-black mb-8 text-primary-foreground">
              <span className="bg-gradient-to-r from-primary-foreground to-primary-foreground/80 bg-clip-text text-transparent">
                SIAP BERKONTRIBUSI
              </span>
              <br />
            </h2>

            <p className="text-xl text-primary-foreground/80 mb-12">
              Kelola data dan pantau hutan secara efisien
            </p>

            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-0 rounded-full h-16 px-12 text-xl font-bold group"
              onClick={() => (window.location.href = '/login')}>
              <Monitor className="mr-3 h-6 w-6" />
              MASUK PANEL ADMIN
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="border-t border-border py-8 bg-background">
        <div className="container mx-auto px-12">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="font-bold text-foreground">SUSTAINABLE FOREST</span>
            </div>
            <div className="text-muted-foreground text-sm">© 2025 Sistem Kontrol Hutan</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
