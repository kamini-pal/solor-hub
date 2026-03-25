import { motion } from 'framer-motion';

const images = [
  "/solor5.avif",
  "/solor6.avif",
  "/solor7.avif",
  "/solor8.avif",
  "/solor9.avif",
  "/solor10.avif"
];

export default function GalleryPreview() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Our <span className="text-glow-accent text-accent">Installations</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            See the beautiful integration of our premium solar panels in modern homes and commercial spaces.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
                index % 4 === 0 || index === 5 ? 'md:col-span-2 md:row-span-2 h-64 md:h-[500px]' : 'h-48 md:h-[240px]'
              }`}
            >
              <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-500 z-10 pointer-events-none" />
              <img 
                src={src} 
                alt={`Installation ${index + 1}`} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                <div className="bg-dark/80 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-white text-sm font-medium">View Image</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
