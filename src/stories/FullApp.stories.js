import FullApp from "../components/SBComponents/FullApp";

export default {
  title: "FullApp",
  component: FullApp,
};

const Template = (args) => <FullApp {...args}></FullApp>;

export const Dark = Template.bind({});
Dark.args = {
  backgroundColor: "#D9B48F",
};
