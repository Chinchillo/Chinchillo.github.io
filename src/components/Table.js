import React from "react";
import { Table, Button } from "react-bootstrap";
import "../css/Table.css"


export default class EntityTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //name, type, old_names_nr or new_names_nr
            sortingField: "",
            sortConfig: null
        }
        this.items = [{
            "name": "Andrzej Bobkowski",
            "description": "Polski eseista",
            "type": "person",
            "old_names_nr": 2,
            "old_names_adresses": ["Ul. Andrzeja Bobkowskiego, 1234 Gostyn, Renamed: 2019-01-07", "aleja Andrzeja Bobkowskiego, 4325 Warszawa, Renamed: 2020-02-03"],
            "new_name_nr": 0,
            "new_name_adresses": []
        },
        {
            "name": "Jan Pawel II",
            "description": "Polski eseista",
            "type": "person",
            "old_names_nr": 1,
            "old_names_adresses": ["aleja Jana Pawla II, 4325 Warszawa, Renamed: 2020-02-03"],
            "new_name_nr": 2,
            "new_name_adresses": ["Ul. Jana Pawa II, 1234 Gostyn, Renamed: 2019-01-07", "aleja Andrzeja Bobkowskiego, 4325 Warszawa, Renamed: 2020-02-03"]
        },
        {
            "name": "11 stycznia",
            "description": "",
            "type": "date",
            "old_names_nr": 3,
            "old_names_adresses": ["Ul. 11 stycznia, 1234 Gostyn, Renamed: 2019-01-07", "aleja 11 stycznia, 4325 Warszawa, Renamed: 2020-02-03", "aleja 11 stycznia, 4325 Katowice, Renamed: 2020-02-03"],
            "new_name_nr": 0,
            "new_name_adresses": []
        },

        ]
        this.sortData = this.sortData.bind(this)
    }

    getClassNamesFor = (name) => {
        if (!this.state.sortingField) {
            return;
        }
        return this.state.sortingField === name ? "descending" : undefined;
    };

    sortData() {
        if (this.state.sortingField === "") {
            return this.items
        } else {
            let sortableItems = [...this.items]
            const key = this.state.sortingField
            if (key === "name" || key === "type") {
                return sortableItems.sort((a, b) => a[key].localeCompare(b[key]));
            } else {
                return sortableItems.sort((a, b) => b[key] - a[key])
            }
        }

    }






    render() {
        return (
            <div className="p-3 w-100">
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th >
                                <Button block className={this.getClassNamesFor('name')} onClick={() => this.setState({ sortingField: "name" })}>
                                    Entity
                                </Button>
                            </th>
                            <th style={{ minWidth: "150px" }}>
                                <Button block className={this.getClassNamesFor('type')} onClick={() => this.setState({ sortingField: "type" })}>
                                    Type
                                </Button>
                            </th>
                            <th>
                                <Button block className={this.getClassNamesFor('old_names_nr')} onClick={() => this.setState({ sortingField: "old_names_nr" })}>
                                    In Old Names
                                </Button>
                            </th>
                            <th>
                                <Button block className={this.getClassNamesFor('new_name_nr')} onClick={() => this.setState({ sortingField: "new_name_nr" })}>
                                    In New Names
                                </Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.sortData().map((item) => (
                            <tr key={item.name}>
                                <td>
                                    <h5>{item.name}</h5>
                                    {item.description}
                                </td>
                                <td >{item.type}</td>
                                <td>
                                    <div>
                                        <h5>{item.old_names_nr} Cases</h5>
                                        <ul>
                                            {item.old_names_adresses.map((value, index) => (
                                                <li key={index}>{value}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </td>
                                <td>
                                    <h5>{item.new_name_nr} Cases</h5>
                                    <ul>
                                        {item.new_name_adresses.map((value, index) => (
                                            <li key={index}>{value}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div >

        )


    }
}