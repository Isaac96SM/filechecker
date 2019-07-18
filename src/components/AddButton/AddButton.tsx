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
        const paths = modules.dialog.showOpenDialog({
            title: "Select folder",
            properties: ['openDirectory']
        });

        if (paths.length === 0)
            return false;

        const duplicated: Array<string> = paths.filter((p: string) => this.props.existingPaths.includes(p));;
    
        if (duplicated.length === 1)
            modules.dialog.showErrorBox("Error", `This folder: ${duplicated[0]} is already watching`);
        else if (duplicated.length > 0)
            modules.dialog.showErrorBox("Error", `This folders: ${duplicated.join(', ')} are already watching`);
        else if (duplicated.length !== paths.length) {
            const newPaths: Array<string> = paths.filter((p: string) => !this.props.existingPaths.includes(p));

            if (newPaths.length > 0)
                this.add(newPaths);
        }
        
        return false;
    }

    add(paths: Array<string>) {
        this.setState({
            loading: true
        }, () => {
            modules.fs.readdir(paths[0], (err: Error, files: Array<string>) => {
                const rows: Array<IRow> = [];

                files.forEach(file => {
                    const row: IRow = {
                        fileName: file,
                        path: paths[0]
                    };

                    rows.push(row);
                });

                this.setState({
                    loading: false
                }, () => this.props.confirm(rows));
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