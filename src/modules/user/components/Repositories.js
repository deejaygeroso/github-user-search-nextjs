import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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

function Repositories(props) {
  const { classes, repositoryList } = props;
  const { allIds, byId } = repositoryList;
  return (
    <List className={classes.root}>
    {allIds && allIds.length!==0 && allIds.map(repoId=>(
      <ListItem alignItems="flex-start" key={repoId}>
        <ListItemText
          primary={byId[repoId].name}
          secondary={
            <React.Fragment>
              <Typography component="span" className={classes.inline} color="textPrimary">
                {/* {byId[repoId].language} */}
              </Typography>
                {`— ${byId[repoId].language ? byId[repoId].language : 'N/A'}`}
            </React.Fragment>
          }
        />
      </ListItem>
    ))}
    </List>
  );
}

Repositories.propTypes = {
  repositoryList : PropTypes.object,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Repositories);
