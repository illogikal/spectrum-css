// Import the component markup template
import { Template } from "./template";

export default {
  title: "Switch",
  description:
    "A switch is used to turn an option on or off. Switches allow users to select the state of a single option at a time.",
  component: "Switch",
  argTypes: {
  },
  args: {
    rootClass: "spectrum-Switch",
  },
  parameters: {
    actions: {
      handles: [],
    },
    status: {
      type: process.env.MIGRATED_PACKAGES.includes("switch")
        ? "migrated"
        : undefined,
    },
    // Getting the Figma link: https://help.figma.com/hc/en-us/articles/360045003494-Storybook-and-Figma
    // design: {
    //   type: "figma",
    //   url: "https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File",
    // },
  },
};

export const Default = Template.bind({});
Default.args = {};
