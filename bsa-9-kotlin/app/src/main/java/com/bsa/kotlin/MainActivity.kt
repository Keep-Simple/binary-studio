package com.bsa.kotlin

import android.os.Bundle
import android.view.View
import android.widget.TextView
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.bsa.kotlin.adapters.PostAdapter
import com.bsa.kotlin.viewmodels.CommentViewModel
import com.bsa.kotlin.viewmodels.PostListViewModel
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private lateinit var commentModel: CommentViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val postModel: PostListViewModel by viewModels()
        val temp: CommentViewModel by viewModels()
        commentModel = temp

        val adapter = PostAdapter(emptyList())
        recycler_view.adapter = adapter

        postModel.fetchPosts()
        postModel.posts.observe(this, Observer { posts ->
            adapter.refreshPosts(posts)
        })

        recycler_view.layoutManager = LinearLayoutManager(this)
        recycler_view.setHasFixedSize(true)

    }

    //TODO
//    fun showCommentsListener() {
//        commentModel.fetchComments()
//        val commentsHeader: TextView = findViewById(R.id.comments_header)
//        val commentRecyclerView: RecyclerView = findViewById(R.id.comments_recycler_view)
//
//        if(commentsHeader.visibility == View.GONE) {
//            commentsHeader.visibility = View.VISIBLE
//            commentRecyclerView.visibility = View.VISIBLE
//        } else {
//            commentsHeader.visibility = View.GONE
//            commentRecyclerView.visibility = View.GONE
//        }
//
//    }

}
