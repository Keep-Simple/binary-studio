package com.bsa.kotlin.data

import com.google.gson.annotations.SerializedName

data class UserSearchResponse(
        @field:SerializedName("id") val userId: String,
        @field:SerializedName("name") var name: String,
        @field:SerializedName("username") val userName: String,
        @field:SerializedName("address") val address: UserAddressParser
)
