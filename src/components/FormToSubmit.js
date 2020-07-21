import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Form, Col } from "react-bootstrap";
import PlaylistData from "../api/PlaylistData";
import { submitForm } from "../actions";
import { Animated } from "react-animated-css";

function FormToSubmit(props) {
  const [formSubmitted, setFormSubmitted] = useState(0);
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(submitForm(data));
    setFormSubmitted(1);
  };
  if (errors) {
    console.log(errors);
  }
  return (
    <Animated animationIn="fadeIn" isVisible={true} animationInDelay={250}>
      <div className="md-container">
        {formSubmitted ? (
          <PlaylistData />
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="username">
              <Form.Label as="legend" sm={2} className="form">
                Last.fm Username
              </Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter username"
                name="username"
                ref={register({ required: true })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label as="legend" sm={2} className="form">
                Playlist Name
              </Form.Label>
              <Form.Control
                placeholder="Enter playlist name"
                name="playlistName"
                ref={register({ required: true })}
              />
            </Form.Group>
            <fieldset>
              <Form.Group>
                <Form.Label as="legend" sm={2} className="form">
                  Choose Period
                </Form.Label>
                <Col sm={10} className="text">
                  <Form.Check
                    type="radio"
                    label="7 days"
                    value="7day"
                    name="period"
                    id="period1"
                    ref={register({ required: true })}
                  />
                  <Form.Check
                    type="radio"
                    label="1 month"
                    value="1month"
                    name="period"
                    id="period2"
                    ref={register({ required: true })}
                  />
                  <Form.Check
                    type="radio"
                    label="3 months"
                    value="3month"
                    name="period"
                    id="period3"
                    ref={register({ required: true })}
                  />
                  <Form.Check
                    type="radio"
                    label="6 months"
                    value="6month"
                    name="period"
                    id="period4"
                    ref={register({ required: true })}
                  />
                  <Form.Check
                    type="radio"
                    label="12 months"
                    value="12month"
                    name="period"
                    id="period5"
                    ref={register({ required: true })}
                  />
                  <Form.Check
                    type="radio"
                    label="Overall"
                    value="overall"
                    name="period"
                    id="period6"
                    ref={register({ required: true })}
                  />
                </Col>
              </Form.Group>
            </fieldset>

            <Button variant="success" className="btn-green2" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </div>
    </Animated>
  );
}

export default connect()(FormToSubmit);
