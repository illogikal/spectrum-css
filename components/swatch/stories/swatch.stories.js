// Import the component markup template
import { Template } from "./template";

export default {
  title: "Swatch",
  description:
    "A swatch shows a small sample of a fill—such as a color, gradient, texture, or material—that is intended to be applied to an object.",
  component: "Swatch",
  argTypes: {
    size: {
      name: "Size",
      type: { name: "string", required: true },
      table: {
        type: { summary: "string" },
        category: "Component",
      },
      options: ["xs", "s", "m", "l"],
      control: "select"
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
    isSelected: {
      name: "Selected",
      type: { name: "boolean" },
      table: {
        type: { summary: "boolean" },
        category: "State",
      },
      control: "boolean",
    },
    isRounded: {
      name: "Rounded corners",
      type: { name: "boolean" },
      table: {
        type: { summary: "boolean" },
        category: "Component"
      },
      control: "boolean"
    }
  },
  args: {
    rootClass: "spectrum-Swatch",
    isSelected: false,
    isDisabled: false,
    isRounded: true,
  },
  parameters: {
    actions: {
      handles: [],
    },
    status: {
      type: process.env.MIGRATED_PACKAGES.includes("swatch")
        ? "migrated"
        : undefined,
    },
  },
};

export const Default = Template.bind({});
Default.args = {};
