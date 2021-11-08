package com.bsa.kotlin.viewmodels

import android.app.Application
import androidx.lifecycle.*
import com.bsa.kotlin.webservice.WebService
import com.bsa.kotlin.data.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class CommentViewModel(application: Application) : AndroidViewModel(application) {
    private val repository = CommentRepository.getInstance(AppDatabase.getInstance(application).commentDao())

    lateinit var comments: LiveData<List<Comment>>

    fun fetchComments(postId: String) {
        viewModelScope.launch(Dispatchers.IO) {
           val response = WebService.create().getComments(postId)

            repository.insert(response.map {
                Comment(it.id, it.postId, it.body, it.email)
            })

            comments = repository.getByPostId(postId)
        }
    }

}
