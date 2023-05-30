import React from "react"

export default () => {
    const { width, height } = useWindowSize()
    return (
      <Confetti
        width={width}
        height={height}
      />
    )
  }