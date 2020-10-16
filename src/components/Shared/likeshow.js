import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import avatar from '../../assets/avatar.jpeg'
import { STATIC_URL } from '../../config'
import { withRouter } from 'react-router-dom'
import { Context } from '../usercontext'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  showless: {
    width: '100%',
    mexWidth: 360,
    backgroundColor: '#eee'
  }
}))

function LikeShow (props) {
  const cuser = React.useContext(Context)
  const classes = useStyles()

  return (
    <div className={props.likes.length > 10 ? classes.root : classes.showless}>
     {!cuser && (
         <Typography component={"p"} variant={"p"} style={{background:"orange",
          padding:"8px",
          marginBottom: "8px"
          }}>
         You need to login to Like 
         </Typography>
      )
     } 
      {props.likes.length != 0 &&
        props.likes.map(item => {
          return (
            <ListItem
              onClick={() =>
                props.history.push(`/profile/${item.user.username}`)
              }
              style={{
                padding: 0,
                paddingBottom: '8px',
                paddingLeft: '8px',
                background: '#eee'
              }}
              key={item.id}
              button
            >
              <ListItemAvatar>
                <Avatar
                  style={{ width: '32px', height: '32px' }}
                  src={`${STATIC_URL}${item.user.profileSet[0].profilePic}`}
                />
              </ListItemAvatar>
              <ListItemText id={item.id} primary={item.user.username} />
            </ListItem>
          )
        })}
      {props.likes.length == 0 ? (
 
        <Typography
          style={{ background: '#eee', textAlign: 'center' }}
          variant='p'
          component='p'
        >
          No Likes Yet
        </Typography>
      ) : null}
   
    </div>
  )
}

export default withRouter(LikeShow)
