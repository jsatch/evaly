/*
 * Module dependencies
 */
import React from 'react';
import Mui from 'material-ui';

var Table = Mui.Table;

export default class EvaluationListTable extends React.Component{
  constructor(props) {
    super(props);

    this.headerCols = {
      id: {
        content: 'ID',
        tooltip: 'El ID'
      },
      nombre: {
        content: 'Nombre',
        tooltip: 'Nombre de la Evaluación'
      },
      estado: {
        content: 'Estado',
        tooltip: 'Estado de la Evaluación'
      }
    };
    this.colOrder = ['id', 'nombre', 'estado'];

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      canSelectAll: false,
      height: '300px'
    };
  }

  render() {
    var arrEvaluations = [];
    this.props.evaluationList.forEach((evaluation) => {
      var ev = {
        id: {content: evaluation.id},
        nombre: {content: evaluation.name},
        estado: {content: evaluation.status}
      }
      arrEvaluations.push(ev);
    });
    return (
      <Table
        headerColumns={this.headerCols}
        columnOrder={this.colOrder}
        rowData={arrEvaluations}
        height={this.state.height}
        onRowSelection={this.props.onEvaluationSelected}/>
    );
  }
}
