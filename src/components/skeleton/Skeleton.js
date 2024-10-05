import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="138" cy="114" r="114" />
    <rect x="0" y="235" rx="10" ry="10" width="280" height="24" />
    <rect x="0" y="270" rx="10" ry="10" width="280" height="84" />
    <rect x="10" y="374" rx="10" ry="10" width="79" height="27" />
    <rect x="123" y="366" rx="19" ry="19" width="151" height="44" />
  </ContentLoader>
);

export default Skeleton;
