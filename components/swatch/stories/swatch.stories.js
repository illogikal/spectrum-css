// Import the component markup template
import { Template } from "./template";

export default {
  title: "Swatch",
  description:
    "A swatch shows a small sample of a fill—such as a color, gradient, texture, or material—that is intended to be applied to an object.",
  component: "Swatch",
  argTypes: {
  },
  args: {
    rootClass: "spectrum-Swatch",
  },
  parameters: {
    actions: {
      handles: [],
    },
    status: {
      type: process.env.MIGRATED_PACKAGES.includes("swatch")
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
