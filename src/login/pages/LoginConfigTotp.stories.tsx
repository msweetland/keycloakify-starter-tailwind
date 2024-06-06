import {createPageStory} from "../createPageStory.tsx";
import {Meta, StoryObj} from "@storybook/react";

const { PageStory } = createPageStory({
  pageId: "login-config-totp.ftl"
});

const meta = {
  title: "login/LoginConfigTotp",
  component: PageStory,
} satisfies Meta<typeof PageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PageStory />
};

export const SupportedApplications: Story = {
  render: () => <PageStory kcContext={
    {
      totp:
        {
          supportedApplications: ["totpAppFreeOTPName", "totpAppMicrosoftAuthenticatorName", "totpAppGoogleName"]
        },
      mode: "manual"
    }
  } />
};