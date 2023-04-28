import { GiHealing, GiVacuumCleaner } from "react-icons/gi";
import { MdWorkspacesOutline } from "react-icons/md";
import { TfiHeadphoneAlt } from "react-icons/tfi";

export const projectExperience = [
  {
    name: "Online Support",
    subtext: "TECHNICAL 24/7",
    icon: TfiHeadphoneAlt,
    bg: "#286F6C",
  },
  {
    name: "Health Expertise",
    subtext: 47,
    icon: GiHealing,
    bg: "#EEC048",
  },
  {
    name: "Cleaning Expertise",
    subtext: 67,
    icon: GiVacuumCleaner,
    bg: "#F26440",
  },
  {
    name: "Commitment",
    subtext: "Latest Techniques and Equipment",
    icon: MdWorkspacesOutline,
    bg: "#0f71b0",
  },
];

export const cleaningService = [
  {
    title: "Cleaning Service",
    description:
      "Our cleaning service provides professional cleaning solutions for homes and businesses. We specialize in using environmentally friendly cleaning products and techniques to ensure that your space is not only clean but also safe for your family, employees, and customers. With our experienced and reliable cleaning staff, you can be confident that your space will be sparkling clean and hygienic.",
  },
];
export const healthService = [
  {
    title: "Health Service",
    description:
      "Our healthcare service offers comprehensive medical care and support for individuals and families. We provide personalized and compassionate care to help you achieve optimal health and wellness. Our team of experienced healthcare professionals includes doctors, nurses, and other specialists who are committed to providing high-quality medical care. Whether you need a routine check-up or specialized treatment, we are here to help you every step of the way..",
  },
];

export const workExp = [
  {
    place: "About US:",

    detail:
      "At Grace Business Services, we specialize in providing top-notch cleaning and healthcare services to our clients. With a focus on delivering exceptional quality and customer satisfaction, we are dedicated to creating a clean, safe, and healthy environment for our clients.   We understand the importance of maintaining a clean and hygienic environment, especially in healthcare settings where patient safety is paramount. That's why we use only the latest techniques and equipment, combined with our team's expertise, to ensure that we provide the best possible services to our clients.     We take pride in our commitment to excellence and strive to exceed expectations in every aspect of our business. From our experienced and well-trained employees to our comprehensive range of services, we are confident that we can provide the best solutions to meet our clients' needs.",
  },
  {
    place: "Mission Statement:",
    detail:
      "Our mission is to provide high-quality cleaning and healthcare services that promote a clean, safe, and healthy environment for our clients. We are committed to using the latest techniques and equipment to ensure that our services exceed expectations, and to providing our employees with a safe and rewarding work environment.",
  },
  {
    place: "Vision Statement:",
    detail:
      "Our vision is to be the premier provider of cleaning and healthcare services in the industry, recognized for our exceptional quality, customer service, and commitment to the well-being of our clients and employees. We strive to innovate and evolve with the changing needs of our customers, while maintaining our unwavering dedication to excellence.",
  },
];

export const cleaningServices = [
  {
    title: "CLEAN ALL SURFACES & CABINETS",
    description:
      "We will clean all surfaces, cabinet faces, countertops, tables, etc. Eco-friendly cleaning chemicals available!",
    img: "/clean-surface.webp",
  },
  {
    title: "TRASH REMOVAL",
    description: "We will remove and dispose of refuse and recyclables.",
    img: "/trash.webp",
  },
  {
    title: "VACUUM ALL CARPETS",
    description: "We will vacuum all carpets, rugs and stairs.",
    img: "/vacuum.webp",
  },
  {
    title: "CHANGE LINENS & MAKE BEDS",
    description: "We will change all linens and make beds.",
    img: "/make-bed.webp",
  },
  {
    title: "SWEEP & HAND-WASH ALL FLOORS",
    description: "We will sweep and hand-wash all flooring surfaces.",
    img: "/mop-floor.webp",
  },
  {
    title: "DUST ALL SURFACES",
    description:
      "We will dust all surfaces, tops of fixtures, fans & book cases.",
    img: "/dust.webp",
  },
  {
    title: "CLEAN ALL SINKS & APPLIANCES",
    description:
      "We will clean all sinks, microwaves, refrigerators, ovens, etc.",
    img: "/clean-sink.webp",
  },
  {
    title: "CLEAN ALL TOILETS, SHOWERS & TUBS",
    description:
      "We will clean & sanitize all toilets, wash and remove soap scum from shower stalls and tubs.",
    img: "/clean-bathroom.webp",
  },
  {
    title: "LAUNDRY SERVICES",
    description:
      "We also offer laundry services at an additional cost. Please inquire.",
    img: "/laundry.webp",
  },
];

export const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 1000,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  touchMove: true,
  useCSS: true,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
