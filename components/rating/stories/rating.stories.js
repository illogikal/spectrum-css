// Import the component markup template
import { Template } from "./template";

export default {
  title: "Rating",
  description:
    "A rating element is used to display or collect a user's rating of an item as represented by a number of stars.",
  component: "Rating",
  argTypes: {
  },
  args: {
    rootClass: "spectrum-Rating",
  },
  parameters: {
    actions: {
      handles: [],
    },
    status: {
      type: process.env.MIGRATED_PACKAGES.includes("rating")
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
