import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
export default function PushNotification() {
  const [loading, setLoading] = React.useState(true);
  const [tokenexist, setTokenExist] = React.useState(false);
  React.useEffect(() => {
    if (window.navigator.userAgent == "buzzrakerapp")
      window.ReactNativeWebView.postMessage(`componentReady:/feeds/tweet`);
    window.ReactNativeWebView.postMessage(`tokenexist:/feeds/tweet`);
    document.addEventListener("checktoken", e => {
      setLoading(false);
      if (e.detail == "false" || e.detail == false) setTokenExist(false);
      else setTokenExist(true);
    });
  }, []);

  if (loading) {
    return <p>loading</p>;
  }
  const handleDisable = () => {
    setLoading(true);
    window.ReactNativeWebView.postMessage(`disablepush:/feeds/tweet`);
    setTimeout(() => {
      setTokenExist(false);
      setLoading(false);
    }, 3000);
  };

  const handleEnable = () => {
    setLoading(true);

    window.ReactNativeWebView.postMessage(`enableepush:/feeds/tweet`);
    setTimeout(() => {
      setLoading(false);
      setTokenExist(true);
    }, 3000);
  };

  return (
    <div>
      <div
        style={{
          borderBottom: "1px solid #ddd",
          paddingBottom: "10px",
          paddingLeft: "20px"
        }}
      >
        <Typography variant="h6" component="h6">
          Push notification
        </Typography>
      </div>

      <div style={{ padding: "16px" }}>
        {tokenexist ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Typography variant="body1" component="h6">
              Push notification is enabled
            </Typography>
            <Button
              variant="outlined"
              onClick={handleDisable}
              disabled={loading}
              color="primary"
            >
              {loading ? "Disabling ..." : "Disable"}
            </Button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Typography variant="body1" component="h6">
              Push notification id disabled
            </Typography>
            <Button
              onClick={handleEnable}
              variant="outlined"
              disabled={loading}
              color="primary"
            >
              {loading ? "Enabling ..." : "Enable"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
