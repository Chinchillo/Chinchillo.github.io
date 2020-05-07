import React from "react";
import { Form, Button, Badge } from "react-bootstrap";
import "../css/SimilarityFilter.css"
export default class SimilarityFilter extends React.Component {

    render() {

        return (
            <Form>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check.Input type="checkbox" checked={this.props.checked}
                        onChange={this.props.checkboxClicked} />
                    <Form.Check.Label >Include cases where new and old names are very similar to each other </Form.Check.Label>{' '}
                    <Badge variant="secondary">?</Badge>

                </Form.Group>

            </Form>


        )

    }


}