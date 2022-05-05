import React from "react";
import OpenList from "../components/SBComponents/OpenList";

export default {
  title: "OpenListButton",
  component: OpenList,
};

const Template = (args) => <OpenList {...args}></OpenList>;

export const DarkOpenList = Template.bind({});
DarkOpenList.args = {
  backgroundColor: "black",
  color: "white",
  size: "small",
  width: "100%",
};

export const LightOpenList = Template.bind({});
LightOpenList.args = {
  backgroundColor: "white",
  color: "#black",
  size: "small",
  margin: 5,
};
