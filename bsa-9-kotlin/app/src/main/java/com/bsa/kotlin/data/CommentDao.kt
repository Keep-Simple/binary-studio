package com.bsa.kotlin.data

import androidx.lifecycle.LiveData
import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query

@Dao
interface CommentDao {
    @Query("SELECT * FROM comments WHERE post_id = :postId")
    fun getCommentsByPostId(postId: String): LiveData<List<Comment>>

    @Insert
    suspend fun insertForPost(comments: List<Comment>)
}
