// Import the component markup template
import { Template } from "./template";

export default {
  title: "Miller Columns",
  description: "Miller columns are a browsing/visualization technique that can be applied to tree structures. The columns allow for multiple levels of the hierarchy to be open at once and provide a visual representation of the current location.",
  component: "Miller",
  argTypes: {
    columns: { table: { disable: true } }
  },
  args: {
    rootClass: "spectrum-MillerColumns",
  },
  parameters: {
    actions: {
      handles: []
    },
    status: {
      type: process.env.MIGRATED_PACKAGES.includes('miller') ? 'migrated' : undefined
    },
    // Getting the Figma link: https://help.figma.com/hc/en-us/articles/360045003494-Storybook-and-Figma
    // design: {
    //   type: "figma",
    //   url: "https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File",
    // },
  }
};

export const BranchesSelectable = Template.bind({});
BranchesSelectable.args = {
  columns: [
    {
      items: [{
        label: "Folder 1",
        isBranch: true,
        isSelectable: true,
        isSelected: false,
      },
      {
        label: "Folder 2",
        isBranch: true,
        isSelectable: true,
        isSelected: true,
      },
      {
        label: "Folder 3",
        isBranch: true,
        isSelectable: true,
        isSelected: false,
        image: "example-ava.png",
      }]
    },
    {
      items: [{
        label: "Folder 2.1",
        isBranch: true,
        isSelectable: true,
        isSelected: false,
      },
      {
        label: "File 2.1",
        isBranch: true,
        isSelectable: true,
        isSelected: true,
      },
      {
        label: "File 2.2",
        isBranch: true,
        isSelectable: true,
        isSelected: true,
        image: "example-ava.png",
      }]
    },
  ]
};

export const FilesSelectable = Template.bind({});
FilesSelectable.args = {
  columns: [
    {
      items: [{
        label: "File 1",
        isBranch: true,
        isSelectable: false,
        isSelected: false,
      },
      {
        label: "File 2",
        isBranch: false,
        isSelectable: false,
        isSelected: false,
      },
      {
        label: "File 3",
        isBranch: true,
        isSelectable: false,
        isSelected: false,
        isNavigated: true,
        image: "example-ava.png",
      }]
    },
    {
      items: [{
        label: "File 2.1",
        isBranch: true,
        isSelectable: false,
        isSelected: false,
      },
      {
        label: "File 2.2",
        isBranch: false,
        isSelectable: false,
        isSelected: false,
      },
      {
        label: "File 2.3",
        isBranch: false,
        isSelectable: false,
        isSelected: true,
        image: "example-ava.png",
      }]
    },
  ]
};
