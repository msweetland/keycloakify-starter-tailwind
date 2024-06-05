import { Meta, StoryObj } from '@storybook/react';
import { createPageStory } from "../createPageStory";

const { PageStory } = createPageStory({
  pageId: "update-email.ftl"
});

const meta = {
  title: "login/UpdateEmail",
  component: PageStory,
} satisfies Meta<typeof PageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PageStory />
};

export const IsAppInitiatedAction: Story = {
  render: () => <PageStory kcContext={{isAppInitiatedAction: true}}/>
};