
export const getFeedback = () => {
    return {
        "message": localStorage.getItem('feedback_message'),
        "class": localStorage.getItem('feedback_class')
    }
}

export const setFeedback = (message, className) => {
    localStorage.setItem('feedback_message', message)
    localStorage.setItem('feedback_class', className)
}

export const removeFeedback = () => {
    localStorage.removeItem('feedback_message')
    localStorage.removeItem('feedback_class')
}