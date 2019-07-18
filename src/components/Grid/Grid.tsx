import React from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import IState from './IState';
import IProps from './IProps';
import IRow from '../../interfaces/IRow';

import RowHelper from '../../helpers/RowHelper';

import AddButton from '../AddButton/AddButton';

class Grid extends React.PureComponent<IProps, IState> {
    state: IState;
    Grid: any;

    constructor(props: IProps) {
        super(props);

        this.state = {
            columnDefs: [
                {
                    headerName: "Name", field: "fileName"
                },
                {
                    headerName: "Path", field: "path"
                }
            ],
            rowData: [],
            ready: false
        };

        this.onGridReady = this.onGridReady.bind(this);
        this.addRows = this.addRows.bind(this);
    }

    onGridReady(params:any) {
        this.Grid = params;
        
        this.setState({
            ready: true
        });
    }

    addRows(rows: Array<IRow>) {
        this.setState({
            rowData: RowHelper.concatenate(this.state.rowData, rows)
        });
    }

    render() {
        const existingPaths: Array<string> = [...new Set(this.state.rowData.map(row => row.path))];

        let button = null;

        if (this.state.ready) {
            button = (
                <AddButton confirm={this.addRows} existingPaths={existingPaths} />
            );
        }

        return (
            <div>
                <div
                    className="ag-theme-material"
                    style={
                        {
                            height: '500px',
                            width: '600px'
                        }
                    }
                >
                    <AgGridReact
                        onGridReady={this.onGridReady}
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                    >
                    </AgGridReact>
                </div>
                {button}
            </div>
        );
    }
}

export default Grid;