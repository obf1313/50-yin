/**
 * @descriptor 五十音 - 音
 * @author obf1313
 */
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Row } from '@/entity/row'
import { Col } from '@/entity/col'
import { StudyRecord } from '@/entity/study-record'

@Entity()
export class Letter extends BaseEntity {
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

  /** 属于哪一行 */
  @ManyToOne(() => Row, row => row.letter)
  row: Row

  /** 属于哪一列 */
  @ManyToOne(() => Col, col => col.letter)
  col: Col

  /** 学习记录 */
  @OneToMany(() => StudyRecord, studyRecord => studyRecord.letter)
  studyRecord: StudyRecord[]
}
