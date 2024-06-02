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
    ? `btn btn-ghost ${brandColorClass} ${hoverBrandColorClass} ${textColorClass}`
    : "btn";

  return (
    <a
      href={loginUrl}
      className={`flex justify-center items-center overflow-hidden ${buttonClass}`}
    >
      <div className={`flex items-center space-x-2 relative ${icon ? "pl-8 -ml-8" : ""}`}>
        <span>{displayName}</span>
        {icon && <FontAwesomeIcon icon={icon} className="absolute left-1" />}
      </div>

    </a>
  );
};

export default SocialLoginButton;