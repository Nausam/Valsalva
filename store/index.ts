import { proxy } from "valtio";

const state = proxy({
  color: "#EFBD48",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "/assets/images/valsalva.jpg",
  fullDecal: "/assets/images/default.jpg",
});

export default state;
