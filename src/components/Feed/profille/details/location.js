import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
export default function PushNotification() {
  const [loading, setLoading] = React.useState(true);
  const [locationPreference, setLocationPreference] = React.useState(false);
  React.useEffect(() => {
    if (window.navigator.userAgent == "buzzrakerapp")
      window.ReactNativeWebView.postMessage(`componentReady:/feeds/tweet`);
    let locationPreference = localStorage.getItem("locationPreference");
    if (locationPreference == "true" || locationPreference == true) {
      setLocationPreference(true);
    } else {
      setLocationPreference(false);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <p>loading</p>;
  }

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
          Location Preference
        </Typography>
      </div>

      <div style={{ padding: "16px" }}>
        {locationPreference ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Typography variant="body1" component="h6">
              Location is on
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setLocationPreference(false);
                localStorage.setItem("locationPreference", "false");
              }}
              disabled={loading}
              color="primary"
            >
              {loading ? "Turning of ..." : "Turn Of"}
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
              Location is off
            </Typography>
            <Button
              onClick={() => {
                setLocationPreference(true);
                localStorage.setItem("locationPreference", "true");
              }}
              variant="outlined"
              disabled={loading}
              color="primary"
            >
              {loading ? "Turning on ..." : "Turn On"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
