import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <img 
          src={heroBg} 
          alt="Hero background" 
          className="w-full h-full object-cover animate-wave"
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 pb-2 bg-gradient-to-r from-hero-from to-hero-to bg-clip-text text-transparent leading-tight">
            Transform Data into Intelligence
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Automated data modeling, quality checks, and AI-driven insights to reports—all in one unified platform
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
