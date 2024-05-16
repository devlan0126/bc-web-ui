//  lib/index.js
import SpreadFormCard from "./SpreadFormCard";
import SpreadFormPage from "./SpreadFormPage";

const components = {
  SpreadFormCard,
  SpreadFormPage,
};

const install = function (Vue) {
  if (install.installed) return;
  Object.keys(components).forEach((key) => {
    Vue.component(components[key].name, components[key]);
  });
};

const API = {
  install,
};
export default API;

export { SpreadFormCard, SpreadFormPage };
