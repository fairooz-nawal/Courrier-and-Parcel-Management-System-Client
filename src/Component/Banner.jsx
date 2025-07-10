import { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { motion } from 'framer-motion'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bg1 from '../assets/banner1.jpg'
import bg2 from '../assets/banner2.jpg'
import bg3 from '../assets/Banner3.jpg'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.8 } },
}

const slides = [
  {
    img: bg1,
    alt: 'Banner 1',
    lines: ['Website for Transport', 'and Logistics'],
    textColor: 'text-white',
    textPosition: 'bottom-[20%] lg:top-[30%] lg:left-[10%]',
  },
  {
    img: bg2,
    alt: 'Banner 2',
    lines: ['Tracking Services', 'To any Destination'],
    textColor: 'text-black',
    textPosition: 'bottom-[20%] lg:top-[30%] lg:left-[10%]',
  },
  {
    img: bg3,
    alt: 'Banner 3',
    lines: ['Ultimate Ground', 'Support Network'],
    textColor: 'text-black',
    textPosition: 'top-[20%] right-0 lg:top-[30%] lg:right-[10%]',
  },
]

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div>
      <Carousel
        autoPlay
        infiniteLoop
        showArrows
        interval={2000}
        showThumbs={false}
        onChange={(index) => setCurrentIndex(index)}
      >
        {slides.map(({ img, alt, lines, textColor, textPosition }, index) => (
          <div key={index} className="relative h-[300px] lg:h-[600px]">
            <img className="w-full h-full object-cover" src={img} alt={alt} />
            {currentIndex === index && (
              <motion.div
                className={`absolute z-10 ${textPosition}`}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                {lines.map((line, i) => (
                  <p
                    key={i}
                    className={`${textColor} font-extrabold text-2xl md:text-4xl lg:text-6xl`}
                  >
                    {line}
                  </p>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default Banner
