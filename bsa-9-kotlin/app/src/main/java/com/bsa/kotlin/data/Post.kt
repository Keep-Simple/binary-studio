package com.bsa.kotlin.data

import androidx.room.*
//
//@Entity(tableName = "posts",
//        foreignKeys = [
//            ForeignKey(entity = User::class, parentColumns = ["id"], childColumns = ["user_id"])
//        ],
//        indices = [Index("user_id")]
//)
@Entity(tableName = "posts")
data class Post(
        @PrimaryKey @ColumnInfo(name = "id") val postId: String,
        val title: String,
        val text: String,
        var viewed: Boolean
)
