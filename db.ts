import { Pool, QueryResult } from 'pg';
import { isString, wrapWithTicks } from './lib';

const config = {
  host: '127.0.0.1',
  port: 5432,
  database: 'chatbot',
  user: 'alexey',
  password: '123'
};

const pool = new Pool(config);

export default (table: string): { 
  retreive(obj: Record<string, any>): Promise<QueryResult<any>>, 
  insert(obj: Record<string, any>): Promise<QueryResult<any>> 
} => ({
  retreive(queryObj) {
    const conditions = Object.entries(queryObj)
      .map(([key, value]) => {
        return `${key}=${isString(value) ? wrapWithTicks(value) : value}`;
      })
      .join(' AND ');
    
    console.log({ conditions });
    const sql = `SELECT * FROM ${table} ${conditions && `WHERE ${conditions}`}`;
    return pool.query(sql);
  },

  insert(data) {
    const values = Object.values(data).map(value => {
      return isString(value) ? wrapWithTicks(value) : value;
    });
    const sql = `INSERT INTO ${table} VALUES (${values.join(', ')})`;
    return pool.query(sql);
  },
});