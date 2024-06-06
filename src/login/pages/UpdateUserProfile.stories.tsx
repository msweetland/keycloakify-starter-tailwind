import { Meta, StoryObj } from '@storybook/react';
import { createPageStory } from "../createPageStory";

const { PageStory } = createPageStory({
  pageId: "update-user-profile.ftl"
});

const meta = {
  title: "login/UpdateUserProfile",
  component: PageStory,
} satisfies Meta<typeof PageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PageStory />
};