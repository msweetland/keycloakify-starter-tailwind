import {Meta, StoryObj} from '@storybook/react';
import {createPageStory} from "../createPageStory";

const {PageStory} = createPageStory({
  pageId: "login.ftl"
});

const meta = {
  title: "login/Login",
  component: PageStory,
} satisfies Meta<typeof PageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PageStory/>,
};

export const WithoutPasswordField: Story = {
  render: () => <PageStory kcContext={
    {
      realm:
        {
          password: false,
          displayName: "Test Realm",
          internationalizationEnabled: true
        }
    }
  }/>,
};

export const WithoutRegistration: Story = {
  render: () => <PageStory kcContext={{realm: {registrationAllowed: false}}}/>,
};

export const WithoutRememberMe: Story = {
  render: () => <PageStory kcContext={{realm: {rememberMe: false}}}/>,
};

export const WithoutPasswordReset: Story = {
  render: () => <PageStory kcContext={{realm: {resetPasswordAllowed: false}}}/>,
};

export const WithEmailAsUsername: Story = {
  render: () => <PageStory kcContext={{realm: {loginWithEmailAllowed: true}}}/>,
};

export const WithPresetUsername: Story = {
  render: () => <PageStory kcContext={{login: {username: "max.mustermann@mail.com"}}}/>,
};

export const WithImmutablePresetUsername: Story = {
  render: () => (
    <PageStory
      kcContext={{
        auth: {
          attemptedUsername: "max.mustermann@mail.com",
          showUsername: true,
        },
        usernameHidden: true,
        message: {type: "warning", summary: "Please re-authenticate to continue"},
      }}
    />
  ),
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
