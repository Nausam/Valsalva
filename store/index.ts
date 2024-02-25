import { proxy } from "valtio";

const state = proxy({
  footPocketColor: "#454545",
  finColor: "#353535",
  bezelColor: "#353535",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "/assets/images/valsalva.png",
  fullDecal: "/assets/images/default.jpg",
});

export default state;
