import React from "react";
import { Dropdown, InputGroup, DropdownButton, FormControl } from "react-bootstrap";
import DropdownDate from 'react-dropdown-date';
import { Container, Col, Row } from "react-bootstrap";
import '../css/DateFilter.css'

export default class DateFilter extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (

            <>
                <Col md={3}>
                    <h4 style={{ display: "inline" }}>{this.props.headline}</h4>
                </Col>
                <Col>
                    <DropdownDate
                        startDate={                         // optional, if not provided 1900-01-01 is startDate
                            this.props.startDate                    // 'yyyy-mm-dd' format only
                        }
                        endDate={                           // optional, if not provided current date is endDate
                            this.props.endDate                   // 'yyyy-mm-dd' format only
                        }
                        selectedDate={                      // optional
                            this.props.selectedDate         // 'yyyy-mm-dd' format only
                        }
                        order={                             // optional
                            ['year', 'month', 'day']        // Order of the dropdowns
                        }

                        onDateChange={(date) => {           // optional
                            this.props.alert(date)
                        }}
                        ids={                               // optional
                            {
                                year: 'select-year',
                                month: 'select-month',
                                day: 'select-day'
                            }
                        }
                        classes={
                            {
                                dateContainer: 'row',
                            }
                        }
                        names={                             // optional
                            {
                                year: 'year',
                                month: 'month',
                                day: 'day'
                            }
                        }

                        defaultValues={                     // optional
                            {
                                year: 'Year',
                                month: 'Month',
                                day: 'Day'
                            }
                        }
                        options={{                       // optional
                            monthShort: true,
                        }
                        }
                    />
                </Col>

            </>

        );
    }
    /*
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
            
 
}*/


}