import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  media: {
    height: 200
  }
});

export default function MediaCard({ item, linkcontent, refetch, history }) {
  const classes = useStyles();

  return (
    <Card
      className={classes.card}
      onClick={e => {
        if (!refetch) history.push(`/feeds/worldtweet-${item.wid}`);
        else {
          if (window.navigator.userAgent == "buzzrakerapp" && refetch) {
            e.preventDefault();
            if (item.wid == 0) {
              window.ReactNativeWebView.postMessage(`showmodal:${item.url}`);
            } else {
              window.ReactNativeWebView.postMessage(
                `showmodal:https://twitter.com/${item.handlename.handlename}/status/${item.wid}`
              );
            }
          } else {
            if (item.wid == 0) {
              window.open(item.url, "_blank");
            } else {
              window.open(
                `https://twitter.com/${item.handlename.handlename}/status/${item.wid}`,
                "_blank"
              );
            }
          }
        }
      }}
    >
      <CardActionArea>
        {item.wmedia ? (
          <CardMedia
            className={classes.media}
            image={item.wmedia}
            title="Contemplative Reptile"
          />
        ) : null}
        <CardContent style={{ background: "#eee" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{ fontSize: "1.2em" }}
          >
            {item.wtext}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
