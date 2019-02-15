import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import CardActionArea from '@material-ui/core/CardActionArea';

const styles = {
  card: {
    maxWidth: 550,
    marginTop: 5,
    textAlign: 'left'
  },
  avatar: {
    backgroundColor: red[500],
  },
};

class UserCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, user, onClick } = this.props;
    return (
      <Card className={classes.card}>
      <CardActionArea onClick={onClick}>
        <CardHeader
          avatar={
            <Avatar src={user.avatar_url} aria-label="Recipe" className={classes.avatar} />
          }
          title={user.login}
          subheader={user.html_url}
        />
        </CardActionArea>
      </Card>
    );
  }
}

UserCard.propTypes = {
  user : PropTypes.object,
  onClick : PropTypes.func,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserCard);
