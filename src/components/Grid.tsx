import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

interface IProps {
    rowData: Array<any>;
}

interface IState {
    columnDefs: Array<any>;
    rowData: Array<any>;
}

class Grid extends React.PureComponent<IProps, IState> {
    state: IState;

    constructor(props: IProps) {
        super(props);

        this.state = {
            columnDefs: [
                {
                    headerName: "Make", field: "make"
                },
                {
                    headerName: "Model", field: "model"
                },
                {
                    headerName: "Price", field: "price"
                }
            ],
            rowData: this.props.rowData
        };
    }

    render() {
        return (
            <div
                className="ag-theme-material"
                style={{
                    height: '500px',
                    width: '600px'
                }}
            >
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}>
                </AgGridReact>
            </div>
        );
    }
}

export default Grid;
