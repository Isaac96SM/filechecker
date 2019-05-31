import React from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import IState from './IState';
import IProps from './IProps';

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
            loaded: false
        };

        this.onGridReady = this.onGridReady.bind(this);
    }

    onGridReady(params:any) {
        this.Grid = params;
        
        this.setState({
            loaded: true
        });
    }

    render() {
        const existingPaths: Array<string> = [...new Set(this.state.rowData.map(row => row.path))];

        let button = null;

        if (this.state.loaded) {
            button = (
                <AddButton gridApi={this.Grid.api} existingPaths={existingPaths} />
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