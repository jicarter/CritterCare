import React, { useContext, useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Row, Col } from "reactstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { UserProfileContext } from "../../Providers/UserProfileProvider";

export const UserProfile = () => {
    const { getUserProfileById } = useContext(UserProfileContext);
    const [profile, setProfile] = useState([]);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        getUserProfileById().then(setProfile);
    }, []);



    return (
        <div className="container">
            <Card>
                <CardBody>
                    <Row>
                        <Col>
                            <h2>{profile.displayName}</h2>
                            <h5>{profile.fullName}</h5>
                            <br />
                            <Row>
                                <Col lg="6">
                                    <h5>Email:</h5>
                                    <p>{profile.email}</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                    <Row>
                        <Col>
                            <div style={{ float: "right" }}>
                                <Button
                                    onClick={() =>
                                        history.push(`/`)
                                    }
                                >
                                    Back
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </CardFooter>
            </Card>
        </div>
    );
};

export default UserProfile;
