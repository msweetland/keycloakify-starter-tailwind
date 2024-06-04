import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SocialProviderConfig } from "../login/socialProviderConfig";

const SocialLoginButton: React.FC<SocialProviderConfig> = ({
                                                             loginUrl,
                                                             icon,
                                                             displayName,
                                                             brandColorClass,
                                                             hoverBrandColorClass,
                                                             textColorClass,
                                                           }) => {
  const buttonClass = brandColorClass && hoverBrandColorClass && textColorClass
    ? `${brandColorClass} ${hoverBrandColorClass} ${textColorClass}`
    : "bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:hover:text-white";

  return (
    <a
      href={loginUrl}
      className={`w-full inline-flex justify-center items-center py-3 px-4 gap-x-2 text-sm font-semibold rounded-lg border border-transparent disabled:opacity-50 disabled:pointer-events-none ${buttonClass}`}
    >
      <div className={`flex items-center space-x-2 relative ${icon ? "pl-8 -ml-8" : ""}`}>
        <span>{displayName}</span>
        {icon && <FontAwesomeIcon icon={icon} className="absolute left-1" />}
      </div>

    </a>
  );
};

export default SocialLoginButton;