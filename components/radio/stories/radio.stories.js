// Import the component markup template
import { Template } from "./template";

export default {
  title: "Radio",
  description:
    "A radio selector allow users to select a single option from a list of mutually exclusive options. All possible options are exposed up front for users to compare.",
  component: "Radio",
  argTypes: {
    label: {
      name: "Label",
      type: { name: "string" },
      table: {
        type: { summary: "string" },
        category: "Content",
      },
      control: { type: "text" },
    },
    name: {
      name: "Name",
      type: { name: "string" },
      table: {
        type: { summary: "string" },
        category: "Component",
      },
      control: { type: "text" },
    },
  },
  args: {
    rootClass: "spectrum-Radio",
    size: "s",
  },
  parameters: {
    actions: {
      handles: [],
    },
    status: {
      type: process.env.MIGRATED_PACKAGES.includes("radio")
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
