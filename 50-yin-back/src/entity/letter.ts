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

  @ManyToOne(() => Row, row => row.letter)
  row: Row

  @ManyToOne(() => Col, col => col.letter)
  col: Col

  @OneToMany(() => StudyRecord, studyRecord => studyRecord.letter)
  studyRecord: StudyRecord[]
}
