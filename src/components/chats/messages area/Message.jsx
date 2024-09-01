function Message({ message, otheruser }) {
  if (otheruser)
    return (
      <div className="max-w-[27rem] self-start rounded-lg bg-white px-3 py-2 text-dark-gray">
        {message}
      </div>
    );
  return (
    <div className="max-w-[27rem] rounded-lg bg-primary px-3 py-2 text-white">
      {message}
    </div>
  );
}

export default Message;
