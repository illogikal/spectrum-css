// Import the component markup template
import { Template } from "./template";

import { default as Checkbox } from "@spectrum-css/checkbox/stories/checkbox.stories.js";

export default {
  title: "Asset list",
  description: "A selectable list of Assets, often used inside of Miller Columns.",
  component: "AssetList",
  argTypes: {
    items: { table: { disable: true } },
  },
  args: {
    rootClass: "spectrum-AssetList",
  },
  parameters: {
    actions: {
      handles: [
        ...Checkbox.parameters.actions.handles,
      ]
    },
    status: {
      type: process.env.MIGRATED_PACKAGES.includes('assetlist') ? 'migrated' : undefined
    },
    // Getting the Figma link: https://help.figma.com/hc/en-us/articles/360045003494-Storybook-and-Figma
    // design: {
    //   type: "figma",
    //   url: "https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File",
    // },
  }
};

export const Default = Template.bind({});
Default.args = {
  items: [{
    image: "/example-ava.png",
    label: "Shantanu.jpg",
    isSelectable: true,
  }, {
    iconName: "Document",
    label: "Resource Allocation.csv",
    isSelectable: true,
  }, {
    iconName: "Folder",
    label: "Frontend Projects",
    isSelectable: true,
    isBranch: true,
    isSelected: true,
  }, {
    iconName: "Folder",
    label: "Downloads",
    isSelectable: true,
    isBranch: true,
    isSelected: false,
    isNavigated: true,
  }],
};
