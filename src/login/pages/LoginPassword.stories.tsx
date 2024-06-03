import { Meta, StoryObj } from '@storybook/react';
import { createPageStory } from "../createPageStory";

const { PageStory } = createPageStory({
  pageId: "login-password.ftl"
});

const meta = {
  title: "login/LoginPassword",
  component: PageStory,
} satisfies Meta<typeof PageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PageStory />
};

export const WithOutResetPasswordAllowed: Story = {
  render: () => (
    <PageStory kcContext={{realm: { resetPasswordAllowed: false }}}/>
  )
};