import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
  }));
const Customer = () => {
    const classes = useStyles();
    return (
        <main className={classes.content}>
        <h1>Customers</h1>
    </main>
    )
}

export default Customer
