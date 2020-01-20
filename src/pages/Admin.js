import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";


import routes from "../routes";
import { Route, Switch, Redirect, Link } from "react-router-dom";

import AuthContext from "../context/auth/authContext";

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.page === "/admin") {
        return (
          <Route
            path={prop.page + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar
}));
function ListItemLink(props) {
  return <ListItem button component={Link} {...props} />;
}
const Admin = props => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <>
        {user ? (
          <>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar>
                <Typography variant="h6" noWrap>
                  Clipped drawer
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper
              }}
            >
              <div className={classes.toolbar} />
              <List>
                {routes.map(item =>
                  item.show ? (
                    <ListItemLink
                      button
                      to={`/admin${item.path}`}
                      key={item.name}
                    >
                      <ListItemIcon>
                        <item.icon />
                      </ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItemLink>
                  ) : null
                )}
              </List>
            </Drawer>

            {switchRoutes}
          </>
        ) : (
          props.history.push("/login")
        )}
      </>
    </div>
  );
};

export default Admin;
