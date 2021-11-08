package com.bsa.kotlin.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bsa.kotlin.R
import com.bsa.kotlin.data.Comment
import kotlinx.android.synthetic.main.comments_list_item.view.*

class CommentsAdapter(private var commentsList: List<Comment>)
    : RecyclerView.Adapter<CommentsAdapter.CommentViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CommentsAdapter.CommentViewHolder {
        val itemView = LayoutInflater.from(parent.context).inflate(R.layout.comments_list_item, parent, false)

        return CommentViewHolder(itemView)
    }

    override fun getItemCount() = commentsList.size

    override fun onBindViewHolder(holder: CommentsAdapter.CommentViewHolder, position: Int) {
        val currentItem = commentsList[position]

        holder.commentEmail.text = currentItem.email
        holder.commentText.text = currentItem.body
    }

    fun refreshComments(comments: List<Comment>) {
        this.commentsList = comments
        notifyDataSetChanged()
    }

    class CommentViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val commentEmail: TextView = itemView.comment_email
        val commentText: TextView = itemView.comment_text
    }

}
