import React from 'react'
import Randomuser from './Follower'
import TweetHandler from './TweetHandler'
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

function Asideitem (props) {
  const [randomuserOrPaper, setRandomUserOrPaper] = React.useState(false)

  let { classes } = props
  return (
    <>
      {props.data.showProfile ? null : (
        <Grid item sm={5} md={5} className={classes.aside}>
          {props.currentAside == 'random' ? (
            <Paper key={1}>
              <Randomuser />
            </Paper>
          ) : null}
          {props.currentAside == 'handle' ? (
            <Paper style={{ marginTop: '10px' }} key={2}>
              <TweetHandler />
            </Paper>
          ) : null}
        </Grid>
      )}
    </>
  )
}

const styles = theme => ({
  bordered: {
    border: '1px solid black'
  },
  root: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up('md')]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing.unit * 2
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.openTitle
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  icon: {
    padding: '0px 2px 2px 0px',
    verticalAlign: 'middle',
    color: 'green'
  },
  container: {
    marginTop: '5.5em'
  },
  paypal: {
    marginTop: theme.spacing.unit * 1
  },
  aside: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  }
})

export default withStyles(styles)(Asideitem)
