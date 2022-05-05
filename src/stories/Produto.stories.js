import React from "react";
import Produto from "../components/SBComponents/Produto";

export default {
  title: "Produto",
  component: Produto,
};

const Template = (args) => <Produto {...args}></Produto>;

export const Red = Template.bind({});
Red.args = {
  backgroundColor: "#A6192E",
  color: "white",
  size: "small",
};

export const Grey = Template.bind({});
Grey.args = {
  backgroundColor: "#1C1C1C",
  color: "#white",
  size: "small",
};
