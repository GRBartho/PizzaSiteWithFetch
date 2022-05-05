import RefreshButton from "../../components/SBComponents/RefreshButton";
import React from "react";

export default {
  title: "RefreshButton",
  component: RefreshButton,
};

const Template = (args) => <RefreshButton {...args} />;

export const WhiteR = Template.bind({});
WhiteR.args = {
  size: "small",
  color: "white",
  margin: 0,
};

export const BlackR = Template.bind({});
BlackR.args = {
  size: "small",
  color: "black",
  margin: 0,
};
