import React from "react";
import CartButton from "../../components/SBComponents/CartButton/CartButton";

export default {
  title: "CartButton",
  component: CartButton,
};

const Template = (args) => <CartButton {...args} />;

export const WhiteC = Template.bind({});
WhiteC.args = {
  size: "small",
  color: "white",
  margin: 0,
};

export const BlackC = Template.bind({});
BlackC.args = {
  size: "small",
  color: "black",
  margin: 0,
};
