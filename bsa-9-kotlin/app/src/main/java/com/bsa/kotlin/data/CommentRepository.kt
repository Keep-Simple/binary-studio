package com.bsa.kotlin.data

class CommentRepository private constructor(private val commentDao: CommentDao) {

    fun getByPostId(postId: String) = commentDao.getCommentsByPostId(postId)

    suspend fun insert(comments: List<Comment>) = commentDao.insertForPost(comments)

    companion object {

        @Volatile
        private var instance: CommentRepository? = null

        fun getInstance(commentDao: CommentDao) =
                instance ?: synchronized(this) {
                    instance ?: CommentRepository(commentDao).also { instance = it }
                }
    }
}
