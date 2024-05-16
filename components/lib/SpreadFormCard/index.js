import SpreadFormCard from "./src/main.vue";

SpreadFormCard.install = function (Vue) {
  Vue.component(SpreadFormCard.name, SpreadFormCard);
};

export default SpreadFormCard;
