/*
 * Module dependencies
 */
import React from 'react';
import Mui from 'material-ui';

var List = Mui.List;
var ListItem = Mui.ListItem;

export default class EvaluationGroups extends React.Component{
  onListSelected(key) {
    this.props.onTeamSelected(key);
  }

  render() {
    return(
      <div className="evaluation-groups">
        <h3>Ranking</h3>
        <List>
          {
            this.props.teams.map((team) => {
              return <ListItem
                key={team.id}
                ref={team.id}
                onClick={this.onListSelected.bind(this, team.id)}
                secondaryText="Score: 0.0">
                {team.name}
              </ListItem>
            })
          }
        </List>
      </div>
    )
  }
}
