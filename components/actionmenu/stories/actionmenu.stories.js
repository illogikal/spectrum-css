// Import the component markup template
import { Template } from "./template";

import { default as ActionButton } from "@spectrum-css/actionbutton/stories/actionbutton.stories.js";
import { default as Menu } from "@spectrum-css/menu/stories/menu.stories.js";

export default {
  title: "Action menu",
  description: "The Action menu component is an action button with a Popover.",
  component: "Action menu",
  argTypes: {
    items: { table: { disable: true } },
    isOpen: {
      name: "Open",
      type: { name: "boolean" },
      table: {
        type: { summary: "boolean" },
        category: "State",
      },
      control: "boolean",
    },
  },
  args: {
    isOpen: true,
  },
  parameters: {
    actions: {
      handles: [
        ...ActionButton.parameters.actions.handles,
        ...Menu.parameters.actions.handles,
      ]
    },
    status: {
      type: process.env.MIGRATED_PACKAGES.includes('actionmenu') ? 'migrated' : undefined
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
    label: "Action 1",
  }, {
    label: "Action 2",
  }, {
    label: "Action 3",
  }, {
    label: "Action 4",
  }],
};
