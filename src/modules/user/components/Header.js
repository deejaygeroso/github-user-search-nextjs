import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import Button from '@material-ui/core/Button';
import Router from 'next/router'

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 0
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardHeader: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 0
  },
  iconHover: {
    fontSize: 50,
    margin: 0,
  },
  button: {
    padding: 0,
    margin: 0,
  }, 
};

class Header  extends React.Component {
  state = { expanded: false };

  goBack = () => {
      Router.back()
  };

  render() {
    const { classes, user } = this.props;
    return (
      <Card className={classes.card}>
        <Button onClick={this.goBack} className={classes.button}>
          <KeyboardArrowLeft className={classes.iconHover} />
        </Button>
        <CardHeader
          avatar={
            <Avatar src={user.avatar_url} aria-label="Recipe" className={classes.avatar} />
          }
          title={user.login}
          subheader={user.html_url}
          className={classes.cardHeader}
        />
      </Card>
    );
  }
}

Header .propTypes = {
  user : PropTypes.object,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header );
