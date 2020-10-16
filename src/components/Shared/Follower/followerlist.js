import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import Typography from '@material-ui/core/Typography'
import FolderIcon from '@material-ui/icons/Folder'
import DeleteIcon from '@material-ui/icons/Delete'
import Divider from '@material-ui/core/Divider'
import { Context } from '../../usercontext'
import Loading from '../loading'
import Error from '../Error'

import PersonAdd from '@material-ui/icons/PersonAdd'

import Button from '@material-ui/core/Button'
import { STATIC_URL } from '../../../config/index'
import './followers.css'
const useStyles = makeStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    marginLeft: 8,
    flex: 8
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  },
  showpointer: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
})

export default function Showfollowers (props) {
  const cuser = React.useContext(Context)
  const [showerroe, setShowerror] = React.useState(false)
  const classes = useStyles()


  const handleFollow = async addFollower => {
    if (!cuser) {
      setShowerror(true)
    } else {
      const res = await addFollower()
    }
  }
  return (
    <div className={'givepadding'}>
      <Mutation
        mutation={REMOVE_FOLLOWER}
        variables={{ id: props.item.id }}
        refetchQueries={() => [{ query: props.refetchQueries }]}
      >
        {(addFollower, { loading, error, called, client }) => {
          if (loading) return <Loading />
          if (error) return <Error error={error} />
          return (
            <>
              {showerroe && (
                <Error error={{ message: 'Login or Register to follow' }} />
              )}

              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    className={classes.showpointer}
                    onClick={() =>
                      props.history.push(`/profile/${props.item.username}`)
                    }
                    src={`${STATIC_URL}${props.item.profileSet[0].profilePic}`}
                  />
                </ListItemAvatar>
                <ListItemText
                  className={classes.showpointer}
                  onClick={() =>
                    props.history.push(`/profile/${props.item.username}`)
                  }
                  secondary={props.item.username}
                />
                <ListItemSecondaryAction>
                  <Button
                  className="desktopbuttons"
                    onClick={() => handleFollow(addFollower)}
                    variant='outlined'
                    color='primary'
                    color='primary'
                  >
                    Follow
                  </Button>
                  <IconButton  className="mobilebuttons" aria-label='delete'>
                <PersonAdd
                onClick={() => handleFollow(addFollower)}
                 style={{
                    color: 'indigo',
                  
                    
                  }} />
              </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant='inset' component='li' />
            </>
          )
        }}
      </Mutation>
    </div>
  )
}

const REMOVE_FOLLOWER = gql`
  mutation($id: Int!) {
    addFollower(userToFollowId: $id) {
      user {
        id
      }
      userfollowed {
        id
      }
    }
  }
`
const styles = theme => ({
  showpointer: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
})
