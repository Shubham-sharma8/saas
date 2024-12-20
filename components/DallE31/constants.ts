import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, { message: "Prompt is required" }),
  amount: z.string(),
  resolution: z.string(),
  modelImage: z.string(),
  styleOption: z.string().optional(), // Make styleOption optional
  colorOption: z.string().optional(), // Make colorOption optional
});

export const amountOptions = [
  {
    value: "1",
    label: "1 Image"
  },
  {
    value: "2",
    label: "2 Images"
  },
  {
    value: "3",
    label: "3 Images"
  },
  {
    value: "4",
    label: "4 Images"
  },
  {
    value: "5",
    label: "5 Images"
  },
  
  {
    value: "6",
    label: "6 Images"
  },
  {
    value: "7",
    label: "7 Images"
  },
  {
    value: "8",
    label: "8 Images"
  },

];

export const modelforImage = [
  
  {
    value: "dall-e-3",
    label: "DALL-3",
    image: "/logo.png"
  },
];

export const resolutionOptions = [
  
  {
    value: "1024x1024",
    label: "1024x1024",
  },
  {
    value: "1024x1792",
    label: "1024x1792",
  },
  {
    value: "1792x1024",
    label: "1792x1024",
  },
 
];

export const styleOption = [
  
  {
    value: "Anime",
    label: "Anime",
    image: "/image/option/Anime.png"
  },
  {
    value: "Digital Art",
    label: "Digital Art",
    image: "/image/option/Digital art.png"

  },
  {
    value: "Fantasy Art",
    label: "Fantasy Art",
    image: "/image/option/Fantasy Art.png"

  },
  {
    value: "Neon Pink",
    label: "Neon Pink",
    image: "/image/option/Neon Pink.png"

  },
  {
    value: "Low Poly",
    label: "Low Poly",
    image: "/image/option/Low Poly.png"

  },
  {
    value: "Line Art",
    label: "Line Art",
    image: "/image/option/Line Art.png"

  },
  {
    value: "Cinematic",
    label: "Cinematic",
    image: "/image/option/Cinematic.png"

  },
  {
    value: "Pixel Art",
    label: "Pixel Art",
    image: "/image/option/Pixel Art.png"

  },
  {
    value: "Enhanced",
    label: "Enhanced",
    image: "/image/option/Enhanced.png"

  },
  {
    value: "Photorealistic",
    label: "Photorealistic",
    image: "/image/option/Photorealisitic.png"

  },
  {
    value: "Comic Book",
    label: "Comic Book",
    image: "/image/option/Comic Book.png"

  },
  {
    value: "Analog Film",
    label: "Analog Film",
    image: "/image/option/Analog Film.png"

  },
  {
    value: "Isometric",
    label: "Isometric",
    image: "/image/option/Isometic.png"

  },
  {
    value: "Origami",
    label: "Origami",
    image: "/image/option/Origami.png"

  },
  {
    value: "Craft Clay",
    label: "Craft Clay",
    image: "/image/option/Craft Clay.png"

  },
  {
    value: "3D Model",
    label: "3D Model",
    image: "/image/option/3D Model.png"

  },
];
export const colorOption = [
  
  {
    value: "Warm Tone",
    label: "Warm Tone",
  },
  {
    value: "Cool Tone",
    label: "Cool Tone",
  },
  {
    value: "Muted Color",
    label: "Muted Color",
  },
  {
    value: "Vibrant Color",
    label: "Vibrant Color",
  },
  {
    value: "Black and White",
    label: "Black and White",
  },
  {
    value: "Pastel Color",
    label: "Pastel Color",
  },
];