'use client';

import React, { useState } from 'react';
import { BrowserProvider, ethers } from 'ethers';
import contractAbi from "../contractInfo/contractAbi.json"
import contractAddress from "../contractInfo/contractAddress.json"
import { motion } from 'framer-motion';
import {
  ChefHat, Search, Wallet, Star, Clock, BookOpen,
  Filter, ArrowRight, Gift, Coins, Trophy, Heart,
  User,
  XCircle
} from 'lucide-react';
import Link from 'next/link';

// Types
type Recipe = {
  id: string;
  title: string;
  chef: string;
  rating: number;
  coinCost: number;
  time: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  image: string;
};

type Expert = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  students: number;
  recipes: number;
  image: string;
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

declare global {
  interface Window {
    ethereum?: {
      isMetaMask: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
    };
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Explore() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dailyProgress, setDailyProgress] = useState(75);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [walletAddress, setWalletAddress] = useState('');


  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        setWalletConnected(true);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this feature.');
    }
  };

  const withdraw = async () => {
    const { abi } = contractAbi;
    if (window.ethereum != undefined) {
      const provider = new BrowserProvider(window.ethereum);
      const amount = 100;
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const bounceContract = new ethers.Contract(contractAddress.address, abi, signer)

      await (await bounceContract.mint(address, ethers.parseUnits(amount.toString(), 18))).wait();
    }
  }

  // Sample Categories
  const categories = ['All', 'Asian', 'Italian', 'Mexican', 'Desserts', 'Vegan'];


  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedRecipe(null);
  };

  const handleConfirm = () => {
    closePopup();
    deposit();
  }

  const deposit = async () => {
    const { abi } = contractAbi;
    if (window.ethereum != undefined) {
      const provider = new BrowserProvider(window.ethereum);
      const amount = selectedRecipe?.coinCost || 2;
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const bounceContract = new ethers.Contract(contractAddress.address, abi, signer)

      await (await bounceContract.donate(address, "0x94A7Af5edB47c3B91d1B4Ffc2CA535d7aDA8CEDe", ethers.parseUnits(amount.toString(), 18))).wait();
    }
  }


  // Sample Recipes Data
  const recipes: Recipe[] = [
    {
      id: "1",
      title: "Japanese Ramen",
      chef: "Chef Tanaka",
      rating: 4.9,
      coinCost: 250,
      time: "1h 30m",
      difficulty: "Medium",
      category: "Asian",
      image: "https://d2rdhxfof4qmbb.cloudfront.net/wp-content/uploads/20180323163421/Ramen.jpg"
    },
    {
      id: "2",
      title: "Tiramisu",
      chef: "Marco Rossi",
      rating: 4.8,
      coinCost: 150,
      time: "2h",
      difficulty: "Easy",
      category: "Desserts",
      image: "https://i.redd.it/7a7tcnjv78l31.jpg"
    },
    {
      id: "3",
      title: "Pad Thai",
      chef: "Lisa Wong",
      rating: 4.7,
      coinCost: 200,
      time: "45m",
      difficulty: "Medium",
      category: "Asian",
      image: "https://www.elmundoeats.com/wp-content/uploads/2024/06/FP-Authentic-pad-Thai-in-a-plate.jpg"
    }
  ];

  // Sample Experts Data
  const experts: Expert[] = [
    {
      id: "1",
      name: "Chef Maria Garcia",
      specialty: "Mediterranean Cuisine",
      rating: 4.9,
      students: 15000,
      recipes: 89,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaf9F6CloKMFxBBFyxw2TKV8Al573KfpH96A&s"
    },
    {
      id: "2",
      name: "Chef John Smith",
      specialty: "French Pastry",
      rating: 4.8,
      students: 12000,
      recipes: 64,
      image: "https://thumbs.dreamstime.com/b/chef-cook-character-ai-generated-cartoon-avatar-cartoon-avatar-ai-generated-chef-character-computer-generative-art-image-neural-286003200.jpg"
    },
    {
      id: "3",
      name: "Chef Sarah Lee",
      specialty: "Asian Fusion",
      rating: 4.9,
      students: 18000,
      recipes: 95,
      image: "https://lirp.cdn-website.com/155d819e/dms3rep/multi/opt/artwork-640w.png"
    }
  ];

  return (
    <main className="min-h-screen relative bg-gradient-to-br from-orange-50 to-pink-50 text-gray-800">
      {/* Navigation */}
      <nav className="fixed w-full z-50 px-8 py-4 bg-white/90 backdrop-blur-sm shadow-lg text-gray-900">
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

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search recipes..."
                className="w-full px-4 py-2 pl-10 rounded-full border border-gray-200 focus:outline-none focus:border-orange-600 text-gray-800 placeholder-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          {/* Wallet Connection */}
          {!walletConnected ? (
            <motion.button
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium ${walletConnected
                ? 'bg-green-100 text-green-700'
                : 'bg-orange-600 text-white'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={connectWallet}
            >
              Connect Wallet
            </motion.button>
          ) : (
            <motion.button
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium ${walletConnected
                ? 'bg-green-100 text-green-700'
                : 'bg-orange-600 text-white'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}

            >
              <span >{walletAddress.slice(0, 5) + '...' + walletAddress.slice(-4)}</span>
            </motion.button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Daily Claim Section */}
          <motion.section
            className="mb-12 bg-gradient-to-r from-orange-600 to-pink-600 rounded-2xl p-8 text-white"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">Daily Rewards</h2>
                <p className="text-white/90 mb-4">Claim your daily coins and keep the streak going!</p>
                <div className="flex items-center gap-4">
                  <motion.button
                    className="bg-white text-orange-600 px-6 py-2 rounded-full font-medium flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={withdraw}
                  >
                    <Gift size={20} />
                    Claim 100 Coins
                  </motion.button>
                  <div className="flex items-center gap-2 text-white">
                    <Trophy size={20} />
                    <span>5 Day Streak!</span>
                  </div>
                </div>
              </div>
              <div className="text-center text-white">
                <div className="w-24 h-24 rounded-full border-4 border-white/30 flex items-center justify-center">
                  <div className="text-3xl font-bold">{dailyProgress}%</div>
                </div>
                <p className="mt-2">Daily Progress</p>
              </div>
            </div>
          </motion.section>

          {/* Categories */}
          <div className="flex gap-4 mb-8">
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`px-6 py-2 rounded-full font-medium ${selectedCategory === category
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-orange-50'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Featured Recipes */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Featured Recipes</h2>
            <div className="grid grid-cols-3 gap-8">
              {recipes.map((recipe) => (
                <motion.div
                  key={recipe.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg text-gray-800 cursor-pointer"
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onClick={() => handleRecipeClick(recipe)}
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold">{recipe.title}</h3>
                      <motion.button
                        className="text-gray-400 hover:text-red-500"
                        whileHover={{ scale: 1.2 }}
                      >
                        <Heart size={20} />
                      </motion.button>
                    </div>
                    <p className="text-gray-600 mb-4">By {recipe.chef}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-400" />
                        <span>{recipe.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Coins size={16} className="text-orange-600" />
                        <span>{recipe.coinCost}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{recipe.time}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Recipe Popup */}
          {popupVisible && selectedRecipe && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-white p-8 rounded-lg shadow-lg relative max-w-md w-full">
                <button
                  onClick={closePopup}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                >
                  <XCircle size={24} />
                </button>
                <h3 className="text-2xl font-bold mb-4">Warning</h3>
                <p className="text-gray-700 mb-6">
                  To access <strong>{selectedRecipe.title}</strong>, you need {selectedRecipe.coinCost} tokens.
                </p>
                <button
                  onClick={handleConfirm}
                  className="w-full bg-orange-600 text-white py-2 rounded-full font-medium"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          )}
          <section className="pb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Expert Chefs</h2>
            <div className="grid grid-cols-3 gap-8">
              {experts.map((expert) => (
                <motion.div
                  key={expert.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg text-gray-800"
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold">{expert.name}</h3>
                      <motion.button
                        className="text-gray-400 hover:text-yellow-500"
                        whileHover={{ scale: 1.2 }}
                      >
                        <Star size={20} />
                      </motion.button>
                    </div>
                    <p className="text-gray-600 mb-4">Specialty: {expert.specialty}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-400" />
                        <span>{expert.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen size={16} className="text-orange-600" />
                        <span>{expert.recipes} Recipes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={16} />
                        <span>{expert.students} Students</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
