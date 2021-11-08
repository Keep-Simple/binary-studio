package com.bsa.kotlin.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.lifecycle.LiveData
import androidx.recyclerview.widget.RecyclerView
import com.bsa.kotlin.R
import com.bsa.kotlin.data.Post
import kotlinx.android.synthetic.main.post_item.view.*

class PostAdapter(private var postsList: List<Post>)
    : RecyclerView.Adapter<PostAdapter.PostViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PostViewHolder {
        val itemView = LayoutInflater.from(parent.context).inflate(R.layout.post_item, parent, false)

        return PostViewHolder(itemView)
    }

    override fun getItemCount() = postsList.size

    override fun onBindViewHolder(holder: PostViewHolder, position: Int) {
        val currentItem = postsList[position]

        holder.postTitle.text = currentItem.title
        holder.postText.text = currentItem.text
    }

    fun refreshPosts(posts: List<Post>) {
        this.postsList = posts
        notifyDataSetChanged()
    }

    class PostViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val postTitle: TextView = itemView.post_title
        val postText: TextView = itemView.post_text
    }
}
