//  lib/index.js
import SpreadFormCard from "./SpreadFormCard";
import SpreadFormPage from "./SpreadFormPage";
import SpritTable from "./SpritTable";
import TableCololumsConf from "./TableCololumsConf";

const components = {
  SpreadFormCard,
  SpreadFormPage,
  SpritTable,
  TableCololumsConf
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

export { SpreadFormCard, SpreadFormPage, SpritTable, TableCololumsConf };
