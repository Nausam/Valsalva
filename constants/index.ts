import {
  swatch,
  fileIcon,
  ai,
  logoShirt,
  stylishShirt,
} from "../customizer/index.js";

export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Customize",
    route: "/product/65e9d07d684eaf43ce92ee67/custom",
  },
  {
    label: "Shop",
    route: "/shop",
  },
  {
    label: "Profile",
    route: "/profile",
  },
];

export const adminLinks = [
  {
    label: "Create Product",
    route: "/product/create",
  },
];

export const productDefaultValues = {
  title: "",
  description: "",
  imageUrl: "",
  categoryId: "",
  price: "",
  footPocketColor: "",
};

export const EditorTabs = [
  // {
  //   name: "colorpicker",
  //   icon: swatch,
  // },
  {
    name: "filepicker",
    icon: fileIcon,
  },
  // {
  //   name: "aipicker",
  //   icon: ai,
  // },
];

export const FilterTabs = [
  {
    name: "logoShirt",
    icon: logoShirt,
  },
  {
    name: "stylishShirt",
    icon: stylishShirt,
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};
