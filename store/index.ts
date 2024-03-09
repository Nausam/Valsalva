import { proxy } from "valtio";

const state = proxy({
  footPocketColor: "#454545",
  finColor: "#ffffff",
  bezelColor: "#353535",
  bladeAngle: "20",
  softness: "Medium",
  bladeSize: "Short",
  bladeCut: "Round",
  isLogoTexture: true,
  isFullTexture: false,
  selectedImage: "",
  logoDecal: "/assets/images/valsalva.png",
  fullDecal: "/assets/images/default.jpg",
});

export default state;
