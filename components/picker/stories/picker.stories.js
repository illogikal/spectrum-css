// Import the component markup template
import { Template } from "./template";

import { Default as MenuStories } from "@spectrum-css/menu/stories/menu.stories.js";
import { default as PickerButtonStories } from "@spectrum-css/pickerbutton/stories/pickerbutton.stories.js";

export default {
  title: "Picker",
  description: "A picker outlines a set of options for a user.",
  component: "Picker",
  argTypes: {
    ...PickerButtonStories.argTypes,
    content: { table: { disable: true } },
  },
  args: {
    ...PickerButtonStories.args,
    rootClass: "spectrum-Picker",
    label: "Select a Country",
  },
  parameters: {
    actions: {
      handles: [],
    },
    status: {
      type: process.env.MIGRATED_PACKAGES.includes("picker")
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
Default.args = {
  content: [
    MenuStories(MenuStories.args),
  ]
};
