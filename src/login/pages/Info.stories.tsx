import {createPageStory} from "../createPageStory.tsx";
import {Meta} from "@storybook/react";

const { PageStory } = createPageStory({
  pageId: "info.ftl"
});

const meta = {
  title: "login/Info",
  component: PageStory,
} satisfies Meta<typeof PageStory>;

export default meta;

export const Default = () => (
  <PageStory
    kcContext={{
      message: {
        summary: "This is the server message",
        type: "info"
      },
      requiredActions: [
        "TERMS_AND_CONDITIONS",
        "UPDATE_PROFILE"
      ]
    }}
  />
);