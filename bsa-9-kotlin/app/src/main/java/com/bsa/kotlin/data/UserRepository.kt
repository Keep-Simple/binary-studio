package com.bsa.kotlin.data

class UserRepository private constructor(private val userDao: UserDao) {

    fun getUser(userId: String) = userDao.getUser(userId)

    fun insert(user: User) = userDao.insert(user)

    companion object {

        @Volatile
        private var instance: UserRepository? = null

        fun getInstance(userDao: UserDao) =
                instance ?: synchronized(this) {
                    instance ?: UserRepository(userDao).also { instance = it }
                }
    }
}
