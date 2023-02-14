import { useState } from "react";
import { Col, Container, Dropdown, ListGroup, Row } from "react-bootstrap";
/* CODE SOURCE: https://codesandbox.io/s/y3vbc?file=/src/App.js:0-1793 */

const FilterDropdown = () => {
    const filterMenuOptions = {
        Category: ["Water Sports", "Educational", "Sightseeing"],
        Location: ["Hilo", "Kailua-Kona", "Volcano", "Waimea"],
        Type: ["Indoor", "Outdoor"]
    };
    const [selectedFilterOption, setSelFilterOption] = useState(
        Object.keys(filterMenuOptions)[0]
    );

    return (
        <Dropdown className="me-3">
        <Dropdown.Toggle className="filter" variant="secondary">Filter</Dropdown.Toggle>
        <Dropdown.Menu>
            <Container>
            <Row style={{ minWidth: "50vw" }}>
                <Col>
                <ListGroup variant="flush">
                    {Object.keys(filterMenuOptions).map((fKey, id) => (
                    <ListGroup.Item
                        key={id}
                        action
                        active={selectedFilterOption === fKey}
                        onClick={() => setSelFilterOption(fKey)}
                        variant="success"
                    >
                        {fKey}
                    </ListGroup.Item>
                    ))}
                </ListGroup>
                </Col>
                <Col>
                <ListGroup>
                    {filterMenuOptions[selectedFilterOption].map((option, id) => (
                    <Row key={id}>
                        <Col xs="2">
                        <input type="checkbox" />
                        </Col>
                        <Col>
                        <p>{option}</p>
                        </Col>
                    </Row>
                    ))}
                </ListGroup>
                </Col>
            </Row>
            </Container>
        </Dropdown.Menu>
        </Dropdown>
    );
}

export default FilterDropdown;