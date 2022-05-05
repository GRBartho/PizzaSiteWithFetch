import React from "react";
import BackButton from "../../components/SBComponents/BackButton";

export default {
  title: "BackButton",
  component: BackButton,
};

const Template = (args) => <BackButton {...args} />;

export const WhiteBackButton = Template.bind({});
WhiteBackButton.args = {
  size: "small",
  color: "white",
  margin: 10,
};

export const BlackBackButton = Template.bind({});
BlackBackButton.args = {
  size: "small",
  color: "black",
  margin: 0,
};
