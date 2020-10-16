import React from "react";
import ReactTinyLink from "react-tiny-link";
import YouTube from "react-youtube";
import "./youtube.css";
export default ({ youtubeId }) => {
  let showframe = true;

  let video_id;
  let videoSrc;
  try {
    video_id = youtubeId.split("v=")[1];
    let ampersandPosition = video_id.indexOf("&");
    if (ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }

    videoSrc = `https://www.youtube.com/embed/${video_id}?autoplay=0&rel=0&modestbranding=1`;
  } catch (e) {
    showframe = false;
  }

  return (
    <div
      className="video"
      style={{
        width: "100%",
        height: "0",
        paddingBottom: "56.25%", //16 x 9
        position: "relative"
      }}
    >
      {showframe == true ? (
        <iframe
          className="player"
          type="text/html"
          width="100%"
          height="100%"
          src={videoSrc}
          frameborder="0"
        />
      ) : (
        <ReactTinyLink
          cardSize="large"
          showGraphic
          proxyUrl="https://testappsak.herokuapp.com"
          maxLine={2}
          minLine={1}
          url={youtubeId}
        />
      )}
    </div>
  );
};
