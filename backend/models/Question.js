const { db } = require('../config/db');

const Question = {
  create: (questionData) => {
    const stmt = db.prepare(`
      INSERT INTO questions (session_id, question, answer, note, isPinned)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      questionData.session,
      questionData.question || '',
      questionData.answer || '',
      questionData.note || '',
      questionData.isPinned ? 1 : 0
    );
    return { id: result.lastInsertRowid, ...questionData };
  },

  insertMany: (questions) => {
    const stmt = db.prepare(`
      INSERT INTO questions (session_id, question, answer, note, isPinned)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    const insertMany = db.transaction((questions) => {
      const results = [];
      for (const q of questions) {
        const result = stmt.run(
          q.session,
          q.question || '',
          q.answer || '',
          q.note || '',
          q.isPinned ? 1 : 0
        );
        results.push({ id: result.lastInsertRowid, ...q });
      }
      return results;
    });
    
    return insertMany(questions);
  },

  find: (query = {}) => {
    let sql = 'SELECT * FROM questions';
    const params = [];
    const conditions = [];

    if (query.session) {
      conditions.push('session_id = ?');
      params.push(query.session);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY isPinned DESC, createdAt ASC';

    const stmt = db.prepare(sql);
    return stmt.all(...params);
  },

  findById: (id) => {
    const stmt = db.prepare('SELECT * FROM questions WHERE id = ?');
    return stmt.get(id);
  },

  findByIdAndUpdate: (id, updateData) => {
    const fields = [];
    const values = [];
    
    for (const [key, value] of Object.entries(updateData)) {
      if (value !== undefined) {
        if (key === 'isPinned') {
          fields.push('isPinned = ?');
          values.push(value ? 1 : 0);
        } else {
          fields.push(`${key} = ?`);
          values.push(value);
        }
      }
    }
    
    if (fields.length === 0) return null;
    
    fields.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);
    
    const stmt = db.prepare(`UPDATE questions SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);
    
    return Question.findById(id);
  },

  deleteMany: (query) => {
    let sql = 'DELETE FROM questions';
    const params = [];
    
    if (query.session) {
      sql += ' WHERE session_id = ?';
      params.push(query.session);
    }
    
    const stmt = db.prepare(sql);
    return stmt.run(...params);
  }
};

module.exports = Question;
