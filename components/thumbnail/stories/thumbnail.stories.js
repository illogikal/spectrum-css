// Import the component markup template
import { Template } from "./template";

export default {
  title: "Thumbnail",
  description:
    "A thumbnail is used to display a preview of an image, layer, or effect.",
  component: "Thumbnail",
  argTypes: {
    reduceMotion: { table: { disable: true } },
    size: {
      name: "Size",
      type: { name: "string", required: true },
      table: {
        type: { summary: "string" },
        category: "Component",
      },
      options: ["xxs", "xs", "s", "m", "l"],
      control: "select",
    },
    imageURL: {
      name: "Image URL",
      type: { name: "string" },
      table: {
        type: { summary: "string" },
        category: "Component",
      },
      control: { type: "file", accept: ".svg,.png,.jpg,.jpeg,.webc" },
    },
    svg: { table: { disable: true } },
    altText: {
      name: "Descriptive text for the image",
      type: { name: "string" },
      table: {
        type: { summary: "string" },
        category: "Component",
      },
      control: "text",
    },
    isCover: {
      name: "Thumbnail should cover the container",
      type: { name: "boolean" },
      table: {
        type: { summary: "boolean" },
        category: "Component",
      },
      control: "boolean",
    },
  },
  args: {
    rootClass: "spectrum-Thumbnail",
    size: "l",
    isCover: false,
    imageURL: "example-card-landscape.png",
    altText: "Landscape with mountains and lake",
  },
  parameters: {
    actions: {
      handles: [],
    },
    status: {
      type: process.env.MIGRATED_PACKAGES.includes("thumbnail")
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
