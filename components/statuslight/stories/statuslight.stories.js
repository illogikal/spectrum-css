// Import the component markup template
import { Template } from "./template";

export default {
  title: "Statuslight",
  description: "The Statuslight component is...",
  component: "Statuslight",
  argTypes: {
    size: {
      name: "Size",
      type: { name: "string", required: true },
      table: {
        type: { summary: "string" },
        category: "Component",
      },
      options: ["s", "m", "l", "xl"],
      control: "select"
    },
    label: {
      name: "Label",
      type: { name: "string" },
      table: {
        type: { summary: "string" },
        category: "Content",
      },
      control: { type: "text" },
    },
    variant: {
      name: "Variant",
      type: { name: "string", required: true },
      table: {
        type: { summary: "string" },
        category: "Component",
      },
      options: [
        "accent",
        "info",
        "neutral",
        "positive",
        "notice",
        "negative",
        "gray",
        "red",
        "orange",
        "yellow",
        "chartreuse",
        "celery",
        "green",
        "seafoam",
        "cyan",
        "blue",
        "indigo",
        "purple",
        "fuchsia",
        "magenta",
      ],
      control: "select"
    },
  },
  args: {
    rootClass: "spectrum-StatusLight",
    size: "m",
    label: "Status",
    variant: "info",
  },
  parameters: {
    actions: {
      handles: []
    },
    status: {
      type: process.env.MIGRATED_PACKAGES.includes('statuslight') ? 'migrated' : undefined
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
