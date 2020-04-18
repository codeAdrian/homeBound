type MessagingFuncion = (
  message: any,
  handleSuccess: VoidFunction,
  handleError: VoidFunction,
) => void;
const messageContact: MessagingFuncion = (
  message,
  handleSuccess,
  handleError,
) => {
  fetch('/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        handleSuccess();
      } else {
        handleError();
      }
    });
};

export { messageContact };
