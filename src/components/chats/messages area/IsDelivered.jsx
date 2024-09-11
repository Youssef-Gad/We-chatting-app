import { faCheck, faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function IsDelivered({ message }) {
  return (
    <>
      {message.isDelivered ? (
        <FontAwesomeIcon icon={faCheckDouble} className="text-base" />
      ) : (
        <FontAwesomeIcon icon={faCheck} className="text-base" />
      )}
    </>
  );
}

export default IsDelivered;
