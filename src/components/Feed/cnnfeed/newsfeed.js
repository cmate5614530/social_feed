import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Comment from '@material-ui/icons/Comment'
import Likes from '../../Shared/likeshow'
import Comments from '../../Shared/commentshow'
import Createlike from '../../Shared/createLike'
import CircularProgress from '@material-ui/core/CircularProgress';
import {Context} from '../../usercontext'

const useStyles = makeStyles(theme => ({
 card: {
   marginBottom:"10px"
 },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  progress : {
    height:25,
    width:25
  }
}));

export default function RecipeReviewCard(props) {
    let {item, avatar, id, tweetlikes, tweetcomments,
         CREATE_COMMENT_MUTATION, CREATE_LIKE_MUTATION, refetchQuery, page} = props
    const cuser =React.useContext(Context)
   
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [menuExpande, setMenuExpanded] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const [commentLoading, setCommentLoading]= React.useState(false)
    const [likesLoading, setLikesLoading]= React.useState(false)

    function handleExpandClick(expandedItem) {
        if (expanded == "likes" && expandedItem == "likes")
            setExpanded(false)
        else if (expanded == "comments" && expandedItem=="comments") {
            setExpanded(false)
        }
        else 
            setExpanded(expandedItem)
    }
        
  
  
    let  commentCount = tweetcomments.length

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar src={props.logo} className={classes.avatar}>
                          C
                    </Avatar>
                    }
              
                title={item.title}
                subheader={item.published}
            />
            <CardMedia
                className={classes.media}
                image={item.media}
                title="Paella dish"
            />
            <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
                    
                  <a href={item.link} target="_blank">{item.link}</a>
                </Typography>
                
            </CardContent>
            <CardActions disableSpacing>
                <Createlike 
               
                CREATE_LIKE_MUTATION={CREATE_LIKE_MUTATION}
                page={page}    
                updateLikeFunction={props.updateLikeFunction}
                setLikesLoading={setLikesLoading}
                likes={tweetlikes}
                    refetchQuery={refetchQuery}
                    tweetid={id}
                    CREATE_LIKE_MUTATION={CREATE_LIKE_MUTATION}
                    setLoading={(isLoading) => setLoading(isLoading)}
                    expanded={expanded}
                    setExpanded={ handleExpandClick} item={item} />
                    <span>
                        {commentCount}
                        <IconButton 
                            className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded=="comments",
                            })}
                            onClick={() => handleExpandClick("comments")}
                            aria-expanded={expanded}
                            aria-label="Show more"
                            style={{paddingLeft:"5px"}}
                            aria-label="Share">
                            <Comment />
                        </IconButton>
                    </span>
                    <IconButton
                        className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
            </CardActions>
            <Collapse 
                style={{overflow:"auto"}}
                in={expanded} timeout="auto" 
                unmountOnExit
            >
                <CardContent>
                {(commentLoading || likesLoading) ?(
                        <div style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
                            <CircularProgress className={classes.progress} 
                                style={{height:"25px", width:"25px"}}
                                color="secondary" /> 
                        </div>
                        )
                        : (
                        expanded == "likes" && <Likes
                        item={item}
                        likes={tweetlikes} />
                        )}
        
                     {expanded == "comments" && <Comments 
                     updateCommentFunction={props.updateCommentFunction}
                       refetchQuery={refetchQuery}
                       setCommentLoading={setCommentLoading}
                     comments={tweetcomments}
                     page={page}
                     tweetid={id}
                     setLoading={(isLoading) => setLoading(isLoading)}
                    CREATE_COMMENT_MUTATION={CREATE_COMMENT_MUTATION}
                    
                    
                    item={item}/>}
                </CardContent>
            </Collapse>
        </Card>
  );
}

