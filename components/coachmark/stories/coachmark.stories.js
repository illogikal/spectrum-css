// Import the component markup template
import { Template } from "./template";

export default {
  title: "Coach mark",
  description: "The coach mark component can be used to bring added attention to specific parts of a page.",
  component: "CoachMark",
  argTypes: {
    withPopover: {
      name: "With Popover",
      type: { name: "boolean" },
      table: {
        type: { summary: "boolean" },
        category: "Component",
      },
      control: "boolean",
    },
    isQuiet: {
      name: "Quiet styling",
      type: { name: "boolean" },
      table: {
        type: { summary: "boolean" },
        category: "Component",
      },
      control: "boolean",
    },
    variant: {
      name: "Color variants",
      type: { name: "string" },
      table: {
        type: { summary: "string" },
        category: "Component",
      },
      options: ["dark", "light"],
      control: "inline-radio",
    },
  },
  args: {
    rootClass: "spectrum-CoachMark",
    isQuiet: false,
    withPopover: false,
  },
  parameters: {
    actions: {
      handles: []
    },
    status: {
      type: process.env.MIGRATED_PACKAGES.includes('coachmark') ? 'migrated' : undefined
    },
    // Getting the Figma link: https://help.figma.com/hc/en-us/articles/360045003494-Storybook-and-Figma
    // design: {
    //   type: "figma",
    //   url: "https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File",
    // },
  }
};

export const Default = Template.bind({});
Default.args = {};

export const WithPopover = Template.bind({});
WithPopover.args = {
  withPopover: true
};
