import React, { Component } from 'react';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
// import { data } from './data'


class Table extends Component{
    constructor(props){
        super(props);
        this.state = {
            tableData: [],
            error: null
        }
    }
   

    componentDidMount(){
        // this.setState({
        //     tableData: data.feeds
        // });
        const url = "https://api.thingspeak.com/channels/945591/feeds.json?results=5";
        axios(url)
        .then((resp)=> {
            console.log(resp.data.feeds);
            this.setState({ 
                tableData: [resp.data.feeds],
                error: null
             })
        })
        .catch((err)=> {
            console.log(err);
            this.setState({ error: err})
        })
    }

    render() {
        const { tableData, error } = this.state;
        // console.log(tableData[0]);
        return (
            <div>
                <h4 className="heading">Table of Sensor </h4>
                <BootstrapTable data={tableData[0]}>
                    <TableHeaderColumn dataField="created_at" dataAlign='center' headerAlign="center" width="20%" dataSort={true}>Date Created</TableHeaderColumn>
                    <TableHeaderColumn dataField="entry_id" isKey dataAlign='center' headerAlign="center" width="20%" hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="field1" dataAlign='center' headerAlign="center" width="20%">pH</TableHeaderColumn>
                    <TableHeaderColumn dataField="field2" dataAlign='center' headerAlign="center" width="20%">Turbidity</TableHeaderColumn>
                    <TableHeaderColumn dataField="field3" dataAlign='center' headerAlign="center" width="20%">Temperature</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

export default Table;
