export default function ({
  store,
  error
}) {
  if (!store.state.authUser) {
    error({
      message: 'You are no signed in',
      statusCode: 403
    })
  }
}
