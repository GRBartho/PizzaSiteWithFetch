import React from "react";
import Button from "../../components/SBComponents/AddTakeButton/Button";

export default {
  title: "Button",
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Add = Template.bind({});
Add.args = {
  backgroundColor: "white",
  label: "+",
  size: "small",
  color: "black",
  borderRadius: 10,
  fontWeigth: 900,
  margin: 10,
};

export const Take = Template.bind({});
Take.args = {
  backgroundColor: "white",
  label: "-",
  size: "small",
  color: "black",
  borderRadius: 10,
  fontWeigth: 900,
  margin: 10,
};
