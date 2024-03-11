import React from "react";

interface CardContentProps {
  className: string;
  children: React.ReactNode;
}

const CardContent = ({ children, className }: CardContentProps) => {
  return <div className={className}>{children}</div>;
};

export default CardContent;
