export default function ({store, error}) {
  if (!store.state.authUser) {
    error({
      message: 'You are not signed in',
      statusCode: 403
    })
  }
}
