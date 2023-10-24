/**
 * @descriptor 五十音 - 行
 * @author obf1313
 */
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Letter } from '@/entity/letter'

@Entity()
export class Row extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string

  /** 平假名 */
  @Column({
    length: 8,
  })
  hiragana: string

  /** 片假名 */
  @Column({
    length: 8,
  })
  katakana: string

  /** 罗马音 */
  @Column({
    length: 16,
  })
  rome: string

  /** 单词 */
  @OneToMany(() => Letter, letter => letter.row)
  letter: Letter[]
}
