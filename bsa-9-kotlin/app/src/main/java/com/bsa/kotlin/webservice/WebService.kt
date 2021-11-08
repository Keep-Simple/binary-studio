package com.bsa.kotlin.webservice

import com.bsa.kotlin.data.CommentsSearchResponse
import com.bsa.kotlin.data.PostSearchResponse
import com.bsa.kotlin.data.UserSearchResponse
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET
import retrofit2.http.Path

interface WebService {
    @GET("posts")
    suspend fun getPosts(): List<PostSearchResponse>

    @GET("posts/{postId}/comments")
    suspend fun getComments(
            @Path("postId") postId: String
    ): List<CommentsSearchResponse>

    //TODO
    @GET("users/{userId}")
    suspend fun getUser(
            @Path("userId") userId: String
    ): UserSearchResponse

    companion object {
        private const val BASE_URL = "http://jsonplaceholder.typicode.com/"

        fun create(): WebService {
            val logger = HttpLoggingInterceptor().apply { level = HttpLoggingInterceptor.Level.BASIC }

            val client = OkHttpClient.Builder()
                    .addInterceptor(logger)
                    .build()

            return Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .client(client)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build()
                    .create(WebService::class.java)
        }
    }

}
