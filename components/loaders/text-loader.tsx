import React from "react"
import ContentLoader from "react-content-loader"

const TextLoader = () => (
  <ContentLoader
    speed={1}
    width={150}
    height={20}
    viewBox="0 0"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="0" ry="0" width="200" height="20" />
  </ContentLoader>
)

export default TextLoader
