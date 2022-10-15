// display error message in json format
let displayMessage = (status, message) => {
    return { "status": status, "message": message }
}

exports.displayMessage = displayMessage
