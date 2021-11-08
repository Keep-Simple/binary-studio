package com.bsa.kotlin.data

import androidx.lifecycle.LiveData
import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query

@Dao
interface PostDao {
    @Query("SELECT * FROM posts WHERE id = :postId")
    fun getPost(postId: String): LiveData<Post>

    @Query("SELECT * FROM posts")
    fun getPosts(): LiveData<List<Post>>

    @Query("UPDATE posts SET viewed = 1 WHERE id = :postId")
    fun markAsViewed(postId: String)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertAll(posts: List<Post>)

    @Query("SELECT * FROM posts WHERE viewed = 1")
    fun getViewedPosts(): LiveData<List<Post>>
}
