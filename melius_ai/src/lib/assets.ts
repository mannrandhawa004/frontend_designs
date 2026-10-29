import canHero from "../../public/images/can-hero.jpg";
import canRender from "../../public/images/can-render.jpg";
import sketch from "../../public/images/sketch.jpg";
import dress from "../../public/images/dress.jpg";
import fabric from "../../public/images/fabric.jpg";

export const img = { canHero, canRender, sketch, dress, fabric };

const px = (id: number, w = 520, h = 740) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

/** Ring of reference frames behind the hero headline. */
export const heroFrames = [
  { src: px(28455223), alt: "Denim editorial" },
  { src: px(2087852), alt: "Model mid jump" },
  { src: px(30836149), alt: "Beauty bottle on yellow" },
  { src: px(18714939), alt: "Green soda cans" },
  { src: px(37668073), alt: "Camera on red" },
  { src: px(29376744), alt: "Pastel 3D form" },
  { src: px(29101883), alt: "Gradient abstract" },
  { src: px(6256851), alt: "Golfer at sunset" },
  { src: px(30652943), alt: "Energy can splash" },
  { src: px(30004063), alt: "Blue purple abstract" },
  { src: px(30004068), alt: "Red abstract curves" },
];

export const photo = {
  golfer: px(6256851, 700, 980),
  golferRed: px(18637338, 420, 560),
  golfers: px(15376276, 420, 560),
  caddie: px(6255015, 420, 560),
  canSplash: px(30652943, 420, 560),
  denim: px(28455223, 700, 980),
  jump: px(2087852, 420, 560),
  bottle: px(30836149, 420, 560),
  cans: px(18714939, 420, 560),
  camera: px(37668073, 700, 980),
  abstract: px(29101883, 420, 560),
  pastel: px(29376744, 420, 560),
  primer: px(30836146, 700, 980),
  vase: px(38692936, 420, 560),
};
