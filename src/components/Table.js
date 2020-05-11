import React, { Component } from 'react';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import { data } from './data'


class Table extends Component{
    constructor(props){
        super(props);
        this.state = {
            tableData: [],
            error: null
        }
    }

    componentDidMount(){
        this.setState({
            tableData: data.feeds
        });
        // const url = "https://api.thingspeak.com/channels/945591/feeds.json?results=20";
        // axios(url)
        // .then((resp)=> {
        //     console.log(resp.data.feeds);
        //     this.setState({ 
        //         tableData: [resp.data.feeds],
        //         error: null
        //      })
        // })
        // .catch((err)=> {
        //     console.log(err);
        //     this.setState({ error: err})
        // })
    }

    render() {
        const { tableData, error } = this.state;
        // console.log(tableData[0]);

        const options = {
            page: 1,  // page default
            sizePerPageList: [ {
              text: '5', value: 5
            }, {
              text: '10', value: 10
            }, {
              text: 'All', value: tableData.length
            } ],
            sizePerPage: 5,
            pageStartIndex: 1,
            paginationSize: 3, 
            prePage: 'Previous',
            nextPage: 'Next', // Next page button text
            firstPage: 'First', 
            lastPage: 'Last',
            prePageTitle: 'Go to previous', // Previous page button title
            nextPageTitle: 'Go to next', // Next page button title
            firstPageTitle: 'Go to first', // First page button title
            lastPageTitle: 'Go to Last', // Last page button title
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            paginationPosition: 'top',  // default is bottom, top and both is all available
            hideSizePerPage: true, //> You can hide the dropdown for sizePerPage
            alwaysShowAllBtns: true // Always show next and previous button
        }
        return (
            <div>
                <p className="heading">Table of Sensor Readings </p>
                <BootstrapTable data={tableData} pagination options={options}>
                    <TableHeaderColumn dataField="created_at" dataAlign='center' headerAlign="center" width="20%" dataSort={true}>Date Created</TableHeaderColumn>
                    <TableHeaderColumn dataField="entry_id" isKey dataAlign='center' headerAlign="center" width="20%" hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="field2" dataAlign='center' headerAlign="center" width="20%">Turbidity</TableHeaderColumn>
                    <TableHeaderColumn dataField="field1" dataAlign='center' headerAlign="center" width="20%">pH</TableHeaderColumn>
                    <TableHeaderColumn dataField="field3" dataAlign='center' headerAlign="center" width="20%">Temperature</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

export default Table;
