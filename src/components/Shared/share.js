import React from "react";

export default function Share() {
  const [title, setTitle] = React.useState(false);
  const [text, setText] = React.useState(false);
  const [url, setUrl] = React.useState(false);

  React.useEffect(() => {
    var parsedUrl = new URL(window.location.toString());
    console.log("Title shared: " + parsedUrl.searchParams.get("name"));
    console.log("Text shared: " + parsedUrl.searchParams.get("description"));
    console.log("URL shared: " + parsedUrl.searchParams.get("link"));
    setTitle(parsedUrl.searchParams.get("name"));
    setText(parsedUrl.searchParams.get("name"));
    setUrl(parsedUrl.searchParams.get("link"));
  }, []);

  return (
    <div>
      <p>{title}</p>
      <p>{text}</p>
      <p>{url}</p>
    </div>
  );
}
