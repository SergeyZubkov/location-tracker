import React from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface LoadableContentProps {
  loading: boolean;
  children: JSX.Element;
}

const LoadableContent = ({ loading, children }: LoadableContentProps) => {
  return loading ? <LoadingSpinner /> : children;
};

export default LoadableContent;
