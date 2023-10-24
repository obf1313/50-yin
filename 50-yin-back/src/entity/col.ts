/**
 * @descriptor 五十音 - 列
 * @author obf1313
 */
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Letter } from '@/entity/letter'

@Entity()
export class Col extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string

  /** 片假名 */
  @Column({
    length: 8,
  })
  hiragana: string

  /** 平假名 */
  @Column({
    length: 8,
  })
  katakana: string

  /** 罗马音 */
  @Column({
    length: 16,
  })
  rome: string

  /** 关联单词 */
  @OneToMany(() => Letter, letter => letter.row)
  letter: Letter[]
}
