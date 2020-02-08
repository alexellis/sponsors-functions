'use strict'

module.exports = async (event, context) => {
  const payload = {
    'status': 'Input: ' + JSON.stringify(event.body),
    'headers': event.headers,
    'path': event.path,
    'query': event.query
  }

  console.log(payload)

  return context
    .status(200)
    .succeed({'done': 'OK'})
}
