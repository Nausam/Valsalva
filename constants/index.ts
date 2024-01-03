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
    route: "/product/customize",
  },
  {
    label: "Create",
    route: "/product/create",
  },
  {
    label: "My Profile",
    route: "/profile",
  },
];

export const productDefaultValues = {
  title: "",
  description: "",
  imageUrl: "",
  categoryId: "",
  price: "",
};

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "filepicker",
    icon: fileIcon,
  },
  {
    name: "aipicker",
    icon: ai,
  },
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
