import React from "react";
import Bar from "../components/SBComponents/TopBottomBar/Bar";

export default {
  title: "TopBottomBar",
  component: Bar,
};

const Template = (args) => <Bar {...args}></Bar>;

export const DarkBar = Template.bind({});
DarkBar.args = {
  backgroundColor: "#1c1c1c",
  color: "white",
  size: "small",
  margin: 0,
  justifyContent: "center",
  flexDirection: "column",
};

export const DarkBarRound = Template.bind({});
DarkBarRound.args = {
  backgroundColor: "#1c1c1c",
  color: "white",
  size: "small",
  borderRadius: 10,
  margin: 5,
};

export const LightBar = Template.bind({});
LightBar.args = {
  backgroundColor: "white",
  color: "#1c1c1c",
  size: "small",
};
