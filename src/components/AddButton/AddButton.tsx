import React from 'react';

import { ButtonToolbar, Button } from 'react-bootstrap';

import IState from './IState';
import IProps from './IProps';
import IRow from '../../interfaces/IRow';

import modules from '../../modules';

class AddButton extends React.PureComponent<IProps, IState> {
    state: IState;

    constructor(props: IProps) {

        super(props);

        this.state = {
            loading: false
        };

        this.showDialog = this.showDialog.bind(this);
    }

    showDialog() {
        const path = modules.dialog.showOpenDialog({
            title: "Select folder",
            properties: ['openDirectory']
        })[0];

        if (!path)
            return false;

        console.log(this.props.existingPaths, path);

        if (this.props.existingPaths.includes(path))
            modules.dialog.showErrorBos("Error", "This folder is already watching");

        this.setState({
            loading: true
        }, () => {
            modules.fs.readdir(path, (err: Error, files: Array<string>) => {
                const rows: Array<IRow> = [];

                files.forEach(file => {
                    const row: IRow = {
                        fileName: file,
                        path: path
                    };

                    rows.push(row);
                });

                this.props.gridApi.setRowData(rows)

                this.setState({
                    loading: false
                });
            });
        });
    }

    render() {
        const { loading } = this.state;

        return (
            <div>
                
                <ButtonToolbar>
                    <Button variant="primary" disabled={loading} onClick={this.showDialog}>
                        {!loading ? 'Watch folder' : 'Loading Files'}
                    </Button>
                </ButtonToolbar>
            </div>
        );
    }
}

export default AddButton;