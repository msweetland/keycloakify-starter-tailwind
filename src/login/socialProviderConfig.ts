import {
  IconDefinition,
  faGoogle,
  faFacebook,
  faGithub,
  faLinkedin,
  faMicrosoft,
  faInstagram,
  faApple,
  faAmazon,
  faDropbox,
  faBitbucket,
  faStackOverflow,
  faPaypal,
  faReddit,
  faSalesforce,
  faDigitalOcean,
  faDiscord,
  faFigma,
  faGitlab,
  faShopify,
  faSlack,
  faSnapchat,
  faSpotify,
  faYahoo,
  faWordpress,
  faStripe,
  faXTwitter
} from "@fortawesome/free-brands-svg-icons";

interface SocialProviderStyle {
  icon?: IconDefinition;
  brandColorClass?: string;
  hoverBrandColorClass?: string;
  textColorClass?: string;
}

export interface SocialProviderConfig extends SocialProviderStyle {
  loginUrl: string;
  alias: string;
  providerId: string;
  displayName: string;
}

export const getSocialProviderConfig = (provider: { loginUrl: string; alias: string; providerId: string; displayName: string; }): SocialProviderConfig => {
  const providerConfig = socialProviders[provider.providerId] || {};
  return { ...provider, ...providerConfig };
};

export const socialProviders: Record<string, SocialProviderStyle> = {
  amazon: {
    icon: faAmazon,
    brandColorClass: "bg-yellow-500",
    hoverBrandColorClass: "hover:bg-yellow-600",
    textColorClass: "text-black",
  },
  apple: {
    icon: faApple,
    brandColorClass: "bg-black",
    hoverBrandColorClass: "hover:bg-gray-800",
    textColorClass: "text-white",
  },
  bitbucket: {
    icon: faBitbucket,
    brandColorClass: "bg-blue-500",
    hoverBrandColorClass: "hover:bg-blue-600",
    textColorClass: "text-white",
  },
  digitalocean: {
    icon: faDigitalOcean,
    brandColorClass: "bg-blue-400",
    hoverBrandColorClass: "hover:bg-blue-500",
    textColorClass: "text-white",
  },
  discord: {
    icon: faDiscord,
    brandColorClass: "bg-indigo-600",
    hoverBrandColorClass: "hover:bg-indigo-700",
    textColorClass: "text-white",
  },
  dropbox: {
    icon: faDropbox,
    brandColorClass: "bg-blue-600",
    hoverBrandColorClass: "hover:bg-blue-700",
    textColorClass: "text-white",
  },
  facebook: {
    icon: faFacebook,
    brandColorClass: "bg-blue-700",
    hoverBrandColorClass: "hover:bg-blue-800",
    textColorClass: "text-white",
  },
  figma: {
    icon: faFigma,
    brandColorClass: "bg-green-400",
    hoverBrandColorClass: "hover:bg-green-500",
    textColorClass: "text-white",
  },
  github: {
    icon: faGithub,
    brandColorClass: "bg-gray-800",
    hoverBrandColorClass: "hover:bg-gray-900",
    textColorClass: "text-white",
  },
  gitlab: {
    icon: faGitlab,
    brandColorClass: "bg-orange-400",
    hoverBrandColorClass: "hover:bg-orange-500",
    textColorClass: "text-white",
  },
  google: {
    icon: faGoogle,
    brandColorClass: "bg-blue-500",
    hoverBrandColorClass: "hover:bg-blue-600",
    textColorClass: "text-white",
  },
  instagram: {
    icon: faInstagram,
    brandColorClass: "bg-pink-500",
    hoverBrandColorClass: "hover:bg-pink-600",
    textColorClass: "text-white",
  },
  linkedin: {
    icon: faLinkedin,
    brandColorClass: "bg-blue-600",
    hoverBrandColorClass: "hover:bg-blue-700",
    textColorClass: "text-white",
  },
  microsoft: {
    icon: faMicrosoft,
    brandColorClass: "bg-orange-500",
    hoverBrandColorClass: "hover:bg-orange-600",
    textColorClass: "text-white",
  },
  paypal: {
    icon: faPaypal,
    brandColorClass: "bg-blue-800",
    hoverBrandColorClass: "hover:bg-blue-900",
    textColorClass: "text-white",
  },
  reddit: {
    icon: faReddit,
    brandColorClass: "bg-orange-500",
    hoverBrandColorClass: "hover:bg-orange-600",
    textColorClass: "text-white",
  },
  salesforce: {
    icon: faSalesforce,
    brandColorClass: "bg-blue-400",
    hoverBrandColorClass: "hover:bg-blue-500",
    textColorClass: "text-white",
  },
  shopify: {
    icon: faShopify,
    brandColorClass: "bg-green-500",
    hoverBrandColorClass: "hover:bg-green-600",
    textColorClass: "text-white",
  },
  slack: {
    icon: faSlack,
    brandColorClass: "bg-purple-500",
    hoverBrandColorClass: "hover:bg-purple-600",
    textColorClass: "text-white",
  },
  snapchat: {
    icon: faSnapchat,
    brandColorClass: "bg-yellow-400",
    hoverBrandColorClass: "hover:bg-yellow-500",
    textColorClass: "text-black",
  },
  spotify: {
    icon: faSpotify,
    brandColorClass: "bg-green-600",
    hoverBrandColorClass: "hover:bg-green-700",
    textColorClass: "text-white",
  },
  stackoverflow: {
    icon: faStackOverflow,
    brandColorClass: "bg-orange-600",
    hoverBrandColorClass: "hover:bg-orange-700",
    textColorClass: "text-white",
  },
  stripe: {
    icon: faStripe,
    brandColorClass: "bg-blue-500",
    hoverBrandColorClass: "hover:bg-blue-600",
    textColorClass: "text-white",
  },
  twitter: {
    icon: faXTwitter,
    brandColorClass: "bg-black",
    hoverBrandColorClass: "hover:bg-gray-800",
    textColorClass: "text-white",
  },
  wordpress: {
    icon: faWordpress,
    brandColorClass: "bg-blue-800",
    hoverBrandColorClass: "hover:bg-blue-900",
    textColorClass: "text-white",
  },
  yahoo: {
    icon: faYahoo,
    brandColorClass: "bg-purple-700",
    hoverBrandColorClass: "hover:bg-purple-800",
    textColorClass: "text-white",
  }
};