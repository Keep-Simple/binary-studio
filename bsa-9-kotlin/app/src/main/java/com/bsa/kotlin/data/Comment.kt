package com.bsa.kotlin.data

import androidx.room.*

@Entity(tableName = "comments",
        foreignKeys = [
            ForeignKey(entity = Post::class, parentColumns = ["id"], childColumns = ["post_id"])
        ],
        indices = [Index("post_id")]
)
data class Comment(
        @PrimaryKey @ColumnInfo(name = "id") val commentId: String,
        @ColumnInfo(name = "post_id") val postId: String,
        val body: String,
        val email: String
)
