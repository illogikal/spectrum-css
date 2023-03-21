import { Template } from './template.js';

export default {
  title: "Search",
  description: "The search component delivers a single input field with a \"reset\" button and mangifying glass icon which serves up a search UI.",
  component: "Search",
  argTypes: {
    isQuiet: {
      name: "Quiet styling",
      type: { name: "boolean" },
      table: {
        type: { summary: "boolean" },
        category: "Component",
      },
      control: "boolean",
    },
    isDisabled: {
      name: "Disabled",
      type: { name: "boolean" },
      table: {
        type: { summary: "boolean" },
        category: "State",
      },
      control: "boolean",
    },
  },
  args: {
    rootClass: "spectrum-Search",
    isQuiet: false,
    isDisabled: false,
  },
  parameters: {
    actions: {
      handles: ['change .spectrum-Search-input', 'click .spectrum-Search-clearButton', 'click .spectrum-Search-icon']
    },
    status: {
      type: process.env.MIGRATED_PACKAGES.includes('search') ? 'migrated' : undefined
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
