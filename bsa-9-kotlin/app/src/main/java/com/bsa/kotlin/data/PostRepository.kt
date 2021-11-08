package com.bsa.kotlin.data

class PostRepository private constructor(
        private val postDao: PostDao
) {

    fun getPosts() = postDao.getPosts()

    fun getPost(postId: String) = postDao.getPost(postId)

    suspend fun insertAll(posts: List<Post>) = postDao.insertAll(posts)

    fun markAsViewed(postId: String) = postDao.markAsViewed(postId)

    fun getViewedPosts() = postDao.getViewedPosts()

    companion object {

        @Volatile
        private var instance: PostRepository? = null

        fun getInstance(postDao: PostDao) =
                instance ?: synchronized(this) {
                    instance ?: PostRepository(postDao).also { instance = it }
                }
    }
}
