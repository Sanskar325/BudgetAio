
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lightbulb, ArrowRight, Sparkles, BarChart, Wallet, TrendingUp, ShieldCheck, PieChart, Clock, Smartphone, CreditCard, BadgeCheck } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";

const HomePage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  
  const coreFeatures = [
    {
      title: "AI-Powered Budgeting",
      description: "Our algorithms analyze your spending and automatically optimize your budget categories.",
      icon: <PieChart className="h-6 w-6 text-primary" />,
      color: "bg-emerald-100/50 dark:bg-emerald-900/20"
    },
    {
      title: "Real-Time Analytics",
      description: "Instant visualizations of your financial data with actionable insights.",
      icon: <BarChart className="h-6 w-6 text-primary" />,
      color: "bg-blue-100/50 dark:bg-blue-900/20"
    },
    {
      title: "Investment Tracking",
      description: "Consolidated view of all your investments with performance metrics.",
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      color: "bg-purple-100/50 dark:bg-purple-900/20"
    }
  ];

  const premiumFeatures = [
    {
      title: "24/7 Monitoring",
      description: "Continuous tracking of your accounts with anomaly detection.",
      icon: <Clock className="h-5 w-5 text-primary" />
    },
    {
      title: "Mobile Optimization",
      description: "Full-featured experience on all your devices.",
      icon: <Smartphone className="h-5 w-5 text-primary" />
    },
    {
      title: "Secure Payments",
      description: "Enterprise-grade encryption for all transactions.",
      icon: <CreditCard className="h-5 w-5 text-primary" />
    },
    {
      title: "Certified Advisors",
      description: "Access to licensed financial professionals.",
      icon: <BadgeCheck className="h-5 w-5 text-primary" />
    }
  ];
  
  const testimonials = [
    {
      name: "Satakshi",
      role: "AIML Developer",
      content: "The predictive cash flow analysis helped me avoid overdraft fees three times last quarter.",
      avatar: "/images/image1.png",
      rating: 5
    },
    {
      name: "Risabh",
      role: "Electronics Engineer",
      content: "Automated expense categorization saved me 5 hours per month on bookkeeping.",
      avatar: "/images/cat.png",
      rating: 5
    },
    {
      name: "Pravek",
      role: "Bookie",
      content: "Portfolio rebalancing suggestions increased my returns by 18% annually.",
      avatar: "/images/image3.png",
      rating: 4
    }
  ];

  const performanceMetrics = [
    { value: "4.9/5", label: "Average Rating", icon: <Sparkles className="h-5 w-5" /> },
    { value: "98%", label: "User Retention", icon: <ShieldCheck className="h-5 w-5" /> },
    { value: "3.5x", label: "ROI Improvement", icon: <TrendingUp className="h-5 w-5" /> },
   
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-secondary/20 blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-accent/10 blur-2xl"></div>
      </div>

      {/* Glass Morphism Header */}
      <header className="relative z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto py-4 px-6 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <img 
              src="/images/onenew.png" 
              alt="budgetAI Logo" 
              className="h-10 w-auto"
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              budgetAI
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-full hover:bg-primary/10"
            >
              <Lightbulb className="h-5 w-5" />
            </Button>
            <Button
              onClick={() => navigate("/login")}
              className="rounded-full border-primary/30 hover:border-primary/50"
              variant="outline"
            >
              Get Started
            </Button>
          </motion.div>
        </div>
      </header>
      
      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-6">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:w-1/2 text-left lg:pr-10"
              >
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Sparkles className="h-4 w-4" />
                  Next-Gen Financial Intelligence
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
                  Precision Finance <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">Powered by AI</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
                  Transform your financial management with our cutting-edge platform that learns your habits, predicts cash flow, and optimizes every rupee.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      onClick={() =>  window.location.href="https://www.youtube.com/watch?v=305pfWlsvdg"} 
                      size="lg"
                      className="rounded-full px-8 text-base shadow-lg"
                    >
                      Watch Demo
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </motion.div>
                  
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="lg:w-1/2 relative mt-10 lg:mt-0"
              >
                <div className="relative h-[420px] w-full overflow-hidden rounded-2xl shadow-2xl border border-border/50">
                  <img
                    src="/images/dash.png"
                    alt="budgetAI Dashboard Preview"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <p className="text-white text-lg font-medium">Financial Command Center</p>
                    <p className="text-white/80 text-sm">Real-time wealth management dashboard</p>
                  </div>
                </div>
                <motion.div 
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-4 -right-4 bg-background/90 backdrop-blur-sm border border-primary/20 p-4 rounded-xl shadow-lg"
                >
                  <p className="text-primary font-medium flex items-center gap-1">
                    <Sparkles className="h-4 w-4" /> AI Insights Active
                  </p>
                  <p className="text-sm text-muted-foreground">24/7 monitoring</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
          
        {/* Performance Metrics */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-12 bg-background/80 backdrop-blur-sm border-y border-border/50"
        >
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {performanceMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="text-center p-4 bg-card/50 rounded-xl"
                >
                  <div className="flex justify-center mb-2 text-primary">
                    {metric.icon}
                  </div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    {metric.value}
                  </p>
                  <p className="text-muted-foreground">{metric.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
          
        {/* Core Features Section */}
        <section id="features" className="py-20 md:py-28 px-6 relative">
          <div className="absolute inset-0 bg-grid-small-black/[0.03] dark:bg-grid-small-white/[0.03]"></div>
          <div className="container mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise-Grade Financial Tools</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Professional-grade analytics for personal wealth management
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {coreFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-card/80 backdrop-blur-sm p-8 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-2 ${feature.color}`}
                >
                  <div className={`h-14 w-14 rounded-xl ${feature.color} flex items-center justify-center mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Premium Features Grid */}
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Premium Features</h3>
                  <p className="text-muted-foreground mb-8">
                    Our premium tier includes advanced tools for serious investors and financial professionals.
                  </p>
                  <Button 
                    onClick={() => navigate("/signup")} 
                    size="lg"
                    className="rounded-full px-8"
                  >
                    Explore Premium Plans
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {premiumFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -3 }}
                      className="bg-background/70 p-4 rounded-lg border border-border/30"
                    >
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        {feature.icon}
                      </div>
                      <h4 className="font-medium mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 md:py-28 px-6 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Financial Professionals</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Hear from users who transformed their financial management
              </p>
            </motion.div>
            
            <div className="relative mx-auto max-w-5xl px-8">
              <Carousel className="w-full">
                <CarouselContent>
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <motion.div
                        whileHover={{ y: -5 }}
                        className="h-full"
                      >
                        <div className="bg-card/80 backdrop-blur-sm p-8 rounded-xl border border-border/50 shadow-sm h-full flex flex-col">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="h-14 w-14 rounded-full overflow-hidden bg-primary/10 border border-border/50">
                              <img 
                                src={testimonial.avatar} 
                                alt={testimonial.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-semibold">{testimonial.name}</h4>
                              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                              <div className="flex mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-muted-foreground/30'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-lg italic mb-6 flex-grow">"{testimonial.content}"</p>
                          <div className="text-primary text-sm font-medium">
                            Verified Professional User
                          </div>
                        </div>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="absolute -left-4 top-1/2 -translate-y-1/2">
                  <CarouselPrevious className="relative left-0 border-border/50 hover:border-primary" />
                </div>
                <div className="absolute -right-4 top-1/2 -translate-y-1/2">
                  <CarouselNext className="relative right-0 border-border/50 hover:border-primary" />
                </div>
              </Carousel>
            </div>
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="py-20 md:py-28 px-6 relative bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-background/80 backdrop-blur-sm p-12 rounded-2xl border border-border/50 shadow-xl"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Revolutionize Your Finances?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of professionals who trust our platform for their financial management needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      onClick={() => navigate("/login")} 
                      size="lg"
                      className="rounded-full px-8 text-base shadow-lg"
                    >
                      Get Started 
                    </Button>
                  </motion.div>
                 
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Elegant Footer */}
      <footer className="relative z-10 bg-background/90 backdrop-blur-md py-12 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img 
                src="/images/onenew.png" 
                alt="budgetAI Logo" 
                className="h-8 w-auto"
              />
              <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                budgetAI
              </h2>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              
              
              <div className="text-muted-foreground text-sm">
                © 2025 budgetAI. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
