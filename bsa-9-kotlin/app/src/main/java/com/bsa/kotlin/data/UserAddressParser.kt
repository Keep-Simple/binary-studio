package com.bsa.kotlin.data

import com.google.gson.annotations.SerializedName

data class UserAddressParser(
        @field:SerializedName("city") val city: String
)
