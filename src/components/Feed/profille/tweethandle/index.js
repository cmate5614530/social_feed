import React from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import { Query, Mutation } from 'react-apollo'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import { gql } from 'apollo-boost'
import Typography from '@material-ui/core/Typography'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { STATIC_URL } from '../../../../config/'
import { Context } from '../../../usercontext'
import { withRouter } from 'react-router-dom'
import Loading from '../../../Shared/loading'
import Error from '../../../Shared/Error'
import Tweethandle from '../../../Shared/TweetHandler'

export default function TweethandleProfile (props) {
  async function handleRemoveHandle (handle, removeHandle) {
    const res = await removeHandle({ variables: { handle: handle } })
  }
  return (
    <div>
      <Grid container spacing={3}>
        <Grid style={{ background: '#eeeeee' }} item xs={12} md={4}>
          <div>
            <Typography
              style={{
                border: '1px solid indigo',
                paddingLeft: '10px',
                borderRightRadius: '50%',
                borderBottomRightRadius: '1em',
                borderTopRightRadius: '1em',
                marginBottom: '16px',
                fontWeight: 'initial',
                fontSize: '1rem',
                background: 'indigo',
                color: 'white'
              }}
              variant='h6'
              component='p'
            >
              @{props.username} Handles
            </Typography>
          </div>
        </Grid>

        <Grid item xs={12} md={8}>
          <Mutation mutation={REMOVE_HANDLE} refetchQueries={GET_HANDLERS}>
            {(removeHandle, { loading, error, called, client }) => {
              if (loading) return <Loading />
              if (error) return <Error error={error} />
              return (
                <Tweethandle
                  removeHandle={handle =>
                    handleRemoveHandle(handle, removeHandle)
                  }
                  username={props.username}
                  showsecondary
                  query
                  GET_HANDLERS={GET_HANDLERS}
                  text={`${props.username} Handle`}
                  inputstyle={{ display: 'none' }}
                />
              )
            }}
          </Mutation>
        </Grid>
      </Grid>
    </div>
  )
}

const REMOVE_HANDLE = gql`
  mutation($handle: String!) {
    removeHandle(handle: $handle) {
      status
    }
  }
`

export const GET_HANDLERS = gql`
  query($username: String) {
    allhandles(username: $username) {
      id
      user {
        id
        username
      }
      TweetHandlers {
        id
        handlename
        logo
      }
    }
  }
`
