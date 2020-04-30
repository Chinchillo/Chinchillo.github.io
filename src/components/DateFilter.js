import React from "react";
import { Dropdown, InputGroup, ButtonGroup, DropdownButton, FormControl, Container, Row, Col, Button } from "react-bootstrap";

export default class DateFilter extends React.Component {

    render() {

        return (
            <>
                <h3>From Date:</h3>
                <InputGroup size="sm" className="mp-3">



                    <DropdownButton title="Year" variant="info" size="sm">

                        <Dropdown.Item href="#/action-1">2020</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">2019</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">2018</Dropdown.Item>

                    </DropdownButton>{' '}

                    <DropdownButton title="Month" variant="info" size="sm">

                        <Dropdown.Item href="#/action-1">Jan</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">February</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">March</Dropdown.Item>

                    </DropdownButton>{' '}

                    <DropdownButton title="Day" variant="info" size="sm">

                        <Dropdown.Item href="#/action-1">1</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">2</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">3</Dropdown.Item>

                    </DropdownButton>




                    <FormControl aria-describedby="basic-addon1" placeholder="2019/09/21" />


                </InputGroup>



            </>


        )

    }


}