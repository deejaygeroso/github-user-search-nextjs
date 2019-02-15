import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
});

function Following(props) {
  const { classes, followingList } = props;
  const { allIds, byId } = followingList;
  return (
    <List className={classes.root}>
    {allIds && allIds.length!==0 && allIds.map(followerId=>(
      <ListItem alignItems="flex-start" key={followerId}>
        <ListItemAvatar>
          <Avatar src={byId[followerId].avatar_url} />
        </ListItemAvatar>
        <ListItemText
          primary={byId[followerId].login}
          secondary={
            <React.Fragment>
              <Typography component="span" className={classes.inline} color="textPrimary">
                {/* {byId[followerId].language} */}
              </Typography>
                {`${byId[followerId].html_url ? byId[followerId].html_url : 'N/A'}`}
            </React.Fragment>
          }
        />
      </ListItem>
    ))}
    </List>
  );
}

Following.propTypes = {
  followingList : PropTypes.object,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Following);
