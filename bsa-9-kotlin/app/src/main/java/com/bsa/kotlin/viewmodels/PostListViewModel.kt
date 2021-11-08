package com.bsa.kotlin.viewmodels

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.bsa.kotlin.webservice.WebService
import com.bsa.kotlin.data.AppDatabase
import com.bsa.kotlin.data.Post
import com.bsa.kotlin.data.PostRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class PostListViewModel(application: Application) : AndroidViewModel(application) {
    private val repository = PostRepository.getInstance(AppDatabase.getInstance(application).postDao())

    val posts = repository.getPosts()

    fun fetchPosts() {
        viewModelScope.launch(Dispatchers.IO) {
           val posts = WebService.create().getPosts()
            repository.insertAll(posts.map {
                Post(it.id, it.title, it.text, false)
            })
        }
    }

}
