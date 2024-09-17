function MessageStatus({ isDelivered, isSeen }) {
  return (
    <>
      {isDelivered ? (
        <img
          src={`${isSeen ? "/doublecheckgray.svg" : "doublecheckdark.svg"}`}
          alt="icon"
          className="h-5 w-5"
        />
      ) : (
        <img src="/singlecheck.svg" alt="icon" className="h-5 w-5" />
      )}
    </>
  );
}

export default MessageStatus;
