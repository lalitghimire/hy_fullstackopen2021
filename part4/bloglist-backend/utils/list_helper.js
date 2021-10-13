const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) =>
    blogs.reduce((total, likesCount) => total + likesCount.likes, 0)

const favoriteBlog = (blogs) => {
    const mostLikes = Math.max(...blogs.map((x) => x.likes))
    return blogs.filter((blog) => blog.likes === mostLikes)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}
