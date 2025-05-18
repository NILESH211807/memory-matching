import React from 'react'
import { IoColorPalette } from 'react-icons/io5';
import { LuBrainCog } from "react-icons/lu";
import { TfiCup } from 'react-icons/tfi';
import { useNavigate } from 'react-router-dom';

const Home = () => {

   const features = [
      {
         id: 1,
         title: 'Sharpen Your Mind',
         description: 'Simple rules, endless fun. Perfect for players of all ages.',
         icon: <LuBrainCog color='#27548A' />
      },
      {
         id: 2,
         title: 'Score & Level Up',
         description: 'Earn points for every correct match and climb through levels as the game gets tougher. More cards, more pressure can you keep your streak alive?',
         icon: <TfiCup color='#27548A' />
      },
      {
         id: 3,
         title: 'Sleek and Responsive Design',
         description: 'Enjoy a beautifully designed interface with smooth animations and a clean layout. Whether on desktop or mobile, the game adapts to deliver a seamless experience.',
         icon: <IoColorPalette color='#27548A' />
      }
   ];


   const navigate = useNavigate();


   const handleStartPlaying = () => {
      navigate('/game');
   }



   return (
      <div className='w-full min-h-screen'>
         {/* hero section */}
         <div className='w-full h-[60vh] xl:h-screen hero flex items-center justify-center flex-col border-b border-[#d5d9ee]'>
            <h1 className="text-5xl font-bold text-gray-800 mb-6 capitalize text-center">
               Memory matching game
            </h1>
            <p className="w-[90%] text-lg text-gray-600 mb-12 font-semibold min-[700px] text-center">Test your memory and have fun with our exciting card matching game. Challenge yourself and beat your high score!</p>
            <button onClick={handleStartPlaying} className="bg-[#27548A] max-sm:py-4 text-white px-18 py-3 cursor-pointer font-semibold text-lg hover:bg-[#1e4271] transition duration-300 active:scale-95">
               Start Playing
            </button>
         </div>

         {/* Features Section */}

         <div className="w-full py-16">
            <div className='w-full px-5'>
               <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                  Game Features
               </h2>

               <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:px-8 max-w-7xl mx-auto'>
                  {features.map((feature) => (
                     <div
                        key={feature.id}
                        className="bg-[#f0f2ff] rounded-md p-6 h-auto flex items-center justify-center flex-col transition-all duration-300 hover:-translate-y-4 shadow"
                     >
                        <div className="text-purple-600 text-4xl mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-bold mb-2 text-center">{feature.title}</h3>
                        <p className="text-gray-600 font-semibold text-center">{feature.description}</p>
                     </div>
                  ))}
               </div>
            </div>
            <div className="container mx-auto px-4 py-16 text-center mt-10">
               <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                  Ready to Challenge Your Memory?
               </h2>
               <p className="text-gray-600 font-semibold mb-8 max-w-2xl mx-auto">
                  Join thousands of players who are already enjoying our card flip game. Start playing now and see how far you
                  can go!
               </p>
               <button onClick={handleStartPlaying} className="bg-[#27548A] max-sm:py-4 text-white px-18 py-3 cursor-pointer font-semibold text-lg hover:bg-[#1e4271] transition duration-300 active:scale-95">
                  Play Now
               </button>
            </div>
         </div>

      </div>
   )
}

export default Home
