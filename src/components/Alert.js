import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function AlertDismissibleExample(props) {
  const [show, setShow] = useState(true);

  const history = useHistory();

  function handleClick() {
    history.push("/home");
  }
  if (show) {
    return (
      <Alert
        variant="danger"
        onClose={() => setShow(false)}
        onClick={handleClick}
        dismissible
      >
        <Alert.Heading>
          <span role="img" aria-label="shock">
            😮{" "}
          </span>
          Oh no! You got an error!
        </Alert.Heading>
        <p>Make sure you entered your Last.fm username correctly.</p>
      </Alert>
    );
  }
}

export default AlertDismissibleExample;
