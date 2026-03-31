import React from "react";

const PrimaryButton = ({
  text,
  onClick,
  className = "",
}: {
  text: string;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#004242] hover:bg-[#004444] text-white font-semibold py-3 px-8 rounded-md transition-all duration-300 shadow-lg ${className}`}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
