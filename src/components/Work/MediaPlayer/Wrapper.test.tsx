import React from "react";
import { render, screen } from "@testing-library/react";
import WorkMediaPlayerWrapper from "components/Work/MediaPlayer/Wrapper";
import { WorkMediaPlayerWrapperProps } from "components/Work/MediaPlayer/Wrapper";

const props: WorkMediaPlayerWrapperProps = {
  manifestId: "https://testing123.com",
};

describe("WorkMediaPlayerWrapper component", () => {
  it("renders", () => {
    render(<WorkMediaPlayerWrapper {...props} />);
    expect(screen.getByTestId("media-player-wrapper"));
  });
});
