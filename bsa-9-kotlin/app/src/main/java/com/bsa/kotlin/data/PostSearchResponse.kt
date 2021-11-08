package com.bsa.kotlin.data

import com.google.gson.annotations.SerializedName

data class PostSearchResponse(
        @field:SerializedName("userId") val userId: String,
        @field:SerializedName("id") val id: String,
        @field:SerializedName("title") val title: String,
        @field:SerializedName("body") val text: String
)
