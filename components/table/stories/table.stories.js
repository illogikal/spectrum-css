// Import the component markup template
import { Template } from "./template";

export default {
  title: "Table",
  description:
    "A table is used to create a container for displaying information. It allows users to sort, compare, and take action on large amounts of data.",
  component: "Table",
  argTypes: {
    size: {
      name: "Size",
      table: {
        type: { summary: "string" },
        category: "Component",
      },
      options: ["s", "m"],
      control: "select"
    },
  },
  args: {
    rootClass: "spectrum-Table",
    size: "m",
  },
  parameters: {
    actions: {
      handles: [],
    },
    status: {
      type: process.env.MIGRATED_PACKAGES.includes("table")
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
