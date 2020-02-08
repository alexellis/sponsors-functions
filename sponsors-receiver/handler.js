'use strict'

module.exports = async (event, context) => {
  const result = {
    'status': 'Input: ' + JSON.stringify(event.body)
  }

  return context
    .status(200)
    .succeed(result)
}