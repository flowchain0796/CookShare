'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { 
  Search, User, ShoppingBag, ChefHat, Star, 
  Globe, Award, Users, Heart, Utensils, Clock,
  BookOpen, LucideIcon, Mail, Instagram, Twitter,
  Facebook, Youtube, ArrowRight
} from 'lucide-react';
import Link from 'next/link';

// Types
type NavItem = {
  label: string;
  href: string;
  icon?: LucideIcon;
};

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
};

type Recipe = {
  id: string;
  title: string;
  chef: string;
  rating: number;
  tokens: number;
  time: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  image: string;
};

type Statistic = {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
};

type FooterSection = {
  title: string;
  links: string[];
};

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  // Navigation Items
  const navItems: NavItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Explore', href: '#explore' },
    { label: 'Community', href: '#community' },
    { label: 'Rewards', href: '#rewards' }
  ];

  // Features Data
  const features: Feature[] = [
    {
      icon: Globe,
      title: "Global Kitchen",
      description: "Connect with chefs worldwide and explore diverse cuisines from every corner of the globe. Share your local specialties and discover new flavors.",
      gradient: "from-orange-400 to-pink-500"
    },
    {
      icon: Award,
      title: "Earn & Learn",
      description: "Get rewarded with tokens for sharing recipes, helping others, and contributing to the community. Redeem tokens for cooking classes and premium content.",
      gradient: "from-purple-400 to-blue-500"
    },
    {
      icon: Users,
      title: "Community First",
      description: "Join cooking challenges, participate in live cooking sessions, and get personalized feedback from expert chefs. Learn, grow, and inspire together.",
      gradient: "from-green-400 to-teal-500"
    }
  ];

  // Featured Recipes
  const recipes: Recipe[] = [
    {
      id: "1",
      title: "Artisan Sourdough Bread",
      chef: "Maria Chen",
      rating: 4.8,
      tokens: 150,
      time: "3h 30m",
      difficulty: "Medium",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0AK2j7Ew41e2RgafV71sgpFf5e1LBc6AQyA&s"
    },
    {
      id: "2",
      title: "Thai Green Curry",
      chef: "Alex Thompson",
      rating: 4.9,
      tokens: 120,
      time: "45m",
      difficulty: "Medium",
      image: "https://www.thespruceeats.com/thmb/lRkFd-tG5HDOJQtwQHXM__6GjDw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/thai-green-curry-recipe-p3-3217442-hero-1-a3fcdfbc551849718c7750fa63ec8c6a.jpg"
    },
    {
      id: "3",
      title: "Classic Tiramisu",
      chef: "Giovanni Rossi",
      rating: 4.7,
      tokens: 100,
      time: "4h",
      difficulty: "Easy",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo_AMxqiw3IGuAEJ_N_Opx6PMSFy9IB5-RHA&s"
    }
  ];

  // Statistics
  const stats: Statistic[] = [
    { value: "50", label: "Countries", suffix: "+" },
    { value: "100", label: "Master Chefs", suffix: "K+" },
    { value: "500", label: "Recipes Shared", suffix: "K+" },
    { value: "1", label: "Community Members", prefix: "", suffix: "M+" }
  ];

  // Footer Sections
  const footerSections: FooterSection[] = [
    {
      title: "Company",
      links: ["About Us", "Careers", "Press", "Blog"]
    },
    {
      title: "Community",
      links: ["Chef Partners", "Ambassador Program", "Events", "Forum"]
    },
    {
      title: "Resources",
      links: ["Cooking Tips", "Recipe Guidelines", "Token System", "Help Center"]
    },
    {
      title: "Legal",
      links: ["Terms of Service", "Privacy Policy", "Cookie Policy", "Guidelines"]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen relative text-gray-900">
      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 -z-10"
        animate={{
          background: [
            'linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)',
            'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
            'linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)'
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{ opacity: backgroundOpacity }}
      />

      {/* Navigation */}
      <motion.nav
        className={`fixed w-full z-50 px-8 py-4 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-lg' : 'bg-white/20 backdrop-blur-sm'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <ChefHat size={32} className="text-orange-600" />
            <span className="text-2xl font-bold text-orange-600">
              CookShare
            </span>
          </motion.div>
          </Link>

          <div className="flex gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="text-gray-900 font-medium hover:text-orange-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <motion.button
              className="p-2 hover:bg-orange-50 rounded-full text-gray-900"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search size={20} />
            </motion.button>
            <Link href="/explore">
            <motion.button
              className="bg-orange-600 text-white px-6 py-2 rounded-full font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Cooking
            </motion.button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-6xl font-bold leading-tight mb-6 text-gray-900"
              variants={fadeInUp}
            >
              Share Your
              <span className="block text-orange-600">
                Culinary Magic
              </span>
              with the World
            </motion.h1>
            <motion.p
              className="text-xl text-gray-800 mb-8"
              variants={fadeInUp}
            >
              Join our global community of home chefs. Share recipes, earn tokens, and
              connect with food lovers worldwide. Transform your kitchen into a hub of
              creativity and inspiration.
            </motion.p>
            <motion.div
              className="flex gap-4"
              variants={fadeInUp}
            >
              <Link href="/explore">
              <motion.button
                className="bg-orange-600 text-white px-8 py-4 rounded-full font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Sharing
              </motion.button>
              </Link>
              <Link href="/explore">
              <motion.button
                className="bg-white/80 text-gray-900 backdrop-blur-sm px-8 py-4 rounded-full font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Recipes
              </motion.button>
              </Link>

            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src="https://wallpapers.com/images/hd/food-4k-spdnpz7bhmx4kv2r.jpg"
              alt="Featured dishes"
              className="rounded-2xl shadow-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.div
              className="absolute -top-8 -right-8 bg-white p-4 rounded-xl shadow-lg"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            >
              <div className="flex items-center gap-2">
                <Star className="text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-gray-900">4.9</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <motion.section
        className="py-24 px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Why Choose CookShare?</h2>
            <p className="text-xl text-gray-800 max-w-2xl mx-auto">
              Join a platform that rewards creativity, fosters culinary excellence, and builds
              meaningful connections through the universal language of food.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm"
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div 
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <feature.icon className="text-white" size={24} />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-800">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Recipes Section */}
      <motion.section
        className="py-24 px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Featured Recipes</h2>
            <p className="text-xl text-gray-800 max-w-2xl mx-auto">
              Discover popular recipes from our talented community of chefs.
              Get inspired and start cooking today.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {recipes.map((recipe) => (
              <motion.div
                key={recipe.id}
                className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden"
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <img 
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{recipe.title}</h3>
                  <p className="text-gray-800 mb-4">By {recipe.chef}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Star className="text-yellow-500 fill-yellow-500" size={16} />
                      <span className="text-gray-900">{recipe.rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-700" />
                      <span className="text-gray-800">{recipe.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen size={16} className="text-gray-700" />
                      <span className="text-gray-800">{recipe.difficulty}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <Star className="text-orange-600" size={16} />
                      <span className="text-orange-600 font-semibold">{recipe.tokens} tokens</span>
                    </div>
                    <motion.button
                      className="text-orange-600 font-semibold flex items-center gap-1"
                      whileHover={{ x: 5 }}
                    >
                      View Recipe <ArrowRight size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Statistics Section */}
      {/* <motion.section
        className="py-24 px-8 bg-orange-600 text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-4xl font-bold mb-2">
                  {stat.prefix}{stat.value}{stat.suffix}
                </p>
                <p className="text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section> */}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-orange-500 to-pink-500 text-white pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <ChefHat size={32} />
                <span className="text-2xl font-bold">CookShare</span>
              </div>
              <p className="text-white/80 mb-8 max-w-sm">
                Empowering home chefs to share their passion for cooking
                and connect with food lovers around the world.
              </p>
              <div className="flex gap-4">
                {[Instagram, Twitter, Facebook, Youtube].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="bg-white/10 p-2 rounded-full hover:bg-white/20"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <motion.a
                        href="#"
                        className="text-white/80 hover:text-white"
                        whileHover={{ x: 5 }}
                      >
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/20 pt-8 mt-12">
            <div className="flex justify-between items-center">
              <p className="text-white/60">
                © {new Date().getFullYear()} CookShare. All rights reserved.
              </p>
              <div className="flex gap-8 text-white/60">
                <motion.a
                  href="#"
                  className="hover:text-white"
                  whileHover={{ scale: 1.05 }}
                >
                  Terms
                </motion.a>
                <motion.a
                  href="#"
                  className="hover:text-white"
                  whileHover={{ scale: 1.05 }}
                >
                  Privacy
                </motion.a>
                <motion.a
                  href="#"
                  className="hover:text-white"
                  whileHover={{ scale: 1.05 }}
                >
                  Cookies
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}