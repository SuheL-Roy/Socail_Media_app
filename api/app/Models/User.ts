import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Post from './Post'
import Comment from './Comment'
import Chat from './Chat'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public first_name: string

  @column()
  public last_name: string

  @column()
  public email: string

  @column()
  public gender: string

  @column()
  public username: string

  @column()
  public profile_pic: string

  @column()
  public forgot_code: string

  @column()
  public is_banned: string

  @column()
  public cover: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  @hasMany(() => Chat,{
    foreignKey: 'senderId', // defaults to userId
  })
  public Chats: HasMany<typeof Chat>

  
}