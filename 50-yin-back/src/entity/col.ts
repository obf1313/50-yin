import { BaseEntity, Column, Entity, Generated, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { Letter } from './letter'

@Entity()
export class Col extends BaseEntity {
  @PrimaryColumn()
  @Generated('uuid')
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
