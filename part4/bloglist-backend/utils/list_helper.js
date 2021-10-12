const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce(
        (total, likesCount) => total + likesCount.likes,
        0
    )
    return total
}

module.exports = {
    dummy,
    totalLikes,
}
