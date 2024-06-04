import {createPageStory} from "../createPageStory.tsx";
import {Meta, StoryObj} from "@storybook/react";

const { PageStory } = createPageStory({
  pageId: "saml-post-form.ftl"
});

const meta = {
  title: "login/SamlPostForm",
  component: PageStory,
} satisfies Meta<typeof PageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PageStory />
};