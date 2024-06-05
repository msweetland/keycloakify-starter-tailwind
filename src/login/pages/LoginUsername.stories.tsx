import { Meta, StoryObj } from '@storybook/react';
import { createPageStory } from "../createPageStory";

const { PageStory } = createPageStory({
  pageId: "login-username.ftl"
});

const meta = {
  title: "login/LoginUsername",
  component: PageStory,
} satisfies Meta<typeof PageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PageStory />
};

export const WithSocialProviders: Story = {
  render: () => (
    <PageStory
      kcContext={{
        social: {
          displayInfo: true,
          providers: [
            { loginUrl: 'amazon', alias: 'amazon', providerId: 'amazon', displayName: 'Amazon' },
            { loginUrl: 'apple', alias: 'apple', providerId: 'apple', displayName: 'Apple' },
            { loginUrl: 'bitbucket', alias: 'bitbucket', providerId: 'bitbucket', displayName: 'Bitbucket' },
            { loginUrl: 'digitalocean', alias: 'digitalocean', providerId: 'digitalocean', displayName: 'DigitalOcean' },
            { loginUrl: 'discord', alias: 'discord', providerId: 'discord', displayName: 'Discord' },
            { loginUrl: 'dropbox', alias: 'dropbox', providerId: 'dropbox', displayName: 'Dropbox' },
            { loginUrl: 'facebook', alias: 'facebook', providerId: 'facebook', displayName: 'Facebook' },
            { loginUrl: 'figma', alias: 'figma', providerId: 'figma', displayName: 'Figma' },
            { loginUrl: 'github', alias: 'github', providerId: 'github', displayName: 'Github' },
            { loginUrl: 'gitlab', alias: 'gitlab', providerId: 'gitlab', displayName: 'Gitlab' },
            { loginUrl: 'google', alias: 'google', providerId: 'google', displayName: 'Google' },
            { loginUrl: 'instagram', alias: 'instagram', providerId: 'instagram', displayName: 'Instagram' },
            { loginUrl: 'linkedin', alias: 'linkedin', providerId: 'linkedin', displayName: 'LinkedIn' },
            { loginUrl: 'microsoft', alias: 'microsoft', providerId: 'microsoft', displayName: 'Microsoft' },
            { loginUrl: 'openshift', alias: 'openshift', providerId: 'openshift', displayName: 'OpenShift' },
            { loginUrl: 'paypal', alias: 'paypal', providerId: 'paypal', displayName: 'PayPal' },
            { loginUrl: 'shopify', alias: 'shopify', providerId: 'shopify', displayName: 'Shopify' },
            { loginUrl: 'slack', alias: 'slack', providerId: 'slack', displayName: 'Slack' },
            { loginUrl: 'snapchat', alias: 'snapchat', providerId: 'snapchat', displayName: 'Snapchat' },
            { loginUrl: 'spotify', alias: 'spotify', providerId: 'spotify', displayName: 'Spotify' },
            { loginUrl: 'stackoverflow', alias: 'stackoverflow', providerId: 'stackoverflow', displayName: 'Stackoverflow' },
            { loginUrl: 'stripe', alias: 'stripe', providerId: 'stripe', displayName: 'Stripe' },
            { loginUrl: 'twitter', alias: 'twitter', providerId: 'twitter', displayName: 'Twitter' },
            { loginUrl: 'wordpress', alias: 'wordpress', providerId: 'wordpress', displayName: 'Wordpress' },
            { loginUrl: 'yahoo', alias: 'yahoo', providerId: 'yahoo', displayName: 'Yahoo' }
          ],
        },
      }}
    />
  ),
};