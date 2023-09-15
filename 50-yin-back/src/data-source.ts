import { DataSource } from 'typeorm'
import { User } from './entity/user'
import { Row } from './entity/row'
import { Col } from './entity/col'
import { Letter } from './entity/letter'
import { CheckRecord } from './entity/check-record'
import { StudyRecord } from './entity/study-record'
import { CheckRecordDetail } from './entity/check-record-detail'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'db_50_yin',
  synchronize: true,
  logging: true,
  entities: [User, Row, Col, Letter, CheckRecord, StudyRecord, CheckRecordDetail],
})
