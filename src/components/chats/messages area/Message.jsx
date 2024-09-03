function Message({ message, otheruser }) {
  if (otheruser)
    return (
      <div className="flex min-w-[5rem] max-w-[35rem] flex-col self-start rounded-lg bg-white px-3 py-2 font-medium text-dark-gray">
        {message.content}
        <span className="self-end text-xs">{message.sentAt}</span>
      </div>
    );
  return (
    <div className="flex min-w-[5rem] max-w-[35rem] flex-col rounded-lg bg-primary px-3 py-2 font-medium text-white">
      {message.content}
      <span className="self-end text-xs">{message.sentAt}</span>
    </div>
  );
}

export default Message;
