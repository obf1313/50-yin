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

  @Column({
    length: 8,
  })
  hiragana: string

  @Column({
    length: 8,
  })
  katakana: string

  @Column({
    length: 16,
  })
  rome: string

  @OneToMany(() => Letter, letter => letter.row)
  letter: Letter[]
}
