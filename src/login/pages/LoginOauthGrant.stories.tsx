import {createPageStory} from "../createPageStory.tsx";
import {Meta, StoryObj} from "@storybook/react";

const { PageStory } = createPageStory({
  pageId: "login-oauth-grant.ftl"
});

const meta = {
  title: "login/LoginOauthGrant",
  component: PageStory,
} satisfies Meta<typeof PageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PageStory />
};